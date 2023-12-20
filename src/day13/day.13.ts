function parseInput() {
  const input = Deno.readTextFileSync("src/day13/input.txt");

  //   const input = `#.##..##.
  // ..#.##.#.
  // ##......#
  // ##......#
  // ..#.##.#.
  // ..##..##.
  // #.#.##.#.

  // #...##..#
  // #....#..#
  // ..##..###
  // #####.##.
  // #####.##.
  // ..##..###
  // #....#..#`;

  const parsed = input
    .split("\n\n")
    .filter((n) => !!n)
    .map((el) => el.split("\n").filter((e) => !!e));

  return parsed;
}

function transpose(matrix) {
  let res = Array(matrix[0].length)
    .fill()
    .map(() => []);
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      res[i][j] = matrix[j][i];
    }
  }
  return res;
}

function part1() {
  const input: string[][] = parseInput();

  console.log(input);

  let horizontals = 0;
  let verticals = 0;

  for (let pattern of input) {
    console.log("---------");
    // console.log(pattern[0].length);
    // horizontal lines
    for (let i = 1; i < pattern.length; i++) {
      if (i <= pattern.length / 2) {
        // if i is less than half way
        console.log(
          "front half",
          i,
          i + i,
          pattern.slice(0, i).join(""),
          "----",
          pattern.slice(i, i + i).join(""),
          pattern.slice(0, i).join("") ===
            pattern
              .slice(i, i + i)
              .toReversed()
              .join("")
        );
        if (
          pattern.slice(0, i).join("") ===
          pattern
            .slice(i, i + i)
            .toReversed()
            .join("")
        ) {
          horizontals += i;
        }
      } else {
        // if i is greater than half way
        console.log(
          "back half",
          i - (pattern.length - i),
          i,
          pattern.length,
          pattern.slice(i - (pattern.length - i), i).join(""),
          "----",
          pattern.slice(i, pattern.length).join(""),
          pattern.slice(i - (pattern.length - i), i).join("") ===
            pattern.slice(i).toReversed().join("")
        );
        if (
          pattern.slice(i - (pattern.length - i), i).join("") ===
          pattern.slice(i).toReversed().join("")
        ) {
          horizontals += i;
        }
      }
    }

    // vertical lines
    const transposed = transpose(pattern.map((row) => row.split("")));
    console.log("transposed");
    console.log(transposed.map((el) => el.join("")).join("\n"));
    // console.log(pattern[0].length);
    for (let i = 1; i < transposed.length; i++) {
      if (i <= transposed.length / 2) {
        // if i is less than half way
        console.log(
          "front half",
          i,
          i + i,
          transposed.slice(0, i).join(""),
          "----",
          transposed.slice(i, i + i).join(""),
          transposed.slice(0, i).join("") ===
            transposed
              .slice(i, i + i)
              .toReversed()
              .join("")
        );
        if (
          transposed.slice(0, i).join("") ===
          transposed
            .slice(i, i + i)
            .toReversed()
            .join("")
        ) {
          verticals += i;
        }
      } else {
        // if i is greater than half way
        console.log(
          "back half",
          i - (transposed.length - i),
          i,
          transposed.length,
          transposed.slice(i - (transposed.length - i), i).join(""),
          "----",
          transposed.slice(i, transposed.length).join(""),
          transposed.slice(i - (transposed.length - i), i).join("") ===
            transposed.slice(i).toReversed().join("")
        );
        if (
          transposed.slice(i - (transposed.length - i), i).join("") ===
          transposed.slice(i).toReversed().join("")
        ) {
          verticals += i;
        }
      }
    }
  }

  console.log("horizontals", horizontals, "verticals", verticals);

  const ans = verticals + 100 * horizontals;

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();
