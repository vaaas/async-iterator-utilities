import { Unary } from "./types";

export async function* filterMap<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, B | undefined>,
): AsyncIterable<B> {
  for await (const x of xs) {
    const y = f(x);
    if (y !== undefined) {
      yield y;
    }
  }
}
