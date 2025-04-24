import { Maybe, Unary } from "./types";

export async function findIndex<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): Promise<Maybe<number>> {
  let i = 0;
  for await (const x of xs) {
    if (f(x)) return i;
    i++;
  }
  return undefined;
}
