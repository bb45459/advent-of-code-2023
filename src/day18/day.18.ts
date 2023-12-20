function parseInput() {
  const input = Deno.readTextFileSync("src/day18/input.txt");

  //   const input = `R 6 (#70c710)
  // D 5 (#0dc571)
  // L 2 (#5713f0)
  // D 2 (#d2c081)
  // R 2 (#59c680)
  // D 2 (#411b91)
  // L 5 (#8ceee2)
  // U 2 (#caa173)
  // L 1 (#1b58a2)
  // U 2 (#caa171)
  // R 2 (#7807d2)
  // U 3 (#a77fa3)
  // L 2 (#015232)
  // U 2 (#7a21e3)`;

  const parsed = input.split("\n").filter((e) => !!e);

  return parsed;
}

function part1() {
  const input = parseInput();

  let trail = [[0, 0]];
  let perim = 0;
  let pos = [0, 0];
  input.forEach((step) => {
    const splitStep = step.split(" ");
    const dir = splitStep[0];
    const amt = parseInt(splitStep[1]);
    perim += amt;
    switch (dir) {
      case "R":
        pos = [pos[0] + amt, pos[1]];
        break;
      case "L":
        pos = [pos[0] - amt, pos[1]];
        break;
      case "U":
        pos = [pos[0], pos[1] - amt];
        break;
      case "D":
        pos = [pos[0], pos[1] + amt];
        break;
    }
    trail.push(pos);
  });

  // counter clockwise vertex list
  const area = polygonArea(
    trail.map((el) => el[0]).toReversed(),
    trail.map((el) => el[1]).toReversed(),
    trail.length,
  );

  // console.log(perim, area);

  const ans = perim / 2 + 1 + area;
  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  let trail = [[0, 0]];
  let perim = 0;
  let pos = [0, 0];
  input.forEach((step) => {
    const splitStep = step.split(" ");
    // (#7a21e3)
    const dir = splitStep[2][splitStep[2].length - 2];
    const amt = parseInt(splitStep[2].substring(2, 7), 16);
    perim += amt;
    switch (dir) {
      case "0":
        pos = [pos[0] + amt, pos[1]];
        break;
      case "2":
        pos = [pos[0] - amt, pos[1]];
        break;
      case "3":
        pos = [pos[0], pos[1] - amt];
        break;
      case "1":
        pos = [pos[0], pos[1] + amt];
        break;
    }
    trail.push(pos);
  });

  // counter clockwise vertex list
  const area = polygonArea(
    trail.map((el) => el[0]).toReversed(),
    trail.map((el) => el[1]).toReversed(),
    trail.length,
  );

  // console.log(perim, area);

  const ans = perim / 2 + 1 + area;
  console.log(ans);

  return 0;
}

// https://mathopenref.com/coordpolygonarea2.html
function polygonArea(X, Y, numPoints) {
  let area = 0; // Accumulates area
  let j = numPoints - 1;

  for (let i = 0; i < numPoints; i++) {
    area += (X[j] + X[i]) * (Y[j] - Y[i]);
    j = i; //j is previous vertex to i
  }
  return area / 2;
}

part1();
part2();
