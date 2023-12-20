function parseInput() {
  const input = Deno.readTextFileSync("src/day12/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function getCombinations(row, rule) {
  // get indexes of question marks
  const indices = [];
  const element = "?";
  let idx = row.indexOf(element);
  while (idx !== -1) {
    indices.push(idx);
    idx = row.indexOf(element, idx + 1);
  }
  // console.log("question indices", indices, row);

  const combos = 2 ** indices.length;

  let validCombos = 0;

  for (let i = 0; i < combos; i++) {
    const stringReplacers = padZerosReturnArray(i, indices.length);
    // console.log("string replacers", stringReplacers);

    let tempArr: string = row;
    indices.forEach((index, j) => {
      tempArr =
        tempArr.slice(0, index) + stringReplacers[j] + tempArr.slice(index + 1);
    });
    // console.log("temparr", tempArr);

    const test = testForPass(tempArr, rule);
    if (test) {
      validCombos++;
    }
  }
  return validCombos;
}

function testForPass(row: string, rule) {
  const splitSections = [...row.matchAll(/1+/g)].map((e) => e[0]);

  const sectionLengths = splitSections.map((section) => section.length);
  const parsedRule = rule.split(",").map((el) => parseInt(el));
  if (
    sectionLengths.length === parsedRule.length &&
    sectionLengths.every((el, ix) => el === parsedRule[ix])
  ) {
    console.log(
      row,
      rule,
      splitSections,
      parsedRule,
      sectionLengths.length === parsedRule.length &&
        sectionLengths.every((el, ix) => el === parsedRule[ix])
    );
  }

  return (
    sectionLengths.length === parsedRule.length &&
    sectionLengths.every((el, ix) => el === parsedRule[ix])
  );
}

function part1() {
  const input = parseInput();

  //   const input = `???.### 1,1,3
  // .??..??...?##. 1,1,3
  // ?#?#?#?#?#?#?#? 1,3,1,6
  // ????.#...#... 4,1,1
  // ????.######..#####. 1,6,5
  // ?###???????? 3,2,1`.split("\n");

  const rows = input.map((row) =>
    row.replaceAll("#", "1").replaceAll(".", "0").split(" ")
  );

  // console.log(rows);
  // console.log(testForPass(rows[0][0], rows[0][1]));

  // console.log(getCombinations(rows[0][0], rows[0][1]));

  const ans = rows.reduce((acc, currRow) => {
    const count = getCombinations(currRow[0], currRow[1]);
    console.log(currRow, count);
    return acc + count;
  }, 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

function padZerosReturnArray(num, totalLength) {
  const numString = Number(num).toString(2);
  // console.log(totalLength, numString, numString.length);
  const padding = totalLength - numString.length;

  return Array(padding).fill("0").concat(numString.split(""));
}

part1();
// part2();
