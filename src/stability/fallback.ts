import { StabilityContext } from "../runtime/stability-context";

export function applyFallback<T>(output: T, ctx: StabilityContext): T {
  if (!ctx.SAFE_MODE && !ctx.STRICT_METRIC) {
    return output;
  }

  ctx.pipeline.fallbackTriggered = true;

  if (output === null || output === undefined) {
    return output;
  }

  if (typeof output === "number") {
    return fallbackNumber(output);
  }

  if (Array.isArray(output)) {
    return output.map((v) => fallbackNumber(v)) as T;
  }

  return output;
}

function fallbackNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value > 1) return 1;
  if (value < -1) return -1;

  return value;
}
