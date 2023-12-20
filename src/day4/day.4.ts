function parseInput() {
  const input = Deno.readTextFileSync("src/day4/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  // const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

  const cards = input.map((card) => {
    return card
      .split(/: +/)[1]
      .split(/ +\| +/)
      .map((half) => new Set(half.split(/ +/).map((n) => parseInt(n))));
  });

  const matches = cards.map((card) => {
    const winners = card[0];
    const myNums = card[1];

    const winnerMatches = new Set<number>();
    for (const item of myNums.values()) {
      if (winners.has(item)) {
        winnerMatches.add(item);
      }
    }
    return winnerMatches.size;
  });

  const powered = matches
    .filter((m) => m > 0)
    .map((matchCount) => Math.pow(2, matchCount - 1));

  const ans = powered.reduce((acc, poweredCount) => acc + poweredCount, 0);

  console.log(ans);
  return 0;
}

function part2() {
  const input = parseInput();

  // const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

  const cards = input.map((card) => {
    return card
      .split(/: +/)[1]
      .split(/ +\| +/)
      .map((half) => new Set(half.split(/ +/).map((n) => parseInt(n))));
  });

  const cardCounts = new Map<number, number>();
  cards.forEach((_, i) => {
    cardCounts.set(i, 1);
  });

  [...cards].forEach((card, cardI) => {
    const winners = card[0];
    const myNums = card[1];

    const winnerMatches = new Set<number>();
    for (const item of myNums.values()) {
      if (winners.has(item)) {
        winnerMatches.add(item);
      }
    }

    if (winnerMatches.size > 0) {
      [...winnerMatches].forEach((win, winI) => {
        // check how many copies
        const copies = cardCounts.get(cardI);
        // repeat the adding for each copy
        cardCounts.set(
          cardI + winI + 1,
          copies + cardCounts.get(cardI + winI + 1)
        );
      });
    }
  });

  const reduced = [...cardCounts.values()].reduce((acc, curr) => acc + curr, 0);

  console.log(reduced);

  return 0;
}

const t0 = performance.now();
part1();
const t1 = performance.now();
const t2 = performance.now();
part2();
const t3 = performance.now();

console.log("part1", t1 - t0);
console.log("part2", t3 - t2);
