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
          title:  "service_proxy"
          desc:   "service_proxy"
          author: "jie"
        )
      `
    )
    expect(x).deep.eq({
      info: { title: 'service_proxy', desc: 'service_proxy', author: 'jie' },
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

describe('service definition', () => {
  it('service definition case1', () => {
    const x = parse(
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
    expect(x).deep.eq({
      decorator: [
        {
          args: {
            group: 'user',
          },
          name: 'server',
        },
      ],
      methods: {
        method: 'POST',
        request: {
          typeName: 'GoogleLoginReq',
        },
        response: {
          typeName: 'GoogleLoginRes',
        },
        url: '/user/googleLogin',
      },
      name: 'proxy_api',
    })
  })

  it('service definition case2', () => {
    const x = parse(
      dedent`
        @server (
          group:      "oss"
          middleware: OssCallbackMiddleware
        )
        service proxy_api {
          @handler OssCallbackHandler
          post /oss/callback (OssCallbackReq) returns (OssCallbackRes)
        }
      `
    )
    expect(x).deep.eq({
      decorator: [
        {
          args: {
            group: 'oss',
          },
          name: 'server',
        },
      ],
      methods: {
        method: 'POST',
        request: {
          typeName: 'OssCallbackReq',
        },
        response: {
          typeName: 'OssCallbackRes',
        },
        url: '/oss/callback',
      },
      name: 'proxy_api',
    })
  })
})
