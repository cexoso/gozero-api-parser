import { createToken, Lexer, CstParser, BaseParser } from 'chevrotain'

// 定义词法单元

// const Handler = createToken({ name: 'Handler', pattern: /@handler/ })
// const Get = createToken({ name: 'Get', pattern: /get/ })
// const Returns = createToken({ name: 'Returns', pattern: /returns/ })
// const Identifier = createToken({
//   name: 'Identifier',
//   pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
// })
// const Number = createToken({ name: 'Number', pattern: /\d+/ })
// const String = createToken({ name: 'String', pattern: /".*?"/ })
// const LCurly = createToken({ name: 'LCurly', pattern: /{/ })
// const RCurly = createToken({ name: 'RCurly', pattern: /}/ })
// const Colon = createToken({ name: 'Colon', pattern: /:/ })
// const Slash = createToken({ name: 'Slash', pattern: /\// })

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ })
const Service = createToken({ name: 'Service', pattern: /service/, longer_alt: Identifier })
const LCurly = createToken({ name: 'LCurly', pattern: /{/ })
const RCurly = createToken({ name: 'RCurly', pattern: /}/ })

const allTokens = [
  Service,
  createToken({
    name: 'WhiteSpace',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
  }),
  LCurly,
  RCurly,
  Identifier,
]
const ApiLexer = new Lexer(allTokens)

// 复用上面定义的词法单元

class ApiParser extends CstParser {
  constructor() {
    super(allTokens)

    const $ = this

    $.RULE('serviceDefinition', () => {
      $.CONSUME(Service)
      $.CONSUME(Identifier)
      $.CONSUME(LCurly)
      $.CONSUME(RCurly)
    })

    // 必须在构造函数的最后调用此方法
    this.performSelfAnalysis()
  }
}

export function tokenize(inputText: string) {
  const result = ApiLexer.tokenize(inputText)
  if (result.errors.length > 0) {
    throw new Error('Lexing errors detected: ' + result.errors)
  }
  return result.tokens
}

export function parse(inputText: string) {
  const tokens = tokenize(inputText)
  const parser = new ApiParser()
  parser.input = tokens
  const serviceDefinition = parser['serviceDefinition']()
  console.log('debugger 🐛 ', serviceDefinition.children)
}
