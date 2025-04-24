export function isAsyncIterable(xs: unknown): xs is AsyncIterable<unknown> {
  return !!xs && typeof xs[Symbol.asyncIterator] === "function";
}
