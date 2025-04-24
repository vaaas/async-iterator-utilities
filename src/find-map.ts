import { Maybe, Unary } from "./types";

export async function findMap<X, Y>(
  xs: AsyncIterable<X>,
  f: Unary<X, Maybe<Y>>,
): Promise<Maybe<Y>> {
  for await (const x of xs) {
    const y = f(x);
    if (y !== undefined) {
      return y;
    }
  }
  return undefined;
}
