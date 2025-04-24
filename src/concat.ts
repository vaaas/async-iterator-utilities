export async function* concat<A, B>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
): AsyncIterable<A | B> {
  yield* as;
  yield* bs;
}
