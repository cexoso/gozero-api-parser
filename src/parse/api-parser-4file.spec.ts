import { describe, expect, it } from 'vitest'
import { parse } from './api-parser'
import { readFileSync } from 'fs'
import { join } from 'path'

const api = readFileSync(join(__dirname, '../datas/all.api'), {
  encoding: 'utf8',
})

describe('parser a file', () => {
  it('file1', () => {
    const x = parse(api)
    expect(x).deep.eq({
      info: {
        author: 'jie',
        desc: 'server_proxy',
        title: 'server_proxy',
      },
      messages: {
        AppleLoginReq: {
          fields: [
            {
              isArray: false,
              name: 'code',
              remark: 'json:"code"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'nickname',
              remark: 'json:"nickname"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'email',
              remark: 'json:"email"',
              type: 'string',
            },
          ],
        },
        AppleLoginRes: {
          fields: [
            {
              isArray: false,
              name: 'token',
              remark: 'json:"token"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'userInfo',
              remark: 'json:"userInfo"',
              type: 'UserInfo',
            },
            {
              isArray: false,
              name: 'isRegister',
              remark: 'json:"isRegister"',
              type: 'bool',
            },
          ],
        },
        GenerateVideoReq: {
          fields: [
            {
              isArray: false,
              name: 'uploadId',
              remark: 'json:"uploadId"',
              type: 'string',
            },
          ],
        },
        GenerateVideoRes: {
          fields: [
            {
              isArray: true,
              name: 'videoStream',
              remark: 'json:"videoStream"',
              type: 'byte',
            },
            {
              isArray: false,
              name: 'generateId',
              remark: 'json:"generateId"',
              type: 'int64',
            },
            {
              isArray: false,
              name: 'videoUrl',
              remark: 'json:"videoUrl"',
              type: 'string',
            },
          ],
        },
        GetUploadCredentialsReq: {
          fields: [
            {
              isArray: false,
              name: 'fileName',
              remark: 'json:"fileName"',
              type: 'string',
            },
          ],
        },
        GetUploadCredentialsRes: {
          fields: [
            {
              isArray: false,
              name: 'dir',
              remark: 'json:"dir"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'host',
              remark: 'json:"host"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'policy',
              remark: 'json:"policy"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'securityToken',
              remark: 'json:"securityToken"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'signature',
              remark: 'json:"signature"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'xOssCredentials',
              remark: 'json:"xOssCredentials"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'xOssDate',
              remark: 'json:"xOssDate"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'xOssSignatureVersion',
              remark: 'json:"xOssSignatureVersion"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'callback',
              remark: 'json:"callback"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'uploadId',
              remark: 'json:"uploadId"',
              type: 'string',
            },
          ],
        },
        GoogleLoginReq: {
          fields: [
            {
              isArray: false,
              name: 'code',
              remark: 'json:"code"',
              type: 'string',
            },
          ],
        },
        GoogleLoginRes: {
          fields: [
            {
              isArray: false,
              name: 'token',
              remark: 'json:"token"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'userInfo',
              remark: 'json:"userInfo"',
              type: 'UserInfo',
            },
            {
              isArray: false,
              name: 'isRegister',
              remark: 'json:"isRegister"',
              type: 'bool',
            },
          ],
        },
        OssCallbackReq: {
          fields: [
            {
              isArray: false,
              name: 'bucket',
              remark: 'json:"bucket"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'object',
              remark: 'json:"object"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'etag',
              remark: 'json:"etag"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'size',
              remark: 'json:"size"',
              type: 'int64',
            },
            {
              isArray: false,
              name: 'mimeType',
              remark: 'json:"mimeType"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'uploadId',
              remark: 'json:"uploadId"',
              type: 'string',
            },
          ],
        },
        OssCallbackRes: {
          fields: [],
        },
        RegisterRes: {
          fields: [
            {
              isArray: false,
              name: 'success',
              remark: 'json:"success"',
              type: 'bool',
            },
          ],
        },
        UserInfo: {
          fields: [
            {
              isArray: false,
              name: 'id',
              remark: 'json:"id"',
              type: 'int64',
            },
            {
              isArray: false,
              name: 'nickname',
              remark: 'json:"nickname"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'email',
              remark: 'json:"email"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'profileImageUrl',
              remark: 'json:"profileImageUrl"',
              type: 'string',
            },
            {
              isArray: false,
              name: 'loginType',
              remark: 'json:"loginType"',
              type: 'int',
            },
          ],
        },
      },
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
          name: 'server_proxy_api',
        },
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
          ],
          name: 'server_proxy_api',
        },
        {
          decorator: [
            {
              args: {
                group: 'oss',
              },
              name: 'server',
            },
          ],
          methods: [
            {
              decorator: {
                args: 'OssCallbackHandler',
                name: 'handler',
              },
              method: 'POST',
              request: {
                typeName: 'OssCallbackReq',
              },
              response: {
                typeName: 'OssCallbackRes',
              },
              url: '/oss/callback',
            },
          ],
          name: 'server_proxy_api',
        },
        {
          decorator: [
            {
              args: {
                group: 'video',
              },
              name: 'server',
            },
          ],
          methods: [
            {
              decorator: {
                args: 'GetUploadCredentialsHandler',
                name: 'handler',
              },
              method: 'POST',
              request: {
                typeName: 'GetUploadCredentialsReq',
              },
              response: {
                typeName: 'GetUploadCredentialsRes',
              },
              url: '/video/getUploadCredentials',
            },
            {
              decorator: {
                args: 'GenerateVideoHandler',
                name: 'handler',
              },
              method: 'POST',
              request: {
                typeName: 'GenerateVideoReq',
              },
              response: {
                typeName: 'GenerateVideoRes',
              },
              url: '/video/generateVideo',
            },
          ],
          name: 'server_proxy_api',
        },
      ],
      syntax: 'v1',
    })
  })
})
