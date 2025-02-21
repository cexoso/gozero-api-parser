import { createToken, Lexer } from 'chevrotain'

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

export function tokenize(inputText: string) {
  const result = ApiLexer.tokenize(inputText)
  if (result.errors.length > 0) {
    throw new Error('Lexing errors detected: ' + result.errors)
  }
  return result.tokens
}
