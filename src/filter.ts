import { Unary } from "./types";

export async function* filter<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): AsyncIterable<X> {
  for await (const x of xs) {
    if (f(x)) yield x;
  }
}
