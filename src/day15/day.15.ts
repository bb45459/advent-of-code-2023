function parseInput() {
  const input = Deno.readTextFileSync("src/day15/input.txt");

  // const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const parsed = input.split(",");

  return parsed;
}

function part1() {
  const input = parseInput();

  const ans = input.reduce((acc, step) => {
    return acc + getHashVal(step);
  }, 0);

  console.log(ans);

  return 0;
}

function getHashVal(word) {
  let val = 0;
  for (let letter of word) {
    // Determine the ASCII code for the current character of the string.
    // Increase the current value by the ASCII code you just determined.
    // Set the current value to itself multiplied by 17.
    // Set the current value to the remainder of dividing itself by 256.
    const code = letter.charCodeAt(0);
    val += code;
    val *= 17;
    val = val % 256;
  }
  return val;
}

function part2() {
  const input = parseInput();

  const boxes: any[][] = Array(256).fill([]);

  for (let step of input) {
    if (step[step.length - 1] === "-") {
      // remove
      const label = step.split("-")[0];
      const index = getHashVal(label);
      const found = boxes[index].findIndex((el) => el[0] === label);
      if (found !== -1) {
        boxes[index].splice(found, 1);
      }
    } else {
      // upsert
      const label = step.split("=")[0];
      const strength = parseInt(step.split("=")[1]);

      const index = getHashVal(label);
      const found = boxes[index].findIndex((el) => el[0] === label);
      if (found !== -1) {
        boxes[index].splice(found, 1, [label, strength]);
      } else {
        boxes[index] = [...boxes[index], [label, strength]];
      }
    }
  }

  // One plus the box number of the lens in question.
  // The slot number of the lens within the box: 1 for the first lens, 2 for the second lens, and so on.
  // The focal length of the lens.
  const focusPower = boxes.reduce((acc, box, boxI) => {
    const reduced = box.reduce((boxAcc, lens, lensI) => {
      return boxAcc + (1 + boxI) * (1 + lensI) * lens[1];
    }, 0);
    return acc + reduced;
  }, 0);

  console.log(focusPower);

  return 0;
}

part1();
part2();
