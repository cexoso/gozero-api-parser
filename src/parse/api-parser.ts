import { CstParser } from 'chevrotain'
import {
  At,
  ReturnsKeyword,
  UrlPath,
  ServiceKeyword,
  Colon,
  Equals,
  Identifier,
  InfoKeyword,
  LCurly,
  LParen,
  RCurly,
  RParen,
  StringLiteral,
  SyntaxKeyword,
  TypeKeyword,
  allTokens,
  RawString,
  LBrackets,
  RBrackets,
  Star,
  TimeoutValue,
} from '../tokens'
import { tokenize } from '../lexer/lexer'
import { map } from '../utils/map'

export class ApiParser extends CstParser {
  constructor() {
    super(allTokens)

    const $ = this

    $.RULE('program', () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($['syntaxDeclaration']) },
          { ALT: () => $.SUBRULE($['infoDeclaration']) },
          { ALT: () => $.SUBRULE($['typeDefinition']) },
          { ALT: () => $.SUBRULE($['serviceDefinition']) },
        ])
      })
    })

    $.RULE('syntaxDeclaration', () => {
      $.CONSUME(SyntaxKeyword)
      $.CONSUME(Equals)
      $.CONSUME(StringLiteral)
    })

    $.RULE('infoDeclaration', () => {
      $.CONSUME(InfoKeyword)
      $.CONSUME(LParen)
      $.MANY(() => {
        $.SUBRULE($['infoItem'])
      })
      $.CONSUME(RParen)
    })

    $.RULE('infoItem', () => {
      $.CONSUME(Identifier)
      $.CONSUME(Colon)
      // TODO 需要进一步定义值类型，即可能是基础类型，也可以是变量或者字面量，工作量还挺大的
      $.OR([
        { ALT: () => $.CONSUME2(Identifier) },
        { ALT: () => $.CONSUME(StringLiteral) },
        { ALT: () => $.CONSUME(TimeoutValue) },
        { ALT: () => $.CONSUME(UrlPath) },
      ])
    })

    $.RULE('typeDefinition', () => {
      $.CONSUME(TypeKeyword)
      $.CONSUME(LParen)
      $.MANY(() => {
        $.SUBRULE($['messageDefinition'])
      })
      $.CONSUME(RParen)
    })

    $.RULE('fieldType', () => {
      $.OPTION(() => {
        $.CONSUME(LBrackets)
        $.CONSUME(RBrackets)
      })
      $.OPTION2(() => {
        $.CONSUME(Star)
      })
      $.CONSUME(Identifier)
    })

    $.RULE('fieldDefinition', () => {
      $.CONSUME(Identifier)
      $.SUBRULE($['fieldType'])
      $.CONSUME2(RawString)
    })

    $.RULE('messageDefinition', () => {
      $.CONSUME(Identifier)
      $.CONSUME(LCurly)
      $.OPTION(() => {
        $.MANY(() => {
          $.SUBRULE($['fieldDefinition'])
        })
      })
      $.CONSUME(RCurly)
    })

    $.RULE('decorator', () => {
      $.CONSUME(At)
      $.CONSUME(Identifier)
      $.OPTION(() => {
        $.OR([
          {
            ALT: () => {
              $.CONSUME(LParen)
              $.MANY(() => {
                $.SUBRULE($['infoItem'])
              })
              $.CONSUME(RParen)
            },
          },
          {
            ALT: () => {
              $.CONSUME2(Identifier)
            },
          },
        ])
      })
    })

    $.RULE('Request', () => {
      $.CONSUME(LParen)
      $.CONSUME(Identifier)
      $.CONSUME(RParen)
    })

    $.RULE('Response', () => {
      // 这种语法真的不好猜
      // (GoogleLoginReq) returns (GoogleLoginRes)
      $.CONSUME(LParen)
      $.CONSUME(Identifier)
      $.CONSUME(RParen)
    })

    $.RULE('methodDefinition', () => {
      $.OPTION(() => {
        $.MANY(() => {
          $.SUBRULE($['decorator'])
        })
      })
      $.CONSUME(Identifier)
      $.CONSUME(UrlPath)
      $.OPTION2(() => {
        $.SUBRULE($['Request'])
      })
      $.OPTION3(() => {
        $.CONSUME(ReturnsKeyword)
        $.SUBRULE($['Response'])
      })
    })

    $.RULE('serviceDefinition', () => {
      $.OPTION(() => {
        $.MANY(() => {
          $.SUBRULE($['decorator'])
        })
      })
      $.CONSUME(ServiceKeyword)
      $.CONSUME(Identifier)
      $.CONSUME(LCurly)
      $.OPTION2(() => {
        $.MANY2(() => {
          $.SUBRULE2($['methodDefinition'])
        })
      })
      $.CONSUME(RCurly)
    })

    this.performSelfAnalysis()
  }
}

const parser = new ApiParser()

// 创建一个访问者
const ApiVisitor = parser.getBaseCstVisitorConstructor()

