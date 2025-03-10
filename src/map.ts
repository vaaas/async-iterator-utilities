import { Unary } from "./types";

export async function* map<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, B>,
): AsyncIterable<B> {
  for await (const x of xs) {
    yield f(x);
  }
}
