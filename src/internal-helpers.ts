import { Maybe } from "./types";

export class List<T> {
  head: Maybe<Node<T>>;
  last: Maybe<Node<T>>;
  length: number;

  constructor(items: Iterable<T>) {
    this.head = undefined;
    this.last = undefined;
    this.length = 0;
    for (const item of items) {
      this.push(item);
    }
  }

  push(x: T): this {
    const node = new Node(x);
    if (this.length) {
      this.last!.next = node;
      this.last = node;
    } else {
      this.head = node;
      this.last = node;
    }
    this.length++;
    return this;
  }

  shift(): Maybe<T> {
    switch (this.length) {
      case 0:
        return undefined;
      case 1: {
        const value = this.head!.value;
        this.head = this.last = undefined;
        this.length--;
        return value;
      }
      default: {
        const value = this.head!.value;
        this.head = this.head!.next;
        this.length--;
        return value;
      }
    }
  }

  clear() {
    this.length = 0;
    this.head = this.last = undefined;
  }
}

class Node<T> {
  readonly value: T;
  next: Maybe<Node<T>>;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}

export function iter<X>(xs: AsyncIterable<X>): AsyncIterator<X> {
  return xs[Symbol.asyncIterator]();
}
