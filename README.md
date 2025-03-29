# Tsfuck2

a tiny brainfuck interpreter by TypeScript type system.

一个用 TS 类型体操写成的 Brainfuck 解释器

- Accurate execution

- Great excptions handling

- **BETTER** than [tsfuck](https://github.com/homearchbishop/tsfuck) of mine

```ts
// tsfxxk
Tsfuck<'++[>+<-]>.', ''>
// ❌ Type instantiation is excessively deep and possibly infinite.

// tsfxxk2
Tsfuck<'++[>+<-]>.', ''>
// ✔️ '\x02'
```

## Try it

```sh
npm i tsfxxk2
# or
yarn add tsfxxk2
```

```ts
import type { Tsfuck } from 'tsfxxk2'

type Output = Tsfuck<',+.', 'a'> // extends 'b'
```

## Usage

Tsfuck provides an entry type:

```ts
type Tsfuck <ProgramString extends string, InputString extends string>
```

Simple enough! This type receives `ProgramString` and `InputString`, then extends the output string.

```ts
// e.g.
type Output = Tsfuck<',+.>,-.', 'ac'> // extends 'bb'
type Output = Tsfuck<'++[>+++[>+<-]+<-]>.>.', ''> // extends '\x01\x07'

// error
type Output = Tsfuck<'[', ''> // extends 'TsfuckError: Unbalanced brackets'
type Output = Tsfuck<',,,', 'ab'> // extends 'TsfuckError: Input not enough'
```
