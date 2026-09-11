import { enforceSpectralContinuity } from "../../src/spectral/spectral-guard";
import { buildStabilityContext } from "../../src/runtime/stability-context";

test("spectral continuity enforces eigen shift limits", () => {
  const ctx = buildStabilityContext();
  const result = enforceSpectralContinuity([10], ctx);
  expect(result[0]).toBe(ctx.spectral.maxEigenShift);
});
