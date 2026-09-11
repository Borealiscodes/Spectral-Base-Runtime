import { enforceManifoldAdjacency } from "../../src/manifold/adjacency-guard";
import { buildStabilityContext } from "../../src/runtime/stability-context";

test("adjacency guard limits drift between sequential manifold points", () => {
  const ctx = buildStabilityContext();
  ctx.manifold.enforceAdjacency = true;
  ctx.manifold.maxAdjacencyDrift = 1;

  const input = [
    [0, 0],
    [3, -2],
    [4, -5]
  ];

  const result = enforceManifoldAdjacency(input, ctx);

  expect(result[0]).toEqual([0, 0]);
  expect(result[1]).toEqual([1, -1]);
  expect(result[2]).toEqual([2, -2]);
});

test("adjacency guard preserves points when drift is within limits", () => {
  const ctx = buildStabilityContext();
  ctx.manifold.enforceAdjacency = true;
  ctx.manifold.maxAdjacencyDrift = 5;

  const input = [
    [1, 1],
    [3, 4],
    [6, 8]
  ];

  const result = enforceManifoldAdjacency(input, ctx);

  expect(result).toEqual(input);
});

test("adjacency guard handles non-finite values safely", () => {
  const ctx = buildStabilityContext();
  ctx.manifold.enforceAdjacency = true;
  ctx.manifold.maxAdjacencyDrift = 2;

  const input = [
    [0, 0],
    [Infinity, -Infinity]
  ];

  const result = enforceManifoldAdjacency(input, ctx);

  expect(result[1]).toEqual([0, 0]);
});
