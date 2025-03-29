export type ArrayRest<T> = T extends [any, ...infer Rest] ? Rest : never
export type ArrayFirst<T> = T extends [infer First, ...any[]] ? First : never
