import { Lexer, createToken } from 'chevrotain'

export const SyntaxKeyword = createToken({ name: 'SyntaxKeyword', pattern: /syntax/ })
export const TypeKeyword = createToken({ name: 'TypeKeyword', pattern: /type/ })

export const Equals = createToken({ name: 'Equals', pattern: /=/ })

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

export const InfoKeyword = createToken({ name: 'InfoKeyword', pattern: /info/ })
export const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ })
export const LParen = createToken({ name: 'LParen', pattern: /\(/ })
export const RParen = createToken({ name: 'RParen', pattern: /\)/ })
export const Colon = createToken({ name: 'Colon', pattern: /:/ })

export const LCurly = createToken({ name: 'LCurly', pattern: /{/ })
export const RCurly = createToken({ name: 'RCurly', pattern: /}/ })
export const LBrackets = createToken({ name: 'LBrackets', pattern: /\[/ })
export const RBrackets = createToken({ name: 'RBrackets', pattern: /]/ })
// 新增 RawString token 来匹配原始字符串
export const RawString = createToken({
  name: 'RawString',
  pattern: /`[^`]*`/,
})

// 单行注释 token
export const SingleLineComment = createToken({
  name: 'SingleLineComment',
  pattern: /\/\/[^\n\r]*/,
  group: Lexer.SKIPPED,
})

// 多行注释 token
export const MultiLineComment = createToken({
  name: 'MultiLineComment',
  pattern: /\/\*[\s\S]*?\*\//,
  group: Lexer.SKIPPED,
})

// 新的 Token
export const At = createToken({ name: 'At', pattern: /@/ })
export const ServiceKeyword = createToken({ name: 'ServiceKeyword', pattern: /service/ })
export const ReturnsKeyword = createToken({ name: 'ReturnsKeyword', pattern: /returns/ })
// 新的 UrlPath token
export const UrlPath = createToken({
  name: 'UrlPath',
  pattern: /\/[a-zA-Z0-9_\-\/]+/,
})

// 创建词法分析器
export const allTokens = [
  WhiteSpace, // 注意：空白字符 token 通常应该放在最前面
  SyntaxKeyword,
  ServiceKeyword,
  ReturnsKeyword,
  TypeKeyword,
  Equals,
  StringLiteral,
  InfoKeyword,
  Identifier,
  LParen,
  RParen,
  Colon,
  LCurly,
  LBrackets,
  RBrackets,
  RCurly,
  RawString,
  MultiLineComment,
  SingleLineComment,
  At,
  UrlPath,
]
