import type { IsExtends, Test } from '../src/test'
import type {
  IsBracketsBalanced, Tsfuck,
  TsfuckError
} from '../src/tsfuck'

export const IsBracketsBalancedTest: Test<[
  IsExtends<IsBracketsBalanced<''>, true>,
  IsExtends<IsBracketsBalanced<'+'>, true>,
  IsExtends<IsBracketsBalanced<'+>+'>, true>,

  IsExtends<IsBracketsBalanced<'[]'>, true>,
  IsExtends<IsBracketsBalanced<'[+]'>, true>,
  IsExtends<IsBracketsBalanced<'[+]>[+]'>, true>,
  IsExtends<IsBracketsBalanced<'[[+]]'>, true>,
  IsExtends<IsBracketsBalanced<'[[+]>[+]]'>, true>,
  IsExtends<IsBracketsBalanced<'+[[][][][][[]]]-'>, true>,

  IsExtends<IsBracketsBalanced<'['>, false>,
  IsExtends<IsBracketsBalanced<']'>, false>,
  IsExtends<IsBracketsBalanced<'[[]'>, false>,
  IsExtends<IsBracketsBalanced<'[]]'>, false>,
  IsExtends<IsBracketsBalanced<'[+]]'>, false>,
  IsExtends<IsBracketsBalanced<']['>, false>,
  IsExtends<IsBracketsBalanced<'[+]-[+]]'>, false>,
  IsExtends<IsBracketsBalanced<'[+]-[+]['>, false>,
]> = true

export const TsfuckTest: Test<[
  // empty program
  IsExtends<Tsfuck<'', ''>, ''>,

  // exceptions
  IsExtends<Tsfuck<'++,', ''>, TsfuckError<'Input not enough'>>,
  IsExtends<Tsfuck<'++,+++,', 'a'>, TsfuckError<'Input not enough'>>,
  IsExtends<Tsfuck<'+]', ''>, TsfuckError<'Unbalanced brackets'>>,
  IsExtends<Tsfuck<'0', ''>, TsfuckError<'Invalid program token'>>,
  IsExtends<Tsfuck<'++0+', ''>, TsfuckError<'Invalid program token'>>,

  // program with all valid characters
  IsExtends<Tsfuck<'+', ''>, ''>,
  IsExtends<Tsfuck<'+++.', ''>, '\x03'>,
  IsExtends<Tsfuck<'+++>++++.', ''>, '\x04'>,
  IsExtends<Tsfuck<'+++.>++++.<.', ''>, '\x03\x04\x03'>,
  IsExtends<Tsfuck<'+[>+++<-]>.', ''>, '\x03'>,
  IsExtends<Tsfuck<',+.', 'a'>, 'b'>,
  IsExtends<Tsfuck<',-.', 'b'>, 'a'>,
  IsExtends<Tsfuck<',+.', 'ab'>, 'b'>,

  // loop twice
  IsExtends<Tsfuck<'++[>+<-]>.', ''>, '\x02'>,
  IsExtends<Tsfuck<'++[>+++[>+<-]+<-]>.>.', ''>, '\x01\x07'>
]> = true
