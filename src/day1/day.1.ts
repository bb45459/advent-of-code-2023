import { minBy } from "https://deno.land/std@0.208.0/collections/min_by.ts";

function parseInput() {
  const input = Deno.readTextFileSync("src/day1/input.txt");

  const parsed = input
    .split("\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  // const input = [
  //   "1abc2",
  //   "pqr3stu8vwx",
  //   "a1b2c3d4e5f",
  //   "treb7uchet",
  // ];

  // console.log(input);

  const parsed = input.map((el) =>
    el.split("").filter((e) =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e))
    )
  ).map((el) => parseInt(`${el[0]}${el[el.length - 1]}`))
    .reduce((acc, curr) => acc + curr, 0);

  console.log(parsed);

  return 0;
}

// part1();

function part2() {
  const input = parseInput();

  const nums = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const mapper = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
  };

  // const input = [
  //   "two1nine",
  //   "eightwothree",
  //   "abcone2threexyz",
  //   "xtwone3four",
  //   "4nineeightseven2",
  //   "zoneight234",
  //   "7pqrstsixteen",
  // ];

  const parsed = input.map((el) => {
    let go = true;
    let temp = el;
    while (go) {
      // recursively replace the words, replacing the first
      // letter of the hard coded word (two => 2wo)
      // I thought it was a left to right recursive replace
      // so I had a minimum extract to prevent double replacing
      // overlaps but that was the oppositve
      // It was actually a holistic view and recreate
      const firstReplace = minBy(
        nums.map((ee) => [ee, temp.search(ee), el]).filter((eee) =>
          eee[1] !== -1
        ),
        (el: any) => el[1] as number,
      );

      if (!firstReplace) {
        go = false;
        break;
      }

      temp = temp.replace(
        firstReplace[0],
        `${mapper[firstReplace[0]]}${firstReplace[0].slice(1)}`,
      );
    }

    return [temp, el];
  })
    .map((
      el,
    ) => [
      el[0].split("").filter((e) =>
        [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e))
      ),
      el,
    ])
    .map((
      el,
    ) => [
      parseInt(`${el[0][0]}${el[0][el[0].length - 1]}`),
      el[1][1],
    ])
    .reduce((acc, curr) => acc + (curr[0] as number), 0);

  console.log(parsed);

  return 0;
}

part2();
