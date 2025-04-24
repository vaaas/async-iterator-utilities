export async function* replicate<X>(x: X): AsyncIterable<X> {
  while (true) {
    yield Promise.resolve(x);
  }
}
