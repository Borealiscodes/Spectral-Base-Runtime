export function laplacian(field: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < field.length; i++) {
    const left = i > 0 ? field[i - 1] : field[i];
    const right = i < field.length - 1 ? field[i + 1] : field[i];
    const center = field[i];

    result.push(left - 2 * center + right);
  }

  return result;
}
