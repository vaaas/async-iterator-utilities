import { Maybe, Unary } from "./types";

export async function find<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): Promise<Maybe<X>> {
  for await (const x of xs) {
    if (f(x)) return x;
  }
  return undefined;
}
