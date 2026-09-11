export function gradient(field: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < field.length - 1; i++) {
    result.push(field[i + 1] - field[i]);
  }

  result.push(0);

  return result;
}
