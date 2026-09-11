import { clampOutput } from "../../src/stability/clamping";
import { buildStabilityContext } from "../../src/runtime/stability-context";

test("clamping enforces spectral bounds", () => {
  const ctx = buildStabilityContext();
  const result = clampOutput([0.1, 0.2, 10], ctx);
  expect(result[2]).toBe(ctx.spectral.maxEigenShift);
});
