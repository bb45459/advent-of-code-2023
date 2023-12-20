function parseInput() {
  const input = Deno.readTextFileSync("src/day8/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  //   const input = `LLR

  // AAA = (BBB, BBB)
  // BBB = (AAA, ZZZ)
  // ZZZ = (ZZZ, ZZZ)`.split("\n");

  const instructions = input[0].split("");
  const steps = input
    .slice(2)
    .map((step) => step.split(" = "))
    .map((splitStep) => [
      splitStep[0],
      [
        splitStep[1].split(", ")[0].substring(1),
        splitStep[1].split(", ")[1].substring(0, 3),
      ],
    ]);

  const tree = {};
  steps.forEach((step) => {
    tree[step[0]] = { L: step[1][0], R: step[1][1] };
  });

  let stepCount = 0;
  let done = false;
  let location = "AAA";

  while (!done) {
    const instruction = instructions[stepCount % instructions.length];
    const nextLocation = tree[location][instruction];

    location = nextLocation;
    stepCount++;

    if (location === "ZZZ") {
      done = true;
    }
  }

  console.log("steps", stepCount);

  return 0;
}

function part2() {
  const input = parseInput();

  //   const input = `LR

  // 11A = (11B, XXX)
  // 11B = (XXX, 11Z)
  // 11Z = (11B, XXX)
  // 22A = (22B, XXX)
  // 22B = (22C, 22C)
  // 22C = (22Z, 22Z)
  // 22Z = (22B, 22B)
  // XXX = (XXX, XXX)`.split("\n");

  const instructions = input[0].split("");
  const steps = input
    .slice(2)
    .map((step) => step.split(" = "))
    .map((splitStep) => [
      splitStep[0],
      [
        splitStep[1].split(", ")[0].substring(1),
        splitStep[1].split(", ")[1].substring(0, 3),
      ],
    ]);

  const tree = {};
  steps.forEach((step) => {
    tree[step[0]] = { L: step[1][0], R: step[1][1] };
  });

  const allStarterKeys = Object.keys(tree).filter((key) => key[2] === "A");
  const allStarters = new Map<string, number[]>();
  allStarterKeys.forEach((key) => allStarters.set(key, []));

  allStarters.forEach((value, key) => {
    console.log(key);
    let stepCount = 0;
    let done = false;
    let acc = [];
    let location = key;
    while (!done) {
      const instruction = instructions[stepCount % instructions.length];
      const nextLocation = tree[location][instruction];

      location = nextLocation;
      stepCount++;

      if (key === nextLocation && stepCount % instructions.length === 0) {
        console.log("full loop completed", stepCount);
        done = true;
      }

      if (nextLocation[2] === "Z") {
        acc = [...acc, stepCount];
        allStarters.set(key, acc);
        if (acc.length === 1) {
          done = true;
        }
      }
    }
  });

  const ans = [...allStarters.values()].flat().reduce((acc, curr) => {
    const leastCommonMultiple = lcm(acc, curr);
    return leastCommonMultiple;
  });

  console.log(ans);

  return 0;
}

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm
function euclideanGcd(a: number, b: number) {
  const mod = Math.max(a, b) % Math.min(a, b);
  if (mod === 0) {
    return b;
  }
  return euclideanGcd(Math.min(a, b), Math.max(a, b) % Math.min(a, b));
}
// console.log(euclideanGcd(48, 18));

// https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
function lcm(a: number, b: number) {
  return (a * b) / euclideanGcd(a, b);
}
// console.log(lcm(21, 6));

part1();
part2();
