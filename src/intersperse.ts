import { iter } from "./internal-helpers";

export async function* intersperse<X, Y>(
  xs: AsyncIterable<X>,
  y: Y,
): AsyncIterable<X | Y> {
  const xi = iter(xs);

  {
    const first = await xi.next();
    if (first.done) {
      return;
    }
    yield first.value;
  }

  while (true) {
    const next = await xi.next();
    if (next.done) {
      break;
    }
    yield y;
    yield next.value;
  }
}
