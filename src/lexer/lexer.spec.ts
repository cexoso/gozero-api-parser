import { describe, expect, it } from 'vitest'
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
          title:  "server_proxy"
          desc:   "server_proxy"
          author: "jie"
        )
      `
    )
  })
  it('filed', () => {
    const x = tokenize(
      dedent`
        type (
          UserInfo {
		        id              int64  \`json:"id"\`
          }
        )
      `
    )
    expect(x).lengthOf(9)
  })
  it('service', () => {
    const x = tokenize(
      dedent`
        @server (
          group: "user"
        )
        service proxy_api {
          @handler GoogleLoginHandler
          post /user/googleLogin (GoogleLoginReq) returns (GoogleLoginRes)
        }
      `
    )
    expect(x).lengthOf(23)
  })

  it('decorator', () => {
    const x = tokenize(
      dedent`
        @server (
          group: "user"
        )
      `
    )
    expect(x).lengthOf(7)
  })
})
