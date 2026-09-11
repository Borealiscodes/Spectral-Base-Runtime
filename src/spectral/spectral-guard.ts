import { StabilityContext } from "../runtime/stability-context";

export function enforceSpectralContinuity<T>(output: T, ctx: StabilityContext): T {
  if (!ctx.spectral.enforceContinuity) {
    return output;
  }

  ctx.pipeline.continuityChecked = true;

  if (output === null || output === undefined) {
    return output;
  }

  if (typeof output === "number") {
    return applyEigenShiftLimit(output, ctx);
  }

  if (Array.isArray(output)) {
    return output.map((v) => applyEigenShiftLimit(v, ctx)) as T;
  }

  return output;
}

function applyEigenShiftLimit(value: number, ctx: StabilityContext): number {
  const maxShift = ctx.spectral.maxEigenShift;

  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value > maxShift) return maxShift;
  if (value < -maxShift) return -maxShift;

  return value;
}
