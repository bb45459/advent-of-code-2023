function parseInput() {
  const input = Deno.readTextFileSync("src/day7/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

enum Hands {
  "fiveOfAKind" = "fiveOfAKind",
  "fourOfAKind" = "fourOfAKind",
  "fullHouse" = "fullHouse",
  "threeOfAKind" = "threeOfAKind",
  "twoPair" = "twoPair",
  "onePair" = "onePair",
  "highCard" = "highCard",
}
const handRanks = {
  fiveOfAKind: 7,
  fourOfAKind: 6, // 7 // 1
  fullHouse: 5, // 6, 7 // 1, 2
  threeOfAKind: 4, // 6, 7 // 2, 3
  twoPair: 3, // 5, 6, 7 // 2, 3, 4
  onePair: 2, // 4, 6, 7 // 2, 4, 5
  highCard: 1, // 2, 4, 6, 7  // 1, 3, 5, 6
};

const cardRanks = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};
const cardRanksJokers = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

function collectCardCounts(hand) {
  const counts = hand.reduce((acc, card) => {
    if (acc[card]) {
      acc[card]++;
    } else {
      acc[card] = 1;
    }
    return acc;
  }, {});
  return counts;
}

function determineHand(counts: { [key: string]: number }, useJokers = false) {
  const distCounts = Object.entries(counts)
    .filter((o) => !useJokers || (useJokers && o[0] !== "J"))
    .map((e) => e[1]);
  const jokerCount = useJokers ? counts["J"] ?? 0 : 0;

  if (useJokers && jokerCount === 5) {
    const handType = Hands.fiveOfAKind;
    return handRanks[handType];
  }
  if (distCounts.includes(5)) {
    const handType = Hands.fiveOfAKind;
    return handRanks[handType];
  }
  if (distCounts.includes(4)) {
    const handType = Hands.fourOfAKind;
    return handRanks[handType] + [0, 1, 1, 1, 1][jokerCount];
  }
  if (distCounts.includes(3) && distCounts.includes(2)) {
    const handType = Hands.fullHouse;
    return handRanks[handType] + [0, 1, 2, 2, 2][jokerCount];
  }
  if (distCounts.includes(3)) {
    const handType = Hands.threeOfAKind;
    return handRanks[handType] + [0, 2, 3, 3, 3][jokerCount];
  }
  if (distCounts.filter((el) => el === 2).length >= 2) {
    const handType = Hands.twoPair;
    return handRanks[handType] + [0, 2, 3, 4, 4][jokerCount];
  }
  if (distCounts.includes(2)) {
    const handType = Hands.onePair;
    return handRanks[handType] + [0, 2, 4, 5, 5][jokerCount];
  }
  const handType = Hands.highCard;
  return handRanks[handType] + [0, 1, 3, 5, 6][jokerCount];
}

function compareHands(handA, handB) {
  if (handA[2] === handB[2]) {
    // iterate through card ranks
    for (let i = 0; i < handA[0].length; i++) {
      if (cardRanks[handA[0][i]] < cardRanks[handB[0][i]]) {
        return -1;
      }
      if (cardRanks[handA[0][i]] > cardRanks[handB[0][i]]) {
        return 1;
      }
    }
  }
  return handA[2] - handB[2];
}

function compareHandsJokers(handA, handB) {
  if (handA[2] === handB[2]) {
    // iterate through card ranks
    for (let i = 0; i < handA[0].length; i++) {
      if (cardRanksJokers[handA[0][i]] < cardRanksJokers[handB[0][i]]) {
        return -1;
      }
      if (cardRanksJokers[handA[0][i]] > cardRanksJokers[handB[0][i]]) {
        return 1;
      }
    }
  }
  return handA[2] - handB[2];
}

function part1() {
  const input = parseInput();

  const hands = input.map((row) => {
    const split = row.split(" ");
    const hand = split[0].split("");
    const bet = parseInt(split[1]);

    return [hand, bet];
  });

  const scoredHands = hands.map((hand) => {
    const counts = collectCardCounts(hand[0]);
    const scored = determineHand(counts);
    return [...hand, scored];
  });

  const sortedHands = scoredHands.toSorted((a, b) => {
    return compareHands(a, b);
  });

  const reduced = sortedHands.reduce((acc, currHand, i) => {
    const prod = currHand[1] * (i + 1);
    return acc + prod;
  }, 0);

  console.log(reduced);

  return 0;
}

function part2() {
  const input = parseInput();

  const hands = input.map((row) => {
    const split = row.split(" ");
    const hand = split[0].split("");
    const bet = parseInt(split[1]);

    return [hand, bet];
  });

  const scoredHands = hands.map((hand) => {
    const counts = collectCardCounts(hand[0]);
    const scored = determineHand(counts, true);
    return [...hand, scored];
  });

  const sortedHands = scoredHands.toSorted((a, b) => {
    return compareHandsJokers(a, b);
  });

  const reduced = sortedHands.reduce((acc, currHand, i) => {
    const prod = currHand[1] * (i + 1);
    return acc + prod;
  }, 0);

  console.log(reduced);

  return 0;
}

part1();
part2();
