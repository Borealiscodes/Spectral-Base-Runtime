import { StabilityContext } from "../runtime/stability-context";

export function clampOutput<T>(output: T, ctx: StabilityContext): T {
  ctx.pipeline.postClamped = true;

  if (output === null || output === undefined) {
    return output;
  }

  if (typeof output === "number") {
    return clampNumber(output, ctx);
  }

  if (Array.isArray(output)) {
    return output.map((v) => clampNumber(v, ctx)) as T;
  }

  return output;
}

function clampNumber(value: number, ctx: StabilityContext): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (ctx.STRICT_METRIC) {
    const maxShift = ctx.spectral.maxEigenShift;
    if (value > maxShift) return maxShift;
    if (value < -maxShift) return -maxShift;
  }

  return value;
}
