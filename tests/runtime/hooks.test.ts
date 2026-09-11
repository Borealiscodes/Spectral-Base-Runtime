import { buildStabilityContext } from "../../src/runtime/stability-context";
import { preSanitizeHook, postClampHook } from "../../src/runtime/enforcement-hooks";

test("hooks update pipeline flags", () => {
  const ctx = buildStabilityContext();
  preSanitizeHook(ctx);
  postClampHook(ctx);
  expect(ctx.pipeline.preSanitized).toBe(true);
  expect(ctx.pipeline.postClamped).toBe(true);
});
