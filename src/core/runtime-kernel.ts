// Spectral-Base-Runtime — Runtime Kernel (v1.0)
// Core execution loop and operator dispatch for spectral primitives.

export type SpectralScalar = number;
export type SpectralVector = SpectralScalar[];
export type SpectralMatrix = SpectralScalar[][];

export interface ManifoldAdjacency {
  readonly nodes: number;
  readonly edges: Array<[number, number]>;
}

export interface SpectralContext {
  readonly adjacency?: ManifoldAdjacency;
  readonly metricHint?: string;
  readonly stabilityFlags?: string[];
}

export interface SpectralOperator<I, O> {
  readonly name: string;
  readonly version: string;
  execute(input: I, context?: SpectralContext): O;
}

export interface RuntimeKernelConfig {
  readonly strictStability?: boolean;
  readonly defaultMetricHint?: string;
}

export class RuntimeKernel {
  private readonly operators: Map<string, SpectralOperator<unknown, unknown>> =
    new Map();
  private readonly config: RuntimeKernelConfig;

  constructor(config: RuntimeKernelConfig = {}) {
    this.config = config;
  }

  registerOperator<I, O>(operator: SpectralOperator<I, O>): void {
    if (this.operators.has(operator.name)) {
      throw new Error(`Operator already registered: ${operator.name}`);
    }
    this.operators.set(operator.name, operator as SpectralOperator<unknown, unknown>);
  }

  hasOperator(name: string): boolean {
    return this.operators.has(name);
  }

  listOperators(): string[] {
    return Array.from(this.operators.keys());
  }

  run<I, O>(
    name: string,
    input: I,
    context: SpectralContext = {}
  ): O {
    const op = this.operators.get(name);
    if (!op) {
      throw new Error(`Operator not found: ${name}`);
    }

    const effectiveContext: SpectralContext = {
      metricHint: context.metricHint ?? this.config.defaultMetricHint,
      stabilityFlags: context.stabilityFlags ?? [],
      adjacency: context.adjacency,
    };

    return op.execute(input, effectiveContext) as O;
  }
}
