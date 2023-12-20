function parseInput() {
  const input = Deno.readTextFileSync("src/day2/input.txt");

  const parsed = input.split("\n").map((game) =>
    game
      .split(": ")[1]
      .split("; ")
      .map((play) => play.split(", ").map((piece) => piece.split(" ")))
      .flat()
  );

  return parsed;
}

type color = "red" | "green" | "blue";

function createMax(play: string[][]) {
  const reduced = play.reduce((acc, curr) => {
    const color = curr[1] as color;
    const val = parseInt(curr[0]);
    if (acc[color]) {
      if (val > acc[color]) {
        acc[color] = val;
      }
      return acc;
    } else {
      acc[color] = val;
      return acc;
    }
  }, {} as { red: number; green: number; blue: number });

  return reduced;
}

function checkPossible(
  playMax: { red: number; green: number; blue: number },
  maxes: { red: number; green: number; blue: number }
) {
  if (
    playMax["red"] > maxes["red"] ||
    playMax["green"] > maxes["green"] ||
    playMax["blue"] > maxes["blue"]
  ) {
    return false;
  } else {
    return true;
  }
}

function reduceTrues(arr: boolean[]) {
  return arr.reduce((acc, curr, i) => {
    if (curr) {
      return acc + (i + 1);
    } else {
      return acc;
    }
  }, 0);
}

function getPower(playMax: { red: number; green: number; blue: number }) {
  return playMax.red * playMax.green * playMax.blue;
}

function part1() {
  const input = parseInput();

  const maxes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibles = input.map((play) => checkPossible(createMax(play), maxes));

  const res = reduceTrues(possibles);

  return res;
}

console.log(part1());

function part2() {
  const input = parseInput();

  const powers = input.map((play) => getPower(createMax(play)));

  const summedPowers = powers.reduce((acc, curr) => acc + curr, 0);

  return summedPowers;
}

console.log(part2());
