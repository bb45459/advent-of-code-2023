function parseInput() {
  const input = Deno.readTextFileSync("src/day21/input.txt");

  //   const input = `...........
  // .....###.#.
  // .###.##..#.
  // ..#.#...#..
  // ....#.#....
  // .##..S####.
  // .##..#...#.
  // .......##..
  // .##.#.####.
  // .##..##.##.
  // ...........`;

  const parsed = input
    .split("\n")
    .filter((el) => !!el)
    .map((row) => row.split(""));

  return parsed;
}

function validCoordinates(matrix, row, col) {
  return (
    row >= 0 &&
    row < matrix.length &&
    col >= 0 &&
    col < matrix[row].length &&
    // matrix[row][col] !== "#"
    (matrix[row][col] === "S" || matrix[row][col] === ".")
  );
}

function part1() {
  const input = parseInput();

  const startRow = input.findIndex((row) => row.includes("S"));
  const startCol = input[startRow].findIndex((col) => col === "S");

  var fillStack = [];
  let steps = 0;
  function fillMatrix(matrix, row, col) {
    fillStack.push([[row, col]]);

    // console.log(fillStack);
    while (fillStack.length > 0 && steps < 65) {
      var stepStack = fillStack.pop();
      for (let dir of stepStack) {
        const [row, col] = dir;
        if (!validCoordinates(matrix, row, col)) continue;

        if (matrix[row][col] === "#") continue;

        matrix[row][col] = steps;

        const nextStep = [
          [row + 1, col],
          [row - 1, col],
          [row, col + 1],
          [row, col - 1],
        ];

        // console.log(fillStack);
        if (fillStack[0]) {
          fillStack[0].push(...nextStep);
        } else {
          fillStack.push(nextStep);
        }
      }

      steps++;
    }
  }

  fillMatrix(input, startRow, startCol);

  // console.table(input);

  const ans = input.reduce(
    // (acc, curr) => acc + curr.reduce((a, c) => a + (c === 6 ? 1 : 0), 0),
    (acc, curr) => acc + curr.reduce((a, c) => a + (c % 2 === 0 ? 1 : 0), 0),
    0
  );
  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  const startRow = input.findIndex((row) => row.includes("S"));
  const startCol = input[startRow].findIndex((col) => col === "S");

  var fillStack = [];
  let steps = 0;
  function fillMatrix(matrix, row, col) {
    fillStack.push([[row, col]]);

    // console.log(fillStack);
    while (fillStack.length > 0 && steps < 50) {
      var stepStack = fillStack.pop();
      for (let dir of stepStack) {
        const [row, col] = dir;
        if (!validCoordinates(matrix, row, col)) continue;

        if (matrix[row][col] === "#") continue;

        matrix[row][col] = steps;

        const nextStep = [
          [row + 1, col],
          [row - 1, col],
          [row, col + 1],
          [row, col - 1],
        ];

        // console.log(fillStack);
        if (fillStack[0]) {
          fillStack[0].push(...nextStep);
        } else {
          fillStack.push(nextStep);
        }
      }

      steps++;
    }
  }

  fillMatrix(input, startRow, startCol);

  // console.table(input);

  const ans = input.reduce(
    (acc, curr) => acc + curr.reduce((a, c) => a + (c % 2 === 1 ? 1 : 0), 0),
    0
  );

  console.log(ans);

  return 0;
}

part1();
// part2();
