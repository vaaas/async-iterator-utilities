import { concat } from "./concat";
import { test, expect } from "vitest";
import { toArray } from "./to-array";

async function* empty() {}

async function* nums() {
  yield 1;
  yield 2;
  yield 3;
}

async function* letters() {
  yield "a";
  yield "b";
  yield "c";
}

test("combining empty iterables results in an empty iterable", async () => {
  const result = concat(empty(), empty());
  expect(await toArray(result)).toHaveLength(0);
});

test("empty iterables are the identity element", async () => {
  const left = concat(empty(), nums());
  const right = concat(nums(), empty());
  expect(await toArray(left)).toStrictEqual([1, 2, 3]);
  expect(await toArray(right)).toStrictEqual([1, 2, 3]);
});

test("inserts the first argument before the right", async () => {
  const result = concat(nums(), letters());
  expect(await toArray(result)).toStrictEqual([1, 2, 3, "a", "b", "c"]);
});
