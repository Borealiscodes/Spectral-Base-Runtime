import { StabilityContext } from "../runtime/stability-context";

export type ManifoldPoint = number[];

export function enforceManifoldAdjacency<T>(
  output: T,
  ctx: StabilityContext
): T {
  if (!ctx.manifold.enforceAdjacency) {
    return output;
  }

  ctx.pipeline.adjacencyChecked = true;

  if (output === null || output === undefined) {
    return output;
  }

  if (Array.isArray(output)) {
    return applyAdjacencyConstraints(output as unknown as ManifoldPoint[], ctx) as unknown as T;
  }

  return output;
}

function applyAdjacencyConstraints(
  points: ManifoldPoint[],
  ctx: StabilityContext
): ManifoldPoint[] {
  const maxAdjacencyDrift = ctx.manifold.maxAdjacencyDrift;

  if (!Number.isFinite(maxAdjacencyDrift) || maxAdjacencyDrift <= 0) {
    return points;
  }

  const result: ManifoldPoint[] = [];

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const previous = i > 0 ? points[i - 1] : current;

    result.push(limitDrift(previous, current, maxAdjacencyDrift));
  }

  return result;
}

function limitDrift(
  previous: ManifoldPoint,
  current: ManifoldPoint,
  maxAdjacencyDrift: number
): ManifoldPoint {
  if (previous.length !== current.length) {
    return current;
  }

  const adjusted: ManifoldPoint = [];

  for (let i = 0; i < current.length; i++) {
    const delta = current[i] - previous[i];

    if (!Number.isFinite(delta)) {
      adjusted.push(previous[i]);
      continue;
    }

    if (delta > maxAdjacencyDrift) {
      adjusted.push(previous[i] + maxAdjacencyDrift);
    } else if (delta < -maxAdjacencyDrift) {
      adjusted.push(previous[i] - maxAdjacencyDrift);
    } else {
      adjusted.push(current[i]);
    }
  }

  return adjusted;
}
