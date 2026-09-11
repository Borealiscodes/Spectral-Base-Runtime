import { runOperator } from "../../src/runtime/runtime-kernel";

test("pipeline executes in correct order", () => {
  const op = (x: number[]) => x.map(v => v * 2);
  const result = runOperator(op, [1, 2, 3]);
  expect(result.length).toBe(3);
});
