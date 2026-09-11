import { StabilityContext } from "./stability-context";

export function preSanitizeHook(ctx: StabilityContext): void {
  ctx.pipeline.preSanitized = true;
}

export function postClampHook(ctx: StabilityContext): void {
  ctx.pipeline.postClamped = true;
}

export function spectralContinuityHook(ctx: StabilityContext): void {
  if (ctx.spectral.enforceContinuity) {
    ctx.pipeline.continuityChecked = true;
  }
}

export function fallbackHook(ctx: StabilityContext): void {
  if (ctx.SAFE_MODE || ctx.STRICT_METRIC) {
    ctx.pipeline.fallbackTriggered = true;
  }
}
