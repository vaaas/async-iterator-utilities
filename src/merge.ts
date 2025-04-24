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
  const stream = new AsyncStream();
  let pending = xs.length;

  function done() {
    pending--;
    if (pending === 0) {
      stream.end();
    }
  }

  async function consume(xs: AsyncIterable<any>): Promise<void> {
    for await (const x of xs) {
      stream.next(x);
    }
    done();
  }

  for (const x of xs) {
    consume(x);
  }

  return stream;
}
