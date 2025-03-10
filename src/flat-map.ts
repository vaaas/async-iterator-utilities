import { Unary } from "./types";

export async function* flatMap<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, AsyncIterable<B>>,
): AsyncIterable<B> {
  for await (const x of xs) {
    yield* f(x);
  }
}
