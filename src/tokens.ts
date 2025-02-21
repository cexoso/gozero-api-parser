import { Lexer, createToken } from 'chevrotain'

// 定义 syntax 关键字的 token
const SyntaxKeyword = createToken({ name: 'SyntaxKeyword', pattern: /syntax/ })

// 定义等号的 token
const Equals = createToken({ name: 'Equals', pattern: /=/ })

// 定义字符串的 token (用于 "v1")
const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
})

// 定义空白字符的 token (可选,用于忽略空格)
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})

// 创建词法分析器
export const allTokens = [
  WhiteSpace, // 注意：空白字符 token 通常应该放在最前面
  SyntaxKeyword,
  Equals,
  StringLiteral,
]
