export function squareCal(value: number) {
  console.log("squareCal is invoked");

  return value ** 2;
}

export function getEvenNumbers() {
  console.log("getEvenNumbers is invoked");

  const result = [];
  for (let i = 1; i < 10; i++) {
    if (i % 2 === 0) {
      result.push(i);
    }
  }

  return result;
}

export function getSumOfSquareAndCube(square: number, cube: number) {
  console.log("getSumOfSquareAndCube is invoked");

  return square + cube;
}
