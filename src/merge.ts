import { AsyncStream } from "./async-stream.js";

export function merge<A, B>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
): AsyncIterable<A | B>;
export function merge<A, B, C>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
  cs: AsyncIterable<C>,
): AsyncIterable<A | B | C>;
export function merge<A, B, C, D>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
  cs: AsyncIterable<C>,
  ds: AsyncIterable<D>,
): AsyncIterable<A | B | C | D>;
export function merge<A, B, C, D, E>(
  as: AsyncIterable<A>,
  bs: AsyncIterable<B>,
  cs: AsyncIterable<C>,
  ds: AsyncIterable<D>,
  es: AsyncIterable<E>,
): AsyncIterable<A | B | C | D | E>;
export function merge(...xs: Array<AsyncIterable<any>>): AsyncIterable<any> {
  let pending = xs.length;
  function decrementPending() {
    pending--;
    if (pending === 0) {
      stream.end();
    }
  }

  function consume(iterator: AsyncIterator<any>): void {
    iterator.next().then((x) => {
      if (x.done) decrementPending();
      else stream.next(x.value);
      consume(iterator);
    });
  }

  const stream = new AsyncStream();
  for (const x of xs) {
    consume(x[Symbol.asyncIterator]());
  }

  return stream;
}
