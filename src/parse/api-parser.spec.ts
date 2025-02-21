import { describe, expect, it } from 'vitest'
import { parse } from './api-parser'
import dedent from 'ts-dedent'

describe('api lexer', () => {
  it('normal', () => {
    expect(parse(`syntax = "v1"`)).deep.eq({
      syntax: 'v1',
    })
  })
  it('info', () => {
    const x = parse(
      dedent`
        info (
          title:  "vivix_tiptap_proxy"
          desc:   "vivix_tiptap_proxy"
          author: "luis"
        )
      `
    )
    expect(x).deep.eq({
      info: { title: 'vivix_tiptap_proxy', desc: 'vivix_tiptap_proxy', author: 'luis' },
    })
  })
})
