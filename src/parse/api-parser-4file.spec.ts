import { describe, expect, it } from 'vitest'
import { parse } from './api-parser'
import dedent from 'ts-dedent'
import { readFileSync } from 'fs'
import { join } from 'path'

const api = readFileSync(join(__dirname, '../datas/all.api'), {
  encoding: 'utf8',
})
describe('parser a file', () => {
  it('file1', () => {
    console.log(parse(api))
  })
})
