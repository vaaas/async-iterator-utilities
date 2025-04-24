import { List } from "./internal-helpers";
import { Maybe, Unary } from "./types";

export class AsyncStream<T> implements AsyncIterable<T> {
  #queue: List<T>;
  #pending: Maybe<Unary<IteratorResult<T>, void>>;
  #ended: boolean;

  constructor(items: Iterable<T> = []) {
    this.#queue = new List(items);
    this.#pending = undefined;
    this.#ended = false;
  }

  next(value: T): this {
    if (this.#ended) {
      return this;
    }
    this.#pending
      ? this.#pending({ value, done: false })
      : this.#queue.push(value);
    return this;
  }

  end(): this {
    if (this.#ended) {
      return this;
    }
    if (this.#pending) {
      this.#pending({
        value: undefined,
        done: true,
      });
    }
    this.#queue.clear();
    this.#ended = true;
    return this;
  }

  #makePending(
    resolve: Unary<IteratorResult<T>, void>,
  ): Unary<IteratorResult<T>, void> {
    return (value) => {
      resolve(value);
      this.#pending = undefined;
    };
  }

  #consume(): Promise<IteratorResult<T>> {
    return new Promise((resolve) => {
      if (this.#ended) {
        resolve({
          value: undefined,
          done: true,
        });
      } else if (this.#queue.length > 0) {
        resolve({
          value: this.#queue.shift()!,
          done: false,
        });
      } else {
        this.#pending = this.#makePending(resolve);
      }
    });
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return { next: this.#consume.bind(this) };
  }

  static from<T>(f: Unary<AsyncStream<T>, void>): AsyncStream<T> {
    const stream = new AsyncStream<T>();
    f(stream);
    return stream;
  }
}
