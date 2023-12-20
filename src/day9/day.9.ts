function parseInput() {
  const input = Deno.readTextFileSync("src/day9/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function convertToDifferences(arr) {
  let diffs = [];

  for (let i = 0; i < arr.length - 1; i++) {
    diffs.push(arr[i + 1] - arr[i]);
  }
  return diffs;
}

function recurseDiffs(arr) {
  let lasts = [arr[arr.length - 1]];
  let done = false;
  let temp = [...arr];
  while (!done) {
    temp = convertToDifferences(temp);
    if (temp.every((val) => val === 0)) {
      done = true;
    }
    lasts.push(temp[temp.length - 1]);
  }
  return lasts.reduce((sum, curr) => sum + curr, 0);
}

function recurseDiffsFirsts(arr) {
  let firsts = [arr[0]];
  let done = false;
  let temp = [...arr];
  while (!done) {
    temp = convertToDifferences(temp);
    if (temp.every((val) => val === 0)) {
      done = true;
    }
    firsts.push(temp[0]);
  }
  return firsts.toReversed().reduce((sum, curr) => curr - sum, 0);
}

function part1() {
  const input_raw = parseInput();

  //   const input = `0 3 6 9 12 15
  // 1 3 6 10 15 21
  // 10 13 16 21 30 45`
  //     .split("\n")
  const input = input_raw.map((row) =>
    row.split(" ").map((el) => parseInt(el))
  );

  // console.log(input);
  // console.log(convertToDifferences(input[0]));
  // console.log(recurseDiffs(input[0]));

  const answers = input.map((row) => recurseDiffs(row));

  // console.log(answers);

  const ans = answers.reduce((sum, curr) => sum + curr, 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input_raw = parseInput();

  /*
  const input_raw = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`.split("\n");
*/

  const input = input_raw.map((row) =>
    row.split(" ").map((el) => parseInt(el))
  );

  const answers = input.map((row) => recurseDiffsFirsts(row));

  const ans = answers.reduce((sum, curr) => sum + curr, 0);

  console.log(ans);

  return 0;
}

part1();
part2();
