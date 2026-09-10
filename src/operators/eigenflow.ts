// Spectral-Base-Runtime — Eigenflow Engine (v1.0)
// Lightweight eigenflow-style propagation over a manifold adjacency structure.

import {
  SpectralScalar,
  SpectralVector,
  ManifoldAdjacency,
  SpectralContext,
  SpectralOperator,
} from "../core/runtime-kernel";
import { hasFlag } from "../core/stability-primitives";

export interface EigenflowInput {
  readonly values: SpectralVector;
  readonly adjacency: ManifoldAdjacency;
  readonly steps?: number;
  readonly damping?: SpectralScalar;
}

export interface EigenflowOutput {
  readonly propagated: SpectralVector;
  readonly steps: number;
}

export const EigenflowOperator: SpectralOperator<EigenflowInput, EigenflowOutput> =
{
  name: "eigenflow",
  version: "1.0.0",

  execute(input: EigenflowInput, context?: SpectralContext): EigenflowOutput {
    if (hasFlag(context, "DISABLE_EIGENFLOW")) {
      // If eigenflow is disabled, return the original values unchanged.
      return {
        propagated: [...input.values],
        steps: 0,
      };
    }

    const { values, adjacency } = input;
    const n = adjacency.nodes;
    const steps = input.steps ?? 3;
    const damping = input.damping ?? 0.5;

    let current: SpectralVector = [...values];

    // Build neighbor lists from adjacency.
    const neighbors: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of adjacency.edges) {
      if (u >= 0 && u < n && v >= 0 && v < n) {
        neighbors[u].push(v);
        neighbors[v].push(u);
      }
    }

    // Simple iterative "eigenflow-like" smoothing:
    // x_{t+1}(i) = (1 - d) * x_t(i) + d * avg_{j neighbor of i} x_t(j)
    for (let s = 0; s < steps; s++) {
      const next: SpectralVector = new Array<SpectralScalar>(n).fill(0);

      for (let i = 0; i < n; i++) {
        const xi = current[i] ?? 0;
        const neigh = neighbors[i];

        if (neigh.length === 0) {
          next[i] = xi;
          continue;
        }

        let sum = 0;
        for (const j of neigh) {
          sum += current[j] ?? 0;
        }
        const avg = sum / neigh.length;
        next[i] = (1 - damping) * xi + damping * avg;
      }

      current = next;
    }

    return {
      propagated: current,
      steps,
    };
  },
};
