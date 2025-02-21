import { describe, it } from 'vitest'
import { tokenize } from './lexer'
import { readFileSync } from 'fs'
import { join } from 'path'

const normal = readFileSync(join(__dirname, '../datas/normal.api'), {
  encoding: 'utf8',
})
describe('api lexer', () => {
  it('normal', () => {
    const x = tokenize(normal)
    console.log('debugger 🐛 x', x)
  })
})
