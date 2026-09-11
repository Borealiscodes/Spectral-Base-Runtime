import { buildStabilityContext, StabilityContext } from "./stability-context";
import { sanitizeInput } from "../stability/sanitization";
import { clampOutput } from "../stability/clamping";
import { enforceSpectralContinuity } from "../spectral/spectral-guard";
import { applyFallback } from "../stability/fallback";
import { enforceManifoldAdjacency } from "../manifold/adjacency-guard";

export function runOperator<T, R>(
  operator: (input: T) => R,
  input: T
): R {
  const ctx: StabilityContext = buildStabilityContext();

  const sanitized = sanitizeInput(input, ctx);
  const result = operator(sanitized);
  const clamped = clampOutput(result, ctx);
  const continuity = enforceSpectralContinuity(clamped, ctx);
  const adjacency = enforceManifoldAdjacency(continuity, ctx);
  const finalOutput = applyFallback(adjacency, ctx);

  return finalOutput;
}
