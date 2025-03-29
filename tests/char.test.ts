import type { IsExtends, Test } from '../src/test'
import type {
  CharIncrease, CharDecrease, Char
} from '../src/char'

export const CharIncreaseTest: Test<[
  IsExtends<Char, string>,
  IsExtends<CharIncrease<'\x00'>, '\x01'>,
  IsExtends<CharIncrease<'\xff'>, '\x00'>
]> = true

export const AsciiDecreaseTest: Test<[
  IsExtends<CharDecrease<'\x00'>, '\xff'>,
  IsExtends<CharDecrease<'\xff'>, '\xfe'>
]> = true
