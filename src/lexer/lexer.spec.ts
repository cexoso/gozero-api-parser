import { describe, it } from 'vitest'
import { tokenize } from './lexer'
import dedent from 'ts-dedent'

describe('api lexer', () => {
  it('syntax = "v1"', () => {
    tokenize(`syntax = "v1"`)
  })
  it('info', () => {
    tokenize(
      dedent`
        info (
          title:  "vivix_tiptap_proxy"
          desc:   "vivix_tiptap_proxy"
          author: "luis"
        )
      `
    )
  })
})
