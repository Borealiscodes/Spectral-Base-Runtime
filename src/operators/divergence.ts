// Spectral-Base-Runtime — Divergence Operator (v1.0)
// Computes discrete divergence of a vector field over manifold adjacency.

import {
  SpectralScalar,
  SpectralVector,
  ManifoldAdjacency,
  SpectralContext,
  SpectralOperator,
} from "../core/runtime-kernel";
import { hasFlag } from "../core/stability-primitives";

export interface DivergenceInput {
  readonly field: SpectralVector;        // vector field defined per node
  readonly adjacency: ManifoldAdjacency; // manifold structure
}

export interface DivergenceOutput {
  readonly divergence: SpectralVector;   // scalar divergence per node
}

export const DivergenceOperator: SpectralOperator<
  DivergenceInput,
  DivergenceOutput
> = {
  name: "divergence",
  version: "1.0.0",

  execute(input: DivergenceInput, context?: SpectralContext): DivergenceOutput {
    const { field, adjacency } = input;
    const n = adjacency.nodes;

    const safeMode = hasFlag(context, "SAFE_MODE");

    // Build neighbor lists
    const neighbors: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of adjacency.edges) {
      if (u >= 0 && u < n && v >= 0 && v < n) {
        neighbors[u].push(v);
        neighbors[v].push(u);
      }
    }

    const divergence: SpectralVector = new Array<SpectralScalar>(n).fill(0);

    // Discrete divergence:
    // div F(i) = sum_{j neighbor of i} (F(j) - F(i))
    for (let i = 0; i < n; i++) {
      const Fi = field[i] ?? 0;
      const neigh = neighbors[i];

      if (neigh.length === 0) {
        divergence[i] = 0;
        continue;
      }

      let acc = 0;
      for (const j of neigh) {
        const Fj = field[j] ?? 0;
        acc += Fj - Fi;
      }

      let div = acc;

      if (safeMode) {
        // Clamp extreme divergence values in SAFE_MODE
        const CLAMP = 1e6;
        if (div > CLAMP) div = CLAMP;
        if (div < -CLAMP) div = -CLAMP;
      }

      divergence[i] = div;
    }

    return { divergence };
  },
};
