import { sanitizeInput } from "../../src/stability/sanitization";
import { buildStabilityContext } from "../../src/runtime/stability-context";

test("sanitization normalizes non-finite numbers", () => {
  const ctx = buildStabilityContext();
  const result = sanitizeInput([1, Infinity, -Infinity], ctx);
  expect(result).toEqual([1, 0, 0]);
});
