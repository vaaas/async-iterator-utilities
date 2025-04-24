export async function* toAsyncIterable<X>(xs: Iterable<X>): AsyncIterable<X> {
  for (const x of xs) {
    yield Promise.resolve(x);
  }
}
