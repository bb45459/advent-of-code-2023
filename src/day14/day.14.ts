function parseInput() {
  // const input = Deno.readTextFileSync("src/day14/input.txt");

  const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

  const parsed = input.split("\n").map((row) => row.split(""));

  return parsed;
}

function part1() {
  const input = parseInput();

  const newInput = north(input);

  // console.log(input.map((row) => row.join("")).join("\n"));

  const ans = calcLoad(newInput);
  console.log(ans);

  return 0;
}

function calcLoad(matrix) {
  const ans = matrix.reduce((acc, currRow, rowI) => {
    const rowSum = currRow.reduce((rowAcc, rock) => {
      if (rock !== "O") {
        return rowAcc;
      }
      return rowAcc + (matrix.length - rowI);
    }, 0);
    return acc + rowSum;
  }, 0);
  return ans;
}

function north(input) {
  // look up to the nearest end or # or 0
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] !== "O") {
        continue;
      }

      // find the first # or 0 in the column above
      const colAbove = input.slice(0, row).map((el) => el[col]);
      const blockerIndex = colAbove.findLastIndex(
        (el) => el === "O" || el === "#"
      );
      // set current val to . and blocker + 1 to 0
      input[row][col] = ".";
      input[blockerIndex + 1][col] = "O";
    }
  }
  return input;
}

function south(input) {
  // look up to the nearest end or # or 0
  for (let row = input.length - 1; row >= 0; row--) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] !== "O") {
        continue;
      }

      // find the first # or 0 in the column above
      const colBelow = input.slice(row + 1).map((el) => el[col]);
      const blockerIndex = colBelow.findIndex((el) => el === "O" || el === "#");
      // set current val to . and blocker + 1 to 0
      input[row][col] = ".";
      input[blockerIndex === -1 ? input.length - 1 : row + blockerIndex][col] =
        "O";
    }
  }
  return input;
}

function east(input) {
  // look up to the nearest end or # or 0
  for (let col = input[0].length - 1; col >= 0; col--) {
    for (let row = 0; row < input.length; row++) {
      if (input[row][col] !== "O") {
        continue;
      }

      // find the first # or 0 in the column above
      const rowAhead = input[row].slice(col + 1);
      const blockerIndex = rowAhead.findIndex((el) => el === "O" || el === "#");
      // set current val to . and blocker + 1 to 0
      input[row][col] = ".";
      input[row][
        blockerIndex === -1 ? input[0].length - 1 : col + blockerIndex
      ] = "O";
    }
  }
  return input;
}

function west(input) {
  // look up to the nearest end or # or 0
  for (let col = 0; col < input[0].length; col++) {
    for (let row = 0; row < input.length; row++) {
      if (input[row][col] !== "O") {
        continue;
      }

      // find the first # or 0 in the column above
      const rowBehind = input[row].slice(0, col);
      const blockerIndex = rowBehind.findLastIndex(
        (el) => el === "O" || el === "#"
      );
      // set current val to . and blocker + 1 to 0
      input[row][col] = ".";
      input[row][blockerIndex + 1] = "O";
    }
  }
  return input;
}

function part2() {
  const input = parseInput();

  // mod 4 determines direction
  // that determines the way the balls roll
  // snapshot the string? break out if seen before with the next command?
  // keep track of the max as we go?
  console.log(input.map((row) => row.join("")).join("\n"));
  const scores = new Map();
  const scoreArr = [];
  const arrangements = new Map();
  let newInput = [...input];
  let repeatOccurance: number;
  let firstOccurance: number;
  for (let i = 0; i < 40; i++) {
    if (i % 4 === 0) {
      newInput = north(newInput);
    }
    if (i % 4 === 1) {
      newInput = west(newInput);
    }
    if (i % 4 === 2) {
      newInput = south(newInput);
    }
    if (i % 4 === 3) {
      newInput = east(newInput);
    }
    console.log("\n\n", i);
    console.log(i % 4);
    console.log(calcLoad(newInput));
    scores.set(calcLoad(newInput), 1 + (scores.get(calcLoad(newInput)) ?? 0));
    scoreArr.push(calcLoad(newInput));
    console.log(newInput.map((row) => row.join("")).join("\n"));
    if (
      arrangements.has(
        newInput.map((row) => row.join("")).join("") + String(i % 4)
      )
    ) {
      console.log(
        "seen before",
        i,
        arrangements.get(
          newInput.map((row) => row.join("")).join("") + String(i % 4)
        )
      );
      repeatOccurance = i;
      firstOccurance = arrangements.get(
        newInput.map((row) => row.join("")).join("") + String(i % 4)
      );
      // break;
    } else {
      arrangements.set(
        newInput.map((row) => row.join("")).join("") + String(i % 4),
        i
      );
    }
  }

  // console.log(scores);
  // console.log([...scores.keys()].toSorted((a, b) => Number(b) - Number(a)));
  // console.log([...scores.values()].toSorted((a, b) => Number(b) - Number(a)));
  console.log(scoreArr);

  console.log(
    repeatOccurance,
    firstOccurance,
    scoreArr[
      (1_000_000_000 - firstOccurance + 1) % (repeatOccurance - firstOccurance)
    ]
  );

  return 0;
}

// part1();
part2();

/*
OO...#OO..
....#....#
O....##...
...#OOO...
OOO.....#.
..#O...#O#
O....#OO..
O.........
#....###O.
#....#....

OO...#OO..
....#....#
O....##...
...#OOO...
OOO.....#.
..#O...#O#
O....#OO..
O.........
#....###O.
#....#....

i=9
i=37

28

37 -> 9
28 -> 0
0 to 999_999_991, cycles every 28
offset the score matrix by 11
*/
