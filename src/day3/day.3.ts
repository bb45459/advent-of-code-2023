function parseInput() {
  const input = Deno.readTextFileSync("src/day3/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  //   const ex = `467..114..
  // ...*......
  // ..35..633.
  // ......#...
  // 617*......
  // .....+.58.
  // ..592.....
  // ......755.
  // ...$.*....
  // .664.598..`;
  //   const input = ex.split("\n");

  const nums = input.map((inRow) => {
    return [...inRow.matchAll(/\d+/g)];
  });

  const symbols = input.reduce((acc, curr, rowi) => {
    curr.split("").forEach((el, coli) => {
      if (!/\d|\./.test(el)) {
        if (acc.has(rowi)) {
          acc.set(rowi, [...acc.get(rowi), coli]);
        } else {
          acc.set(rowi, [coli]);
        }
      }
    });
    return acc;
  }, new Map());

  function checkNeighbor(i, j, len, symbols: Map<number, number[]>) {
    let same,
      prev,
      next = false;
    same = !!symbols.get(i)?.find((el) => j - 1 <= el && el <= j + len);
    prev = !!symbols.get(i - 1)?.find((el) => j - 1 <= el && el <= j + len);
    next = !!symbols.get(i + 1)?.find((el) => j - 1 <= el && el <= j + len);
    return same || prev || next;
  }

  const reduced = nums.reduce((acc, row, rowi) => {
    row.forEach((num, numi) => {
      console.log("num", num);
      if (checkNeighbor(rowi, num.index, num[0].length, symbols)) {
        console.log("allowed");
        acc = [...acc, num[0]];
      }
    });
    return acc;
  }, [] as any[]);

  const ans = reduced.reduce((acc, curr) => acc + parseInt(curr), 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  //   const ex = `467..114..
  // ...*......
  // ..35..633.
  // ......#...
  // 617*......
  // .....+.58.
  // ..592.....
  // ......755.
  // ...$.*....
  // .664.598..`;
  // const input = ex.split("\n");

  const numMap = new Map();
  const starMap = new Map();

  const nums = input.map((inRow, rowi) => {
    numMap.set(rowi, [...inRow.matchAll(/\d+/g)]);
    return [...inRow.matchAll(/\d+/g)];
  });
  const stars = input.map((inRow, rowi) => {
    starMap.set(rowi, [...inRow.matchAll(/\*/g)]);
    return [...inRow.matchAll(/\*/g)];
  });

  let pairs = [];

  starMap.forEach((val, key) => {
    if (val.length === 0) {
      return;
    }
    const prev = numMap.get(key - 1);
    const same = numMap.get(key);
    const next = numMap.get(key + 1);

    let group = [];
    val.forEach((star) => {
      group = [];
      prev
        ?.filter((num) => {
          return (
            (num.index <= star.index &&
              star.index <= num.index + num[0].length) ||
            star.index === num.index - 1 ||
            star.index === num.index
          );
        })
        .forEach((n) => group.push(n));

      same
        ?.filter((num) => {
          return (
            num.index + num[0].length === star.index ||
            num.index === star.index + 1
          );
        })
        .forEach((n) => group.push(n));

      next
        ?.filter((num) => {
          return (
            (num.index <= star.index &&
              star.index <= num.index + num[0].length) ||
            star.index === num.index - 1 ||
            star.index === num.index
          );
        })
        .forEach((n) => group.push(n));
      pairs.push(group);
    });
  });

  const reduced = pairs
    .filter((pair) => pair.length === 2)
    .reduce(
      (acc, pair) => acc + parseInt(pair[0][0]) * parseInt(pair[1][0]),
      0
    );

  console.log(reduced);

  return 0;
}

const t0 = performance.now();
part1();
const t1 = performance.now();
console.log(`part 1 took ${t1 - t0} milliseconds.`);
const t2 = performance.now();
part2();
const t3 = performance.now();
console.log(`part 2 took ${t3 - t2} milliseconds.`);
