import { enumerate } from "./enumerate";
import { test, expect } from "vitest";
import { toArray } from "./to-array";

async function* empty() {}

async function* letters() {
  yield "a";
  yield "b";
  yield "c";
}

test("empty input results in empty output", async () => {
  const result = enumerate(empty());
  expect(await toArray(result)).toHaveLength(0);
});

test("adds the index of each element as a prefix", async () => {
  const result = enumerate(letters());
  expect(await toArray(result)).toStrictEqual([
    [0, "a"],
    [1, "b"],
    [2, "c"],
  ]);
});
