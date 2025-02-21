import { Lexer } from 'chevrotain'
import { allTokens } from '../tokens'

const ApiLexer = new Lexer(allTokens)

export function tokenize(inputText: string) {
  const result = ApiLexer.tokenize(inputText)
  if (result.errors.length > 0) {
    console.log(
      result.errors
        .slice(0, 10)
        .map((err) => {
          return err.message
        })
        .join('\n')
    )
    throw new Error('Lexing errors detected')
  }
  return result.tokens
}
