export class AsyncStream<T> implements AsyncIterable<T> {
  #queue: T[];
  #pending: undefined | ((value: IteratorResult<T>) => void);

  constructor(items: Iterable<T> = []) {
    this.#queue = Array.isArray(items) ? items : Array.from(items);
    this.#pending = undefined;
  }

  next(value: T): this {
    if (this.#pending) {
      this.#pending({ value, done: false });
      this.#pending = undefined;
    } else {
      this.#queue.push(value);
    }
    return this;
  }

  end() {
    if (this.#pending) {
      this.#pending({
        value: undefined,
        done: true,
      });
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: () =>
        new Promise((resolve) => {
          if (this.#queue.length > 0) {
            resolve({
              value: this.#queue.shift()!,
              done: false,
            });
          } else {
            this.#pending = resolve;
          }
        }),
    };
  }
}
