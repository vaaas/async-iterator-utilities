export async function reduce<A, B>(
  xs: AsyncIterable<A>,
  f: (acc: B, x: A) => B,
  initial: B,
): Promise<B> {
  let acc = initial;
  for await (const x of xs) {
    acc = f(acc, x);
  }
  return acc;
}
