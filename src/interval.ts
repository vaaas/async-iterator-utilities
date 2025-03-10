export class Interval implements AsyncIterable<undefined> {
  #id: undefined | ReturnType<typeof setInterval>;
  #dt: number;
  #pending: undefined | ((value: IteratorResult<undefined>) => void);

  constructor(dt: number) {
    this.#id = undefined;
    this.#dt = dt;
    this.#pending = undefined;
  }

  stop() {
    if (this.#id) {
      clearInterval(this.#id);
      this.#id = undefined;
    }

    if (this.#pending) {
      this.#pending({
        value: undefined,
        done: true,
      });
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<undefined> {
    this.#id = setInterval(() => {
      if (this.#pending) {
        this.#pending({
          value: undefined,
          done: false,
        });
      }
    }, this.#dt);

    return {
      next: () => {
        const promise = new Promise<IteratorResult<undefined>>((resolve) => {
          this.#pending = resolve;
        });
        return promise;
      },
    };
  }
}
