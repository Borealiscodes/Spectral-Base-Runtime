// Spectral-Base-Runtime — Laplacian Operator (v1.0)
// Core spectral Laplacian over a simple manifold adjacency structure.

import {
  SpectralScalar,
  SpectralVector,
  ManifoldAdjacency,
  SpectralContext,
  SpectralOperator,
} from "../core/runtime-kernel";
import { hasFlag } from "../core/stability-primitives";

export interface LaplacianInput {
  readonly values: SpectralVector;
  readonly adjacency: ManifoldAdjacency;
}

export interface LaplacianOutput {
  readonly laplacian: SpectralVector;
}

export const LaplacianOperator: SpectralOperator<LaplacianInput, LaplacianOutput> =
{
  name: "laplacian",
  version: "1.0.0",

  execute(input: LaplacianInput, context?: SpectralContext): LaplacianOutput {
    if (hasFlag(context, "DISABLE_EIGENFLOW")) {
      // Laplacian itself is still allowed; flag is more relevant to eigenflow,
      // but we keep the check here for future policy hooks.
    }

    const { values, adjacency } = input;
    const n = adjacency.nodes;
    const result: SpectralVector = new Array<SpectralScalar>(n).fill(0);

    // Simple unweighted graph Laplacian:
    // (L f)(i) = sum_{j neighbor of i} (f(i) - f(j))
    const neighbors: number[][] = Array.from({ length: n }, () => []);

    for (const [u, v] of adjacency.edges) {
      if (u >= 0 && u < n && v >= 0 && v < n) {
        neighbors[u].push(v);
        neighbors[v].push(u);
      }
    }

    for (let i = 0; i < n; i++) {
      const vi = values[i] ?? 0;
      let acc = 0;
      for (const j of neighbors[i]) {
        const vj = values[j] ?? 0;
        acc += vi - vj;
      }
      result[i] = acc;
    }

    return { laplacian: result };
  },
};
