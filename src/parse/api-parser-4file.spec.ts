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
    expect(x).toMatchInlineSnapshot(`
      {
        "info": {
          "author": "jie",
          "desc": "server_proxy",
          "title": "server_proxy",
        },
        "messages": {
          "AppleLoginReq": {
            "fields": [
              {
                "isArray": false,
                "name": "code",
                "remark": "json:"code"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "nickname",
                "remark": "json:"nickname"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "email",
                "remark": "json:"email"",
                "type": "string",
              },
            ],
          },
          "AppleLoginRes": {
            "fields": [
              {
                "isArray": false,
                "name": "token",
                "remark": "json:"token"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "userInfo",
                "remark": "json:"userInfo"",
                "type": "UserInfo",
              },
              {
                "isArray": false,
                "name": "subscribeInfo",
                "remark": "json:"subscribeInfo"",
                "type": "SubscribeInfo",
              },
              {
                "isArray": false,
                "name": "isRegister",
                "remark": "json:"isRegister"",
                "type": "bool",
              },
            ],
          },
          "CancelPraiseVideoReq": {
            "fields": [
              {
                "isArray": false,
                "name": "videoId",
                "remark": "form:"videoId"",
                "type": "int64",
              },
            ],
          },
          "CancelPraiseVideoRes": {
            "fields": [],
          },
          "GenerateVideoReq": {
            "fields": [
              {
                "isArray": false,
                "name": "uploadId",
                "remark": "json:"uploadId"",
                "type": "string",
              },
            ],
          },
          "GenerateVideoRes": {
            "fields": [
              {
                "isArray": false,
                "name": "generateId",
                "remark": "json:"generateId"",
                "type": "int64",
              },
            ],
          },
          "GetMyInfoReq": {
            "fields": [],
          },
          "GetMyInfoRes": {
            "fields": [
              {
                "isArray": false,
                "name": "userInfo",
                "remark": "json:"userInfo"",
                "type": "UserInfo",
              },
              {
                "isArray": false,
                "name": "subscribeInfo",
                "remark": "json:"subscribeInfo"",
                "type": "SubscribeInfo",
              },
            ],
          },
          "GetMyPraiseListReq": {
            "fields": [
              {
                "isArray": false,
                "name": "page",
                "remark": "form:"page"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "pageSize",
                "remark": "form:"pageSize"",
                "type": "int32",
              },
            ],
          },
          "GetMyPraiseListRes": {
            "fields": [
              {
                "isArray": true,
                "name": "videoList",
                "remark": "json:"videoList"",
                "type": "VideoInfo",
              },
            ],
          },
          "GetMyVideoListReq": {
            "fields": [
              {
                "isArray": false,
                "name": "page",
                "remark": "form:"page"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "pageSize",
                "remark": "form:"pageSize"",
                "type": "int32",
              },
            ],
          },
          "GetMyVideoListRes": {
            "fields": [
              {
                "isArray": true,
                "name": "videoList",
                "remark": "json:"videoList"",
                "type": "VideoInfo",
              },
            ],
          },
          "GetSubscribeInfoReq": {
            "fields": [],
          },
          "GetSubscribeInfoRes": {
            "fields": [
              {
                "isArray": false,
                "name": "subscribeInfo",
                "remark": "json:"subscribeInfo"",
                "type": "SubscribeInfo",
              },
            ],
          },
          "GetUploadCredentialsReq": {
            "fields": [
              {
                "isArray": false,
                "name": "fileName",
                "remark": "json:"fileName"",
                "type": "string",
              },
            ],
          },
          "GetUploadCredentialsRes": {
            "fields": [
              {
                "isArray": false,
                "name": "dir",
                "remark": "json:"dir"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "host",
                "remark": "json:"host"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "policy",
                "remark": "json:"policy"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "securityToken",
                "remark": "json:"securityToken"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "signature",
                "remark": "json:"signature"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "xOssCredentials",
                "remark": "json:"xOssCredentials"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "xOssDate",
                "remark": "json:"xOssDate"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "xOssSignatureVersion",
                "remark": "json:"xOssSignatureVersion"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "callback",
                "remark": "json:"callback"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "uploadId",
                "remark": "json:"uploadId"",
                "type": "string",
              },
            ],
          },
          "GetVideoListReq": {
            "fields": [
              {
                "isArray": false,
                "name": "lastVideoId",
                "remark": "form:"lastVideoId"",
                "type": "int64",
              },
              {
                "isArray": false,
                "name": "pageSize",
                "remark": "form:"pageSize"",
                "type": "int32",
              },
            ],
          },
          "GetVideoListRes": {
            "fields": [
              {
                "isArray": true,
                "name": "videoList",
                "remark": "json:"videoList"",
                "type": "VideoInfo",
              },
            ],
          },
          "GetVideoStreamReq": {
            "fields": [
              {
                "isArray": false,
                "name": "generateId",
                "remark": "form:"generateId"",
                "type": "int64",
              },
            ],
          },
          "GoogleLoginReq": {
            "fields": [
              {
                "isArray": false,
                "name": "code",
                "remark": "json:"code"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "deviceType",
                "remark": "json:"deviceType,options:1=IOS,2=Android,3=Web"",
                "type": "int32",
              },
            ],
          },
          "GoogleLoginRes": {
            "fields": [
              {
                "isArray": false,
                "name": "token",
                "remark": "json:"token"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "userInfo",
                "remark": "json:"userInfo"",
                "type": "UserInfo",
              },
              {
                "isArray": false,
                "name": "subscribeInfo",
                "remark": "json:"subscribeInfo"",
                "type": "SubscribeInfo",
              },
              {
                "isArray": false,
                "name": "isRegister",
                "remark": "json:"isRegister"",
                "type": "bool",
              },
            ],
          },
          "OssCallbackReq": {
            "fields": [
              {
                "isArray": false,
                "name": "bucket",
                "remark": "json:"bucket"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "object",
                "remark": "json:"object"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "etag",
                "remark": "json:"etag"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "size",
                "remark": "json:"size"",
                "type": "int64",
              },
              {
                "isArray": false,
                "name": "mimeType",
                "remark": "json:"mimeType"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "uploadId",
                "remark": "json:"uploadId"",
                "type": "string",
              },
            ],
          },
          "OssCallbackRes": {
            "fields": [],
          },
          "PraiseVideoReq": {
            "fields": [
              {
                "isArray": false,
                "name": "videoId",
                "remark": "form:"videoId"",
                "type": "int64",
              },
            ],
          },
          "PraiseVideoRes": {
            "fields": [],
          },
          "PublishVideoReq": {
            "fields": [
              {
                "isArray": false,
                "name": "generateId",
                "remark": "form:"generateId"",
                "type": "int64",
              },
            ],
          },
          "PublishVideoRes": {
            "fields": [
              {
                "isArray": false,
                "name": "videoId",
                "remark": "json:"videoId"",
                "type": "int64",
              },
            ],
          },
          "RegisterReq": {
            "fields": [
              {
                "isArray": false,
                "name": "birthYear",
                "remark": "json:"birthYear"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "birthMonth",
                "remark": "json:"birthMonth"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "birthDay",
                "remark": "json:"birthDay"",
                "type": "int32",
              },
            ],
          },
          "RegisterRes": {
            "fields": [
              {
                "isArray": false,
                "name": "success",
                "remark": "json:"success"",
                "type": "bool",
              },
              {
                "isArray": false,
                "name": "token",
                "remark": "json:"token"",
                "type": "string",
              },
            ],
          },
          "ShareVideoReq": {
            "fields": [
              {
                "isArray": false,
                "name": "videoId",
                "remark": "form:"videoId"",
                "type": "int64",
              },
            ],
          },
          "ShareVideoRes": {
            "fields": [],
          },
          "SubscribeInfo": {
            "fields": [
              {
                "isArray": false,
                "name": "level",
                "remark": "json:"level"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "expireAt",
                "remark": "json:"expireAt"",
                "type": "int64",
              },
            ],
          },
          "SubscribeReq": {
            "fields": [],
          },
          "SubscribeRes": {
            "fields": [
              {
                "isArray": false,
                "name": "subscribeInfo",
                "remark": "json:"subscribeInfo"",
                "type": "SubscribeInfo",
              },
            ],
          },
          "UserInfo": {
            "fields": [
              {
                "isArray": false,
                "name": "id",
                "remark": "json:"id"",
                "type": "int64",
              },
              {
                "isArray": false,
                "name": "nickname",
                "remark": "json:"nickname"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "email",
                "remark": "json:"email"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "profileImageUrl",
                "remark": "json:"profileImageUrl"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "loginType",
                "remark": "json:"loginType,options:1=Apple,2=Google"",
                "type": "int32",
              },
            ],
          },
          "VideoInfo": {
            "fields": [
              {
                "isArray": false,
                "name": "id",
                "remark": "json:"id"",
                "type": "int64",
              },
              {
                "isArray": false,
                "name": "author",
                "remark": "json:"author"",
                "type": "UserInfo",
              },
              {
                "isArray": false,
                "name": "videoUrl",
                "remark": "json:"videoUrl"",
                "type": "string",
              },
              {
                "isArray": false,
                "name": "status",
                "remark": "json:"status,options:1=Published,2=Private"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "praiseCount",
                "remark": "json:"praiseCount"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "shareCount",
                "remark": "json:"shareCount"",
                "type": "int32",
              },
              {
                "isArray": false,
                "name": "createdAt",
                "remark": "json:"createdAt"",
                "type": "int64",
              },
              {
                "isArray": false,
                "name": "isPraised",
                "remark": "json:"isPraised"",
                "type": "bool",
              },
            ],
          },
        },
        "services": [
          {
            "decorator": [
              {
                "args": {
                  "group": "user",
                },
                "name": "server",
              },
            ],
            "methods": [
              {
                "decorator": {
                  "args": "GoogleLoginHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GoogleLoginReq",
                },
                "response": {
                  "typeName": "GoogleLoginRes",
                },
                "url": "/user/googleLogin",
              },
              {
                "decorator": {
                  "args": "AppleLoginHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "AppleLoginReq",
                },
                "response": {
                  "typeName": "AppleLoginRes",
                },
                "url": "/user/appleLogin",
              },
            ],
            "name": "server_proxy_api",
          },
          {
            "decorator": [
              {
                "args": {
                  "group": "user",
                  "middleware": "JwtAgentMiddleware",
                },
                "name": "server",
              },
            ],
            "methods": [
              {
                "decorator": {
                  "args": "RegisterHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "RegisterReq",
                },
                "response": {
                  "typeName": "RegisterRes",
                },
                "url": "/user/register",
              },
              {
                "decorator": {
                  "args": "GetMyInfoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetMyInfoReq",
                },
                "response": {
                  "typeName": "GetMyInfoRes",
                },
                "url": "/user/getMyInfo",
              },
            ],
            "name": "server_proxy_api",
          },
          {
            "decorator": [
              {
                "args": {
                  "group": "oss",
                  "middleware": "OssCallbackMiddleware",
                },
                "name": "server",
              },
            ],
            "methods": [
              {
                "decorator": {
                  "args": "OssCallbackHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "OssCallbackReq",
                },
                "response": {
                  "typeName": "OssCallbackRes",
                },
                "url": "/oss/callback",
              },
            ],
            "name": "server_proxy_api",
          },
          {
            "decorator": [
              {
                "args": {
                  "group": "video",
                  "middleware": "JwtAgentMiddleware",
                },
                "name": "server",
              },
            ],
            "methods": [
              {
                "decorator": {
                  "args": "GetUploadCredentialsHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetUploadCredentialsReq",
                },
                "response": {
                  "typeName": "GetUploadCredentialsRes",
                },
                "url": "/video/getUploadCredentials",
              },
              {
                "decorator": {
                  "args": "GenerateVideoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GenerateVideoReq",
                },
                "response": {
                  "typeName": "GenerateVideoRes",
                },
                "url": "/video/generateVideo",
              },
              {
                "decorator": {
                  "args": "GetVideoStreamHandler",
                  "name": "handler",
                },
                "method": "GET",
                "request": {
                  "typeName": "GetVideoStreamReq",
                },
                "response": undefined,
                "url": "/video/getVideoStream",
              },
              {
                "decorator": {
                  "args": "PublishVideoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "PublishVideoReq",
                },
                "response": {
                  "typeName": "PublishVideoRes",
                },
                "url": "/video/publishVideo",
              },
              {
                "decorator": {
                  "args": "GetVideoListHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetVideoListReq",
                },
                "response": {
                  "typeName": "GetVideoListRes",
                },
                "url": "/video/getVideoList",
              },
              {
                "decorator": {
                  "args": "GetMyVideoListHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetMyVideoListReq",
                },
                "response": {
                  "typeName": "GetMyVideoListRes",
                },
                "url": "/video/getMyVideoList",
              },
              {
                "decorator": {
                  "args": "GetMyPraiseListHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetMyPraiseListReq",
                },
                "response": {
                  "typeName": "GetMyPraiseListRes",
                },
                "url": "/video/getMyPraiseList",
              },
              {
                "decorator": {
                  "args": "PraiseVideoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "PraiseVideoReq",
                },
                "response": {
                  "typeName": "PraiseVideoRes",
                },
                "url": "/video/praiseVideo",
              },
              {
                "decorator": {
                  "args": "CancelPraiseVideoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "CancelPraiseVideoReq",
                },
                "response": {
                  "typeName": "CancelPraiseVideoRes",
                },
                "url": "/video/cancelPraiseVideo",
              },
              {
                "decorator": {
                  "args": "ShareVideoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "ShareVideoReq",
                },
                "response": {
                  "typeName": "ShareVideoRes",
                },
                "url": "/video/shareVideo",
              },
            ],
            "name": "server_proxy_api",
          },
          {
            "decorator": [
              {
                "args": {
                  "group": "sub",
                  "middleware": "JwtAgentMiddleware",
                  "prefix": "/internal/tool",
                  "timeout": "0s",
                },
                "name": "server",
              },
            ],
            "methods": [
              {
                "decorator": {
                  "args": "GetSubscribeInfoHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "GetSubscribeInfoReq",
                },
                "response": {
                  "typeName": "GetSubscribeInfoRes",
                },
                "url": "/sub/getSubscribeInfo",
              },
              {
                "decorator": {
                  "args": "SubscribeHandler",
                  "name": "handler",
                },
                "method": "POST",
                "request": {
                  "typeName": "SubscribeReq",
                },
                "response": {
                  "typeName": "SubscribeRes",
                },
                "url": "/sub/subscribe",
              },
            ],
            "name": "server_proxy_api",
          },
        ],
        "syntax": "v1",
      }
    `)
  })
})
