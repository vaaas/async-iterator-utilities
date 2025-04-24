import { AsyncStream } from "./async-stream";
import { iter } from "./internal-helpers";
import { Maybe } from "./types";

export class Interval implements AsyncIterable<undefined> {
  #id: Maybe<ReturnType<typeof setInterval>>;
  #dt: number;
  #stream: AsyncStream<undefined>;

  constructor(dt: number) {
    this.#id = undefined;
    this.#dt = dt;
    this.#stream = new AsyncStream();
  }

  end(): this {
    this.stop();
    this.#stream.end();
    return this;
  }

  stop(): this {
    if (this.#id) {
      clearInterval(this.#id);
      this.#id = undefined;
    }
    return this;
  }

  start(): this {
    if (!this.#id) {
      this.#id = setInterval(() => this.#stream.next(undefined), this.#dt);
    }
    return this;
  }

  [Symbol.asyncIterator](): AsyncIterator<undefined> {
    this.start();
    return iter(this.#stream);
  }
}
