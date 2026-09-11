import { applyFallback } from "../../src/stability/fallback";
import { buildStabilityContext } from "../../src/runtime/stability-context";

test("fallback clamps unstable values", () => {
  const ctx = buildStabilityContext();
  const result = applyFallback([5, -5], ctx);
  expect(result).toEqual([1, -1]);
});
