export async function* enumerate<X>(
  xs: AsyncIterable<X>,
): AsyncIterable<[number, X]> {
  let i = 0;
  for await (const x of xs) {
    yield [i++, x];
  }
}
