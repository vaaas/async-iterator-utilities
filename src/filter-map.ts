import { Maybe, Unary } from "./types";

export async function* filterMap<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, Maybe<undefined>>,
): AsyncIterable<B> {
  for await (const x of xs) {
    const y = f(x);
    if (y !== undefined) {
      yield y;
    }
  }
}
