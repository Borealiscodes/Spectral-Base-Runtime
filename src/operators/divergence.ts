export function divergence(vectorField: number[][]): number[] {
  const result: number[] = [];

  for (let i = 0; i < vectorField.length; i++) {
    const vec = vectorField[i];
    let sum = 0;

    for (let j = 0; j < vec.length; j++) {
      sum += vec[j];
    }

    result.push(sum);
  }

  return result;
}
