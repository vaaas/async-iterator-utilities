import { iter } from "./internal-helpers";

export async function* zip<A, B, C>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
): AsyncIterable<[A, B]> {
  const ai = iter(as);
  const bi = iter(bs);

  while (true) {
    const [a, b] = await Promise.all([ai.next(), bi.next()]);
    if (a.done || b.done) {
      break;
    }
    yield [a.value, b.value];
  }
}
