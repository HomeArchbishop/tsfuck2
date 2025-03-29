import type { Char, CharDecrease, CharIncrease } from './char'
import type { StringFirst, StringRest } from './string'

export type TuringMachine<
  A extends string = any, B extends Char = any, C extends string = any
> = Tape<A, B, C>

interface Tape<A extends string, B extends Char, C extends string> {
  init: A
  curr: B
  rest: C
}

export type InitialTuringMachine = TuringMachine<'', '\x00', ''>

export type TuringMachineRightMove<
  TM extends TuringMachine
> = TM extends TuringMachine<infer A, infer B, infer C>
  ? C extends ''
    ? TuringMachine<`${B}${A}`, '\x00', ''>
    : TuringMachine<`${B}${A}`, StringFirst<C>, StringRest<C>>
  : never

export type TuringMachineLeftMove<
  TM extends TuringMachine
> = TM extends TuringMachine<infer A, infer B, infer C>
  ? A extends ''
    ? TuringMachine<'', '\x00', `${B}${C}`>
    : TuringMachine<StringRest<A>, StringFirst<A>, `${B}${C}`>
  : never

export type TuringMachineAdd<
  TM extends TuringMachine
> = TM extends TuringMachine<infer A, infer B, infer C>
  ? TuringMachine<A, CharIncrease<B>, C>
  : never

export type TuringMachineSub<
  TM extends TuringMachine
> = TM extends TuringMachine<infer A, infer B, infer C>
  ? TuringMachine<A, CharDecrease<B>, C>
  : never

export type TuringMachineInput<
  TM extends TuringMachine,
  V extends Char
> = TM extends TuringMachine<infer A, any, infer C>
  ? TuringMachine<A, V, C>
  : never

export type GetTuringMachineOutput<
  TM extends TuringMachine
> = TM extends TuringMachine<any, infer B>
  ? B
  : never
