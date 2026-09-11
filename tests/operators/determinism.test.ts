import { laplacian } from "../../src/operators/laplacian";

test("operators are deterministic", () => {
  const input = [1, 2, 3];
  const r1 = laplacian(input);
  const r2 = laplacian(input);
  expect(r1).toEqual(r2);
});
