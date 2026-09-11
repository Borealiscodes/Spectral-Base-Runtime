export interface StabilityContext {
  // Global stability modes
  SAFE_MODE: boolean;
  STRICT_METRIC: boolean;
  ALLOW_DEGRADED_METRIC: boolean;

  // Spectral continuity metadata
  spectral: {
    enforceContinuity: boolean;
    eigenThreshold: number;
    maxEigenShift: number;
  };

  // Manifold adjacency metadata
  manifold: {
    enforceAdjacency: boolean;
    maxAdjacencyDrift: number;
  };

  // Runtime flags for enforcement pipeline
  pipeline: {
    preSanitized: boolean;
    postClamped: boolean;
    continuityChecked: boolean;
    fallbackTriggered: boolean;
  };
}

export function buildStabilityContext(): StabilityContext {
  return {
    SAFE_MODE: true,
    STRICT_METRIC: true,
    ALLOW_DEGRADED_METRIC: false,

    spectral: {
      enforceContinuity: true,
      eigenThreshold: 0.0001,
      maxEigenShift: 0.05
    },

    manifold: {
      enforceAdjacency: true,
      maxAdjacencyDrift: 0.02
    },

    pipeline: {
      preSanitized: false,
      postClamped: false,
      continuityChecked: false,
      fallbackTriggered: false
    }
  };
}
