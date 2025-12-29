import { describe, expect, it } from 'vitest'
import { parse } from './api-parser'
import dedent from 'ts-dedent'

describe('api lexer', () => {
  it('normal', () => {
    expect(parse(`syntax = "v1"`)).deep.eq({
      info: {},
      messages: {},
      services: [],
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
      messages: {},
      services: [],
      syntax: '',
    })
  })

  it('filed', () => {
    const x = parse(
      dedent`
        type (
          UserInfo {
            id              []int64  \`json:"id"\`
            nickname        string \`json:"nickname"\`
            email           string \`json:"email"\`
            profileImageUrl string \`json:"profileImageUrl"\`
            loginType       int    \`json:"loginType"\`
          }
        )
      `
    )
    expect(x).deep.eq({
      syntax: '',
      services: [],
      info: {},
      messages: {
        UserInfo: {
          fields: [
            { name: 'id', remark: 'json:"id"', type: 'int64', isArray: true },
            { name: 'nickname', remark: 'json:"nickname"', type: 'string', isArray: false },
            { name: 'email', remark: 'json:"email"', type: 'string', isArray: false },
            { name: 'profileImageUrl', remark: 'json:"profileImageUrl"', type: 'string', isArray: false },
            { name: 'loginType', remark: 'json:"loginType"', type: 'int', isArray: false },
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
      syntax: '',
      messages: {
        GoogleLoginReq: {
          fields: [{ name: 'code', remark: `json:"code"`, type: 'string', isArray: false }],
        },
        GoogleLoginRes: {
          fields: [
            { name: 'token', remark: `json:"token"`, type: 'string', isArray: false },
            { name: 'userInfo', remark: `json:"userInfo"`, type: 'UserInfo', isArray: false },
            { name: 'isRegister', remark: `json:"isRegister"`, type: 'bool', isArray: false },
          ],
        },
        OssCallbackRes: { fields: [] },
      },
      info: {},
      services: [],
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

          @handler AppleLoginHandler
          post /user/appleLogin (AppleLoginReq) returns (AppleLoginRes)
        }
      `
    )
    expect(x).deep.eq({
      info: {},
      messages: {},
      services: [
        {
          decorator: [
            {
              args: {
                group: 'user',
              },
              name: 'server',
            },
          ],
          methods: [
            {
              decorator: {
                args: 'GoogleLoginHandler',
                name: 'handler',
              },
              method: 'POST',
              request: {
                typeName: 'GoogleLoginReq',
              },
              response: {
                typeName: 'GoogleLoginRes',
              },
              url: '/user/googleLogin',
            },
            {
              decorator: {
                args: 'AppleLoginHandler',
                name: 'handler',
              },
              method: 'POST',
              request: {
                typeName: 'AppleLoginReq',
              },
              response: {
                typeName: 'AppleLoginRes',
              },
              url: '/user/appleLogin',
            },
          ],
          name: 'proxy_api',
        },
      ],
      syntax: '',
    })
  })
  it('service definition case3', () => {
    const x = parse(
      dedent`
        @server (
          group:      "user"
          middleware: JwtAgentMiddleware

        )
        service server_proxy_api {
          @handler RegisterHandler
          post /user/register returns (RegisterRes)

          @handler GetVideoStreamHandler
          get /video/getVideoStream (GetVideoStreamReq)
        }
      `
    )

    expect(x).deep.eq({
      info: {},
      messages: {},
      services: [
        {
          decorator: [
            {
              args: {
                group: 'user',
                middleware: 'JwtAgentMiddleware',
              },
              name: 'server',
            },
          ],
          methods: [
            {
              decorator: {
                args: 'RegisterHandler',
                name: 'handler',
              },
              method: 'POST',
              request: undefined,
              response: {
                typeName: 'RegisterRes',
              },
              url: '/user/register',
            },
            {
              decorator: {
                args: 'GetVideoStreamHandler',
                name: 'handler',
              },
              method: 'GET',
              request: {
                typeName: 'GetVideoStreamReq',
              },
              response: undefined,
              url: '/video/getVideoStream',
            },
          ],
          name: 'server_proxy_api',
        },
      ],
      syntax: '',
    })
  })
})
