import { Lexer, createToken } from 'chevrotain'

// 定义 syntax 关键字的 token
export const SyntaxKeyword = createToken({ name: 'SyntaxKeyword', pattern: /syntax/ })

// 定义等号的 token
export const Equals = createToken({ name: 'Equals', pattern: /=/ })

// 定义字符串的 token (用于 "v1")
export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
})

// 定义空白字符的 token (可选,用于忽略空格)
export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})

// 新的 Token
export const InfoKeyword = createToken({ name: 'InfoKeyword', pattern: /info/ })
export const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ })
export const LParen = createToken({ name: 'LParen', pattern: /\(/ })
export const RParen = createToken({ name: 'RParen', pattern: /\)/ })
export const Colon = createToken({ name: 'Colon', pattern: /:/ })

// 创建词法分析器
export const allTokens = [
  WhiteSpace, // 注意：空白字符 token 通常应该放在最前面
  SyntaxKeyword,
  Equals,
  StringLiteral,
  InfoKeyword,
  Identifier,
  LParen,
  RParen,
  Colon,
]
