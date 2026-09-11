export function eigenflow(matrix: number[][]): number[] {
  const eigenVector: number[] = new Array(matrix.length).fill(1);

  const result: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;

    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j] * eigenVector[j];
    }

    result.push(sum);
  }

  return result;
}
