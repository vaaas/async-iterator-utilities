import { Unary } from "./types";

export async function some<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): Promise<boolean> {
  for await (const x of xs) {
    if (f(x)) {
      return true;
    }
  }
  return false;
}
