export type IsExtends<T, U> = T extends never
  ? U extends never
    ? true : false
  : T extends U
    ? true : false

export type Test<Cases extends boolean[]> = Cases extends Array<true> ? true : false
