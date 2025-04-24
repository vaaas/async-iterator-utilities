import { Unary } from "./types";

export async function every<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): Promise<boolean> {
  for await (const x of xs) {
    if (!f(x)) {
      return false;
    }
  }
  return true;
}
