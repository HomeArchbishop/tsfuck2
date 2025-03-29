import type { StringRest, StringFirst, StringJoin } from '../src/string'
import type { IsExtends, Test } from '../src/test'

export const StringRestTest: Test<[
  IsExtends<StringRest<''>, never>,
  IsExtends<StringRest<'0'>, ''>,
  IsExtends<StringRest<'01'>, '1'>,
  IsExtends<StringRest<'012'>, '12'>,
]> = true

export const StringFirstTest: Test<[
  IsExtends<StringFirst<''>, never>,
  IsExtends<StringFirst<'0'>, '0'>,
  IsExtends<StringFirst<'01'>, '0'>,
  IsExtends<StringFirst<'012'>, '0'>
]> = true

export const StringJoinTest: Test<[
  IsExtends<StringJoin<[]>, ''>,
  IsExtends<StringJoin<['0']>, '0'>,
  IsExtends<StringJoin<['0', '1']>, '01'>,
  IsExtends<StringJoin<['0', '1', '2']>, '012'>
]> = true
