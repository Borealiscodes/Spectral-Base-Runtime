import { buildStabilityContext, StabilityContext } from "./stability-context";
import { sanitizeInput } from "../stability/sanitization";
import { clampOutput } from "../stability/clamping";
import { enforceSpectralContinuity } from "../spectral/spectral-guard";
import { applyFallback } from "../stability/fallback";

export function runOperator<T, R>(
  operator: (input: T) => R,
  input: T
): R {
  const ctx: StabilityContext = buildStabilityContext();

  const sanitized = sanitizeInput(input, ctx);
  const result = operator(sanitized);
  const clamped = clampOutput(result, ctx);
  const continuity = enforceSpectralContinuity(clamped, ctx);
  const finalOutput = applyFallback(continuity, ctx);

  return finalOutput;
}
