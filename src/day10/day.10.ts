import { chunk } from "https://deno.land/std@0.208.0/collections/chunk.ts";
function parseInput() {
  const input = Deno.readTextFileSync("src/day10/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function part1() {
  // const input = parseInput();

  const input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`.split("\n");

  const moveRows = input.map((el) => el.split(""));

  const startRow = moveRows.findIndex((row) => row.find((e) => e === "S"));
  const startCol = moveRows[startRow].findIndex((e) => e === "S");

  // look left, right, up, down
  const vals = {
    "|": (row: number, col: number, cameFrom: "top" | "bottom") => {
      return cameFrom === "top"
        ? [row + 1, col, "top"]
        : [row - 1, col, "bottom"];
    },
    "-": (row: number, col: number, cameFrom: "left" | "right") => {
      return cameFrom === "left"
        ? [row, col + 1, "left"]
        : [row, col - 1, "right"];
    },
    "L": (row: number, col: number, cameFrom: "top" | "right") => {
      return cameFrom === "top"
        ? [row, col + 1, "left"]
        : [row - 1, col, "bottom"];
    },
    "J": (row: number, col: number, cameFrom: "top" | "left") => {
      return cameFrom === "top"
        ? [row, col - 1, "right"]
        : [row - 1, col, "bottom"];
    },
    "7": (row: number, col: number, cameFrom: "left" | "bottom") => {
      return cameFrom === "left"
        ? [row + 1, col, "top"]
        : [row, col - 1, "right"];
    },
    "F": (row: number, col: number, cameFrom: "bottom" | "right") => {
      return cameFrom === "bottom"
        ? [row, col + 1, "left"]
        : [row + 1, col, "top"];
    },
    ".": (row: number, col: number, cameFrom: "") => {},
  };

  const fourNeighbors = [
    moveRows[startRow + 1][startCol], //bottom
    moveRows[startRow - 1][startCol], //top
    moveRows[startRow][startCol + 1], //right
    moveRows[startRow][startCol - 1], // left
  ];
  const startingDirections = [];
  if (["|", "L", "J"].includes(fourNeighbors[0])) {
    startingDirections.push([startRow + 1, startCol, "top"]);
  }
  if (["|", "7", "F"].includes(fourNeighbors[1])) {
    startingDirections.push([startRow - 1, startCol, "bottom"]);
  }
  if (["-", "7", "J"].includes(fourNeighbors[2])) {
    startingDirections.push([startRow, startCol + 1, "left"]);
  }
  if (["-", "L", "F"].includes(fourNeighbors[3])) {
    startingDirections.push([startRow, startCol - 1, "right"]);
  }

  console.log(startingDirections);

  let done = false;
  let steps = 1;
  let direction1 = startingDirections[0];
  let direction2 = startingDirections[1];
  const ringCoords = [
    [startRow, startCol],
    startingDirections[0].slice(0, 2),
    startingDirections[1].slice(0, 2),
  ];

  while (!done) {
    direction1 = vals[moveRows[direction1[0]][direction1[1]]](
      direction1[0],
      direction1[1],
      direction1[2],
    );
    direction2 = vals[moveRows[direction2[0]][direction2[1]]](
      direction2[0],
      direction2[1],
      direction2[2],
    );
    steps++;
    if (
      direction1[0] === direction2[0] &&
      direction1[1] === direction2[1]
    ) {
      ringCoords.push(direction1.slice(0, 2));
      done = true;
    } else {
      ringCoords.push(direction1.slice(0, 2));
      ringCoords.push(direction2.slice(0, 2));
    }
  }

  // console.log(steps);

  // console.log(ringCoords);

  // take the couplets and look for dots in between
  const sortedCoords = ringCoords.toSorted((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
  });

  console.log(sortedCoords);
  let acc = 0;
  for (let i = 0; i < moveRows.length; i++) {
    const rowVals = sortedCoords.filter((coord) => coord[0] === i);
    // console.log(rowVals);
    for (let j = 0; j < rowVals.length; j += 2) {
      const first = rowVals[j];
      const second = rowVals[j + 1] ?? rowVals[j];
      const dots = moveRows[i].slice(first[1], second[1]).filter((e) =>
        e === "."
      );
      console.log(first, second, dots);

      acc += dots.length;
    }
  }
  // console.log(chunk(sortedCoords, 2));
  // const ans = chunk(sortedCoords, 2)
  //   .reduce((acc, curr) => {
  //     const dots = moveRows[curr[0][0]].slice(curr[0][1], curr[1][1]).filter((
  //       el,
  //     ) => el === ".");

  //     console.log(dots, curr[0], curr[1]);
  //     return acc + dots.length;
  //   }, 0);

  console.log("acc", acc);

  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();
