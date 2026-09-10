// Spectral-Base-Runtime — Gradient Operator (v1.0)
// Simple discrete gradient over a manifold adjacency structure.

import {
  SpectralScalar,
  SpectralVector,
  ManifoldAdjacency,
  SpectralContext,
  SpectralOperator,
} from "../core/runtime-kernel";
import { hasFlag } from "../core/stability-primitives";

export interface GradientInput {
  readonly values: SpectralVector;
  readonly adjacency: ManifoldAdjacency;
}

export interface NodeGradient {
  readonly node: number;
  readonly gradient: SpectralScalar;
}

export interface GradientOutput {
  readonly nodeGradients: NodeGradient[];
}

export const GradientOperator: SpectralOperator<GradientInput, GradientOutput> = {
  name: "gradient",
  version: "1.0.0",

  execute(input: GradientInput, context?: SpectralContext): GradientOutput {
    const { values, adjacency } = input;
    const n = adjacency.nodes;

    const nodeGradients: NodeGradient[] = [];

    // Optional: SAFE_MODE could later clamp or sanitize gradients.
    const safeMode = hasFlag(context, "SAFE_MODE");

    const neighbors: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of adjacency.edges) {
      if (u >= 0 && u < n && v >= 0 && v < n) {
        neighbors[u].push(v);
        neighbors[v].push(u);
      }
    }

    for (let i = 0; i < n; i++) {
      const vi = values[i] ?? 0;
      const neigh = neighbors[i];

      if (neigh.length === 0) {
        nodeGradients.push({ node: i, gradient: 0 });
        continue;
      }

      let sumDiff = 0;
      for (const j of neigh) {
        const vj = values[j] ?? 0;
        sumDiff += vj - vi;
      }

      let grad = sumDiff / neigh.length;

      if (safeMode) {
        // In SAFE_MODE, we can clamp extreme gradients.
        const CLAMP = 1e6;
        if (grad > CLAMP) grad = CLAMP;
        if (grad < -CLAMP) grad = -CLAMP;
      }

      nodeGradients.push({ node: i, gradient: grad });
    }

    return { nodeGradients };
  },
};
