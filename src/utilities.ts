import { AsyncStream } from "./async-stream";

type Unary<A, B> = (a: A) => B;

export async function* map<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, B>,
): AsyncIterable<B> {
  for await (const x of xs) {
    yield f(x);
  }
}

export async function* filter<X>(
  xs: AsyncIterable<X>,
  f: Unary<X, boolean>,
): AsyncIterable<X> {
  for await (const x of xs) {
    if (f(x)) yield x;
  }
}

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

export async function* filterMap<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, B | undefined>,
): AsyncIterable<B> {
  for await (const x of xs) {
    const y = f(x);
    if (y !== undefined) {
      yield y;
    }
  }
}

export async function* flatMap<A, B>(
  xs: AsyncIterable<A>,
  f: Unary<A, AsyncIterable<B>>,
): AsyncIterable<B> {
  for await (const x of xs) {
    yield* f(x);
  }
}

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