interface ServiceDefinition {
  name: string
  decorator: Decorator[]
  methods: Method[]
}
interface Decorator {
  name: string
  args: Record<string, any> | string
}
interface Request {
  typeName: string
}
interface Response {
  typeName: string
}
interface FieldType {
  typeName: string
  isArray: boolean
}

interface Method {
  method: string
  url: string
  request?: Request
  response?: Response
  decorator: Decorator
}

interface Program {
  info: Info
  services: ServiceDefinition[]
  syntax: string
  messages: Record<string, Message>
}
interface Message {
  fields: Field[]
}
interface Field {
  name: string
  type: string
  isArray: boolean
  remark: string
}
type Info = Record<string, string>

export class ApiToAstVisitor extends ApiVisitor {
  constructor() {
    super()
    this.validateVisitor()
  }

  program(ctx: any) {
    const result: Program = {
      services: [],
      syntax: '',
      messages: {},
      info: {},
    }
    if (ctx.syntaxDeclaration) {
      Object.assign(result, this.visit(ctx.syntaxDeclaration[0]))
    }
    if (ctx.infoDeclaration) {
      Object.assign(result, this.visit(ctx.infoDeclaration[0]))
    }
    if (ctx.typeDefinition) {
      result.messages = ctx.typeDefinition.reduce(
        (acc: Record<string, any>, type: any) => Object.assign(acc, this.visit(type)),
        {}
      )
    }
    if (ctx.serviceDefinition) {
      result.services = map(ctx.serviceDefinition, (service) => this.visit(service))
    }
    // 处理其他可能的顶级声明
    return result
  }

  syntaxDeclaration(ctx: any) {
    return {
      syntax: ctx.StringLiteral[0].image.slice(1, -1), // 移除引号
    }
  }

  infoDeclaration(ctx: any): { info: Info } {
    const info = {}
    if (ctx.infoItem) {
      ctx.infoItem.forEach((item: any) => {
        Object.assign(info, this.visit(item))
      })
    }
    return { info }
  }

  infoItem(ctx: any) {
    const key = ctx.Identifier[0].image
    const value =
      ctx.StringLiteral?.[0].image.slice(1, -1) ??
      ctx.UrlPath?.[0].image ??
      ctx.TimeoutValue?.[0].image ??
      ctx.Identifier[1]?.image
    return { [key]: value }
  }
  fieldDefinition(ctx: any): Field {
    const typeResult = this.visit(ctx.fieldType)
    const { typeName, isArray } = typeResult
    return {
      name: ctx.Identifier[0].image,
      type: typeName,
      isArray: isArray,
      remark: ctx.RawString[0].image.slice(1, -1),
    }
  }
  messageDefinition(ctx: any): Record<string, Message> {
    const key = ctx.Identifier[0].image
    return {
      [key]: {
        fields: ctx.fieldDefinition?.map((field: any) => this.visit(field)) ?? [],
      },
    }
  }
  typeDefinition(ctx: any) {
    return ctx.messageDefinition.reduce(
      (acc: Record<string, any>, message: any) => Object.assign(acc, this.visit(message)),
      {}
    )
  }
  serviceDefinition(ctx: any): ServiceDefinition {
    const methods = map(ctx.methodDefinition, (method: any) => this.visit(method))
    const name = ctx.Identifier[0].image
    return {
      decorator: map(ctx.decorator, (decorator) => this.visit(decorator)),
      name,
      methods,
    }
  }
  decorator(ctx: any): Decorator {
    const name = ctx.Identifier[0].image
    const arg = ctx.Identifier[1]
    const visit = this.visit.bind(this)
    const infoItem: any[] = ctx.infoItem ?? []
    const args = arg ? arg.image : infoItem.reduce((acc: any, item: any) => ({ ...acc, ...visit(item) }), {})

    return {
      name,
      args,
    }
  }
  methodDefinition(ctx: any): Method {
    const method = ctx.Identifier[0].image
    const url = ctx.UrlPath[0].image
    return {
      method: method.toUpperCase(),
      url,
      request: this.visit(ctx.Request),
      response: this.visit(ctx.Response),
      decorator: ctx.decorator ? this.visit(ctx.decorator) : undefined,
    }
  }
  Request(ctx: any): Request {
    const typeName = ctx.Identifier[0].image
    return {
      typeName,
    }
  }
  Response(ctx: any): Response {
    const typeName = ctx.Identifier[0].image
    return {
      typeName,
    }
  }
  fieldType(ctx: any): FieldType {
    const typeName = ctx.Identifier[0].image
    const isArray = Boolean(ctx.LBrackets)
    return {
      typeName,
      isArray,
    }
  }
}

export const parse = (content: string): Program => {
  const tokens = tokenize(content)
  const apiParser = new ApiParser()
  apiParser.input = tokens
  const cst = apiParser['program']()
  const apiToAstVisitor = new ApiToAstVisitor()
  const ast = apiToAstVisitor.visit(cst)
  return ast
}
