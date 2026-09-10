// Spectral-Base-Runtime — Stability Primitives (v1.0)
// Core stability flags, checks, and deterministic fallback behaviors.

import { SpectralContext } from "./runtime-kernel";

export type StabilityFlag =
  | "STRICT_METRIC"
  | "ALLOW_DEGRADED_METRIC"
  | "DISABLE_EIGENFLOW"
  | "SAFE_MODE"
  | "LOG_UNSTABLE_INPUT";

export interface StabilityReport {
  readonly stable: boolean;
  readonly flags: StabilityFlag[];
  readonly warnings: string[];
}

export function hasFlag(
  context: SpectralContext | undefined,
  flag: StabilityFlag
): boolean {
  return context?.stabilityFlags?.includes(flag) ?? false;
}

export function evaluateStability(
  context: SpectralContext | undefined
): StabilityReport {
  const flags = (context?.stabilityFlags ?? []) as StabilityFlag[];
  const warnings: string[] = [];

  if (flags.includes("STRICT_METRIC") && !context?.metricHint) {
    warnings.push("STRICT_METRIC enabled but no metricHint provided.");
  }

  if (flags.includes("DISABLE_EIGENFLOW")) {
    warnings.push("Eigenflow operations should be disabled in this context.");
  }

  if (flags.includes("SAFE_MODE")) {
    warnings.push("SAFE_MODE enabled: prefer conservative operator behavior.");
  }

  const stable = warnings.length === 0;

  return {
    stable,
    flags,
    warnings,
  };
}

export function applyStabilityFallback<T>(
  value: T,
  context: SpectralContext | undefined
): T {
  const report = evaluateStability(context);

  if (!report.stable && hasFlag(context, "ALLOW_DEGRADED_METRIC")) {
    // In degraded metric mode, we still return the value but expect
    // upstream consumers to treat it as low-confidence.
    return value;
  }

  if (!report.stable && hasFlag(context, "SAFE_MODE")) {
    // In SAFE_MODE, upstream operators may choose to clamp, zero, or
    // otherwise sanitize outputs. Here we simply return the value and
    // rely on operator-level policies.
    return value;
  }

  return value;
}
