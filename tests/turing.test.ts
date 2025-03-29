import type { IsExtends, Test } from '../src/test'
import type {
  InitialTuringMachine, TuringMachineRightMove, TuringMachineLeftMove,
  TuringMachineAdd, TuringMachineSub, TuringMachineInput, GetTuringMachineOutput
} from '../src/turing'

export const TuringMachineAddSubTest: Test<[
  // +
  IsExtends<TuringMachineAdd<InitialTuringMachine>, { init: '', curr: '\x01', rest: '' }>,

  // ++
  IsExtends<TuringMachineAdd<TuringMachineAdd<InitialTuringMachine>>, { init: '', curr: '\x02', rest: '' }>,

  // -
  IsExtends<TuringMachineSub<InitialTuringMachine>, { init: '', curr: '\xff', rest: '' }>,

  // --
  IsExtends<TuringMachineSub<TuringMachineSub<InitialTuringMachine>>, { init: '', curr: '\xfe', rest: '' }>,

  // +-
  IsExtends<TuringMachineAdd<TuringMachineSub<InitialTuringMachine>>, { init: '', curr: '\x00', rest: '' }>,

  // -+
  IsExtends<TuringMachineSub<TuringMachineAdd<InitialTuringMachine>>, { init: '', curr: '\x00', rest: '' }>,
]> = true

export const MoveTest: Test<[
  // >
  IsExtends<TuringMachineRightMove<InitialTuringMachine>, { init: '\x00', curr: '\x00', rest: '' }>,

  // >>
  IsExtends<TuringMachineRightMove<TuringMachineRightMove<InitialTuringMachine>>, { init: '\x00\x00', curr: '\x00', rest: '' }>,

  // <
  IsExtends<TuringMachineLeftMove<InitialTuringMachine>, { init: '', curr: '\x00', rest: '\x00' }>,

  // <<
  IsExtends<TuringMachineLeftMove<TuringMachineLeftMove<InitialTuringMachine>>, { init: '', curr: '\x00', rest: '\x00\x00' }>,

  // <>
  IsExtends<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine>>, { init: '\x00', curr: '\x00', rest: '' }>,

  // ><
  IsExtends<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine>>, { init: '', curr: '\x00', rest: '\x00' }>,

  // <><
  IsExtends<TuringMachineLeftMove<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine>>>, { init: '', curr: '\x00', rest: '\x00' }>,

  // ><>
  IsExtends<TuringMachineRightMove<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine>>>, { init: '\x00', curr: '\x00', rest: '' }>,

  // +<
  IsExtends<TuringMachineLeftMove<TuringMachineAdd<InitialTuringMachine>>, { init: '', curr: '\x00', rest: '\x01' }>,

  // +>
  IsExtends<TuringMachineRightMove<TuringMachineAdd<InitialTuringMachine>>, { init: '\x01', curr: '\x00', rest: '' }>,

  // <+<
  IsExtends<TuringMachineLeftMove<TuringMachineAdd<TuringMachineLeftMove<InitialTuringMachine>>>, { init: '', curr: '\x00', rest: '\x01\x00' }>,

  // >+>
  IsExtends<TuringMachineRightMove<TuringMachineAdd<TuringMachineRightMove<InitialTuringMachine>>>, { init: '\x01\x00', curr: '\x00', rest: '' }>
]> = true

export const TuringMachineInputTest: Test<[
  // ,
  IsExtends<TuringMachineInput<InitialTuringMachine, '\xea'>, { init: '', curr: '\xea', rest: '' }>
]> = true

export const GetTuringMachineOutputTest: Test<[
  // .
  IsExtends<GetTuringMachineOutput<InitialTuringMachine>, '\x00'>,

  // ,.
  IsExtends<GetTuringMachineOutput<TuringMachineInput<InitialTuringMachine, '\xea'>>, '\xea'>,

  // +>.
  IsExtends<GetTuringMachineOutput<TuringMachineRightMove<TuringMachineAdd<InitialTuringMachine>>>, '\x00'>
]> = true
