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
} from '../tokens'
import { tokenize } from '../lexer/lexer'

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
      $.OR([{ ALT: () => $.CONSUME2(Identifier) }, { ALT: () => $.CONSUME(StringLiteral) }])
    })

    $.RULE('typeDefinition', () => {
      $.CONSUME(TypeKeyword)
      $.CONSUME(LParen)
      $.MANY(() => {
        $.SUBRULE($['messageDefinition'])
      })
      $.CONSUME(RParen)
    })
    $.RULE('fieldDefinition', () => {
      $.CONSUME(Identifier)
      $.CONSUME2(Identifier)
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
      $.SUBRULE($['Request'])
      $.CONSUME(ReturnsKeyword)
      $.SUBRULE($['Response'])
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
        $.SUBRULE2($['methodDefinition'])
      })
      $.CONSUME(RCurly)
    })

    this.performSelfAnalysis()
  }
}

const parser = new ApiParser()

// 创建一个访问者
const ApiVisitor = parser.getBaseCstVisitorConstructor()

class ApiToAstVisitor extends ApiVisitor {
  constructor() {
    super()
    this.validateVisitor()
  }

  program(ctx: any) {
    const result = {}
    if (ctx.syntaxDeclaration) {
      Object.assign(result, this.visit(ctx.syntaxDeclaration[0]))
    }
    if (ctx.infoDeclaration) {
      Object.assign(result, this.visit(ctx.infoDeclaration[0]))
    }
    if (ctx.typeDefinition) {
      Object.assign(result, this.visit(ctx.typeDefinition[0]))
    }
    if (ctx.serviceDefinition) {
      Object.assign(result, this.visit(ctx.serviceDefinition[0]))
    }
    // 处理其他可能的顶级声明
    return result
  }

  syntaxDeclaration(ctx: any) {
    return {
      syntax: ctx.StringLiteral[0].image.slice(1, -1), // 移除引号
    }
  }

  infoDeclaration(ctx: any) {
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
    const value = ctx.StringLiteral[0].image.slice(1, -1) // 移除引号
    return { [key]: value }
  }
  fieldDefinition(ctx: any) {
    return {
      name: ctx.Identifier[0].image,
      type: ctx.Identifier[1].image,
      remark: ctx.RawString[0].image.slice(1, -1),
    }
  }
  messageDefinition(ctx: any) {
    const key = ctx.Identifier[0].image
    return {
      [key]: {
        fields: ctx.fieldDefinition?.map((field: any) => this.visit(field)) ?? [],
      },
    }
  }
  typeDefinition(ctx: any) {
    return {
      messages: ctx.messageDefinition.reduce((acc: Record<string, any>, message: any) => {
        const m = this.visit(message)
        return Object.assign(acc, m)
      }, {}),
    }
  }
  serviceDefinition(ctx: any) {
    const methods = ctx.methodDefinition.reduce((acc: Record<string, any>, method: any) => {
      const m = this.visit(method)
      return Object.assign(acc, m)
    }, {})
    const name = ctx.Identifier[0].image
    return {
      decorator: ctx.decorator?.map((decorator: any) => this.visit(decorator)) ?? [],
      name,
      methods,
    }
  }
  decorator(ctx: any) {
    const name = ctx.Identifier[0].image
    return {
      name,
      // TODO: 兼容 @server xxx 形式的装饰器
      args: this.visit(ctx.infoItem),
    }
  }
  methodDefinition(ctx: any) {
    const method = ctx.Identifier[0].image
    const url = ctx.UrlPath[0].image
    return {
      method: method.toUpperCase(),
      url,
      request: this.visit(ctx.Request),
      response: this.visit(ctx.Response),
    }
  }
  Request(ctx: any) {
    const typeName = ctx.Identifier[0].image
    return {
      typeName,
    }
  }
  Response(ctx: any) {
    const typeName = ctx.Identifier[0].image
    return {
      typeName,
    }
  }
}

export const parse = (content: string) => {
  const tokens = tokenize(content)
  const apiParser = new ApiParser()
  apiParser.input = tokens
  const cst = apiParser['program']()
  const apiToAstVisitor = new ApiToAstVisitor()
  const ast = apiToAstVisitor.visit(cst)
  return ast
}
