import type { Char } from './char'

export type StringRest<S extends string> = S extends `${string}${infer Rest}` ? Rest : never
export type StringFirst<S extends string> = S extends `${infer First}${string}` ? First extends Char ? First : never : never

export type StringJoin<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? `${First}${StringJoin<Rest>}`
  : ''
