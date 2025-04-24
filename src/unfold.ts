import { Maybe, Unary } from "./types";

export async function* unfold<A, B>(
  f: Unary<A, Promise<Maybe<[B, A]>>>,
  i: A,
): AsyncIterable<B> {
  let a = i;
  while (true) {
    const result = await f(i);
    if (result === undefined) {
      break;
    }
    const [value, next] = result;
    a = next;
    yield value;
  }
}
