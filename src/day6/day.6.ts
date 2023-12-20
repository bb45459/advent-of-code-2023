function parseInput() {
  const input = Deno.readTextFileSync("src/day6/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function getZeros(time: number, dist: number) {
  const plus = (time + Math.sqrt(time ** 2 - 4 * (dist + 1))) / 2;
  const minus = (time - Math.sqrt(time ** 2 - 4 * (dist + 1))) / 2;

  const ans = Math.floor(plus) - Math.ceil(minus) + 1;

  console.log(ans);
  return ans;
}

function part1() {
  const input = parseInput();

  const times = input[0]
    .split(/ +/)
    .slice(1)
    .map((n) => parseInt(n));
  const distances = input[1]
    .split(/ +/)
    .slice(1)
    .map((n) => parseInt(n));
  console.log(times, distances);

  function getZeros(time: number, dist: number) {
    const plus = (time + Math.sqrt(time ** 2 - 4 * (dist + 1))) / 2;
    const minus = (time - Math.sqrt(time ** 2 - 4 * (dist + 1))) / 2;

    const ans = Math.floor(plus) - Math.ceil(minus) + 1;

    console.log(ans);
    return ans;
  }

  const options = times.map((time, i) => {
    return getZeros(time, distances[i]);
  });

  const ans = options.reduce((acc, curr) => acc * curr);

  console.log(ans);

  /*
  a * timeHeld = v
  (d + 1) / v = (time - timeHeld)

  (d + 1) / (a * th) = (t - th)
  (d + 1) / (a * th) + th = t
  th*t - th^2 = d + 1
  th^2 - t*th + (d + 1)

  quadratic formula!
  */

  return 0;
}

function part2() {
  const input = parseInput();

  const time = parseInt(input[0].split(/ +/).slice(1).join(""));
  const distance = parseInt(input[1].split(/ +/).slice(1).join(""));

  const ans = getZeros(time, distance);

  console.log(ans);

  return 0;
}

part1();
part2();
