import { gradient } from "../../src/operators/gradient";

test("operators contain no stability logic", () => {
  const result = gradient([1, 2, 3]);
  expect(result).toEqual([1, 1, 0]);
});
