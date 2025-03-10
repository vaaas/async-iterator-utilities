export async function* scan<A, B>(
  xs: AsyncIterable<A>,
  f: (acc: B, x: A) => B,
  initial: B,
): AsyncIterable<B> {
  let acc = initial;
  for await (const x of xs) {
    acc = f(acc, x);
    yield acc;
  }
}
