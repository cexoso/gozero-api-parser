# go-zero .api 文件的解析器

go-zero 自己定义了一套 api 语法，[API 规范](https://go-zero.dev/docs/tutorials#service-%E8%AF%AD%E5%8F%A5).

这是将 go-zero api 语法 parser 成 AST 的 javascript 解析器，基于 chevrotain 实现。

# 当前库的目的

将 .api 格式的语法生成 AST，以便于生成满足项目规范的代码。

# 免责声明

我对 golang 语法并不熟悉，并且我也没有完全读明白 [API 规范](https://go-zero.dev/docs/tutorials#service-%E8%AF%AD%E5%8F%A5) 对语法的定义。我只是基于我的理解以及我需要做的事在做解析。

# 安装

```bash
npm i @cexoso/gozero-api-parser
```

# 使用

```typescript
import { join } from 'path'
import { readFileSync } from 'fs'
import { parse } from '@cexoso/gozero-api-parser'

const content = readFileSync(join(__dirname, './content.api'), {
  encoding: 'utf8',
})

// 这里可以拿到 .api 文件生成的语法树
const ast = parse(content)
```
