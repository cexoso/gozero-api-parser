import { CstParser } from 'chevrotain'
import {
  Colon,
  Equals,
  Identifier,
  InfoKeyword,
  LParen,
  RParen,
  StringLiteral,
  SyntaxKeyword,
  allTokens,
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
      $.CONSUME(StringLiteral)
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
