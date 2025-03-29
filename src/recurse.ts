export type Recurse<T> = T extends { _: unknown } ? Recurse<RecurseSub<T>> : T

type RecurseSub<T> =
  T extends { _: never } ? never
    : T extends { _: { _: infer U } } ? { _: RecurseSub<U> }
      : T extends { _: infer U } ? U
        : T
