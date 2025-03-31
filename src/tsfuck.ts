import type { ArrayRest } from './array'
import type { Recurse } from './recurse'
import type { StringFirst, StringRest } from './string'
import type { GetTuringMachineOutput, InitialTuringMachine, TuringMachine, TuringMachineAdd, TuringMachineInput, TuringMachineLeftMove, TuringMachineRightMove, TuringMachineSub } from './turing'

export type TsfuckError<T extends string> = `TsfuckError: ${T}`

type ProgramTokenADD = '+'
type ProgramTokenSUB = '-'
type ProgramTokenRIGHT = '>'
type ProgramTokenLEFT = '<'
type ProgramTokenLOOPSTART = '['
type ProgramTokenLOOPEND = ']'
type ProgramTokenOUTPUT = '.'
type ProgramTokenINPUT = ','

type ProgramTokenWHITESPACE = ' ' | '\n' | '\r' | '\t'

export type IsBracketsBalanced<
  P extends string,
  S extends any[] = []
> = P extends ''
  ? S['length'] extends 0
    ? true
    : false
  : StringFirst<P> extends ProgramTokenLOOPSTART
    ? IsBracketsBalanced<StringRest<P>, [...S, any]>
    : StringFirst<P> extends ProgramTokenLOOPEND
      ? S['length'] extends 0
        ? false
        : IsBracketsBalanced<StringRest<P>, ArrayRest<S>>
      : IsBracketsBalanced<StringRest<P>, S>

type Excute<
  P extends string,
  I extends string,
  TM extends TuringMachine = InitialTuringMachine,
  PStack extends string[] = [],
  Out extends string = '',
  LoopSkip extends string = ''
> = P extends ''
  ? Out
  : P extends `${infer ThisP}${infer RestP}`
    ? LoopSkip extends ''
      // If LoopSkip is empty, then execute the current program token
      ? ThisP extends ProgramTokenADD /* Handle: + */
        ? { _: Excute<RestP, I, TuringMachineAdd<TM>, PStack, Out> }
        : ThisP extends ProgramTokenSUB /* Handle: - */
          ? { _: Excute<RestP, I, TuringMachineSub<TM>, PStack, Out> }
          : ThisP extends ProgramTokenRIGHT /* Handle: > */
            ? { _: Excute<RestP, I, TuringMachineRightMove<TM>, PStack, Out> }
            : ThisP extends ProgramTokenLEFT /* Handle: < */
              ? { _: Excute<RestP, I, TuringMachineLeftMove<TM>, PStack, Out> }
              : ThisP extends ProgramTokenOUTPUT /* Handle: . */
                ? { _: Excute<RestP, I, TM, PStack, `${Out}${GetTuringMachineOutput<TM>}`> }
                : ThisP extends ProgramTokenINPUT /* Handle: , */
                  ? I extends ''
                    // If the input is empty, then use '\x00' as the input
                    ? { _: Excute<'', '', InitialTuringMachine, [], TsfuckError<'Input not enough'>> }
                    // Else, use the first character of the input as the input
                    : { _: Excute<RestP, StringRest<I>, TuringMachineInput<TM, StringFirst<I>>, PStack, Out> }
                  : ThisP extends ProgramTokenLOOPSTART /* Handle: [ */
                    ? GetTuringMachineOutput<TM> extends '\x00'
                      // If the current cell is 0, then mark the loop as skipped
                      ? { _: Excute<RestP, I, TM, PStack, Out, '_'> }
                      // Else, push the current program token to the stack
                      : { _: Excute<RestP, I, TM, [RestP, ...PStack], Out> }
                    : ThisP extends ProgramTokenLOOPEND /* Handle: ] */
                      ? GetTuringMachineOutput<TM> extends '\x00'
                        // If the current cell is 0, then pop the stack and continue
                        ? { _: Excute<RestP, I, TM, ArrayRest<PStack>, Out> }
                        // Else, use the top of the stack to backwards the loop
                        : { _: Excute<PStack[0], I, TM, PStack, Out> }
                      : ThisP extends ProgramTokenWHITESPACE /* Ignore whitespace */
                        ? { _: Excute<RestP, I, TM, PStack, Out, LoopSkip> }
                        : TsfuckError<'Invalid program token'>
      // If LoopSkip is not empty, then skip to the matching LOOPEND
      : ThisP extends ProgramTokenLOOPSTART
        ? { _: Excute<RestP, I, TM, PStack, Out, `_${LoopSkip}`> }
        : ThisP extends ProgramTokenLOOPEND
          ? { _: Excute<RestP, I, TM, PStack, Out, StringRest<LoopSkip>> }
          : { _: Excute<RestP, I, TM, PStack, Out, LoopSkip> }
    : never

export type Tsfuck<P extends string, I extends string> =
  IsBracketsBalanced<P> extends false
    ? TsfuckError<'Unbalanced brackets'>
    : Recurse<Excute<P, I>>
