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

  it('filed', () => {
    const x = parse(
      dedent`
        type (
          UserInfo {
            id              int64  \`json:"id"\`
            nickname        string \`json:"nickname"\`
            email           string \`json:"email"\`
            profileImageUrl string \`json:"profileImageUrl"\`
            loginType       int    \`json:"loginType"\`
          }
        )
      `
    )
    expect(x).deep.eq({
      messages: {
        UserInfo: {
          fields: [
            { name: 'id', remark: 'json:"id"', type: 'int64' },
            { name: 'nickname', remark: 'json:"nickname"', type: 'string' },
            { name: 'email', remark: 'json:"email"', type: 'string' },
            { name: 'profileImageUrl', remark: 'json:"profileImageUrl"', type: 'string' },
            { name: 'loginType', remark: 'json:"loginType"', type: 'int' },
          ],
        },
      },
    })
  })

  it('fileds', () => {
    const x = parse(
      dedent`
        type (
          GoogleLoginReq {
            code string \`json:"code"\`
          }
          GoogleLoginRes {
            token      string   \`json:"token"\`
            userInfo   UserInfo \`json:"userInfo"\`
            isRegister bool     \`json:"isRegister"\`
          }
	        OssCallbackRes  {}
        )
      `
    )
    expect(x).deep.eq({
      messages: {
        GoogleLoginReq: {
          fields: [{ name: 'code', remark: `json:"code"`, type: 'string' }],
        },
        GoogleLoginRes: {
          fields: [
            { name: 'token', remark: `json:"token"`, type: 'string' },
            { name: 'userInfo', remark: `json:"userInfo"`, type: 'UserInfo' },
            { name: 'isRegister', remark: `json:"isRegister"`, type: 'bool' },
          ],
        },
        OssCallbackRes: { fields: [] },
      },
    })
  })
})
