import { iter } from "./internal-helpers";
import { Binary } from "./types";

export async function* zipWith<A, B, C>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
  f: Binary<A, B, C>,
): AsyncIterable<Awaited<C>> {
  const ai = iter(as);
  const bi = iter(bs);

  while (true) {
    const [a, b] = await Promise.all([ai.next(), bi.next()]);
    if (a.done || b.done) {
      break;
    }
    yield f(a.value, b.value);
  }
}
