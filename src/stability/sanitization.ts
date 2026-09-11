import { StabilityContext } from "../runtime/stability-context";

export function sanitizeInput<T>(input: T, ctx: StabilityContext): T {
  ctx.pipeline.preSanitized = true;

  if (input === null || input === undefined) {
    return input;
  }

  if (typeof input === "number") {
    if (!Number.isFinite(input)) {
      return 0;
    }
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((v) => (Number.isFinite(v) ? v : 0)) as T;
  }

  return input;
}
