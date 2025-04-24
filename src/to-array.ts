export async function toArray<X>(xs: AsyncIterable<X>): Promise<Array<X>> {
  const arr: Array<X> = [];
  for await (const x of xs) {
    arr.push(x);
  }
  return arr;
}
