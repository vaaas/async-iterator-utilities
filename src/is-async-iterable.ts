export function isAsyncIterable(x: unknown): x is AsyncIterable<unknown> {
  return (
    x !== null &&
    (typeof x === "object" || typeof x === "function") &&
    Symbol.asyncIterator in x
  );
}
