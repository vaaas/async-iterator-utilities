export type Unary<A, B> = (a: A) => B;

export type Binary<A, B, C> = (a: A, b: B) => C;

export type Maybe<T> = undefined | T;
