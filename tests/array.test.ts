import type {
  ArrayRest, ArrayFirst
} from '../src/array'
import type { IsExtends, Test } from '../src/test'

export const ArrayRestTest: Test<[
  IsExtends<ArrayRest<[]>, never>,
  IsExtends<ArrayRest<[0]>, []>,
  IsExtends<ArrayRest<[0, 1]>, [1]>,
  IsExtends<ArrayRest<[0, 1, 2]>, [1, 2]>
]> = true

export const ArrayFirstTest: Test<[
  IsExtends<ArrayFirst<[]>, never>,
  IsExtends<ArrayFirst<[0]>, 0>,
  IsExtends<ArrayFirst<[0, 1]>, 0>,
  IsExtends<ArrayFirst<[0, 1, 2]>, 0>
]> = true
