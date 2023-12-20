function parseInput() {
  const input = Deno.readTextFileSync("src/day16/input.txt");

  //   const input = `.|...\\....
  // |.-.\\.....
  // .....|-...
  // ........|.
  // ..........
  // .........\\
  // ..../.\\\\..
  // .-.-/..|..
  // .|....-|.\\
  // ..//.|....`;

  const parsed = input.split("\n").map((row) => row.split(""));

  return parsed;
}

class Beam {
  x;
  y;
  direction;
  trail;
  done;

  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.trail = [];
    this.done = false;
  }

  move(board: string[][], beamSet: BeamSet) {
    // if we match, we're done
    const allTrails = beamSet.beams.map((beam) => beam.trail).flat();
    if (
      allTrails.find((entry) =>
        entry[0] === this.x && entry[1] === this.y &&
        entry[2] === this.direction
      )
    ) {
      this.done = true;
      // console.log("beam loop");
      return;
    }
    this.trail.push([this.x, this.y, this.direction]);
    const tile = board[this.y][this.x];
    // console.log("moving", this.direction, tile, this.x, this.y);
    switch (this.direction) {
      case "left":
        if (tile === "\\") {
          this.direction = "up";
          if (this.y === 0) {
            this.done = true;
            break;
          }
          this.y -= 1;
        } else if (tile === "/") {
          this.direction = "down";
          if (this.y === board.length - 1) {
            this.done = true;
            break;
          }
          this.y += 1;
        } else if (tile === "-") {
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        } else if (tile === "|") {
          this.direction = "up";
          if (this.y === 0) {
            this.done = true;
            break;
          }
          if (this.y !== board.length - 1) {
            beamSet.addBeam(this.x, this.y + 1, "down");
          }
          this.y -= 1;
        } else if (tile === ".") {
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        }
        break;
      case "right":
        if (tile === "\\") {
          this.direction = "down";
          if (this.y === board.length - 1) {
            this.done = true;
            break;
          }
          this.y += 1;
        } else if (tile === "/") {
          this.direction = "up";
          if (this.y === 0) {
            this.done = true;
            break;
          }
          this.y -= 1;
        } else if (tile === "-") {
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x += 1;
        } else if (tile === "|") {
          this.direction = "up";
          if (this.y !== board.length - 1) {
            beamSet.addBeam(this.x, this.y + 1, "down");
          }
          if (this.y === 0) {
            this.done = true;
            break;
          }
          this.y -= 1;
        } else if (tile === ".") {
          if (this.x === board[0].length - 1) {
            this.done = true;
            break;
          }
          this.x += 1;
        }
        break;
      case "up":
        if (tile === "\\") {
          this.direction = "left";
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        } else if (tile === "/") {
          this.direction = "right";
          if (this.x === board[0].length - 1) {
            this.done = true;
            break;
          }
          this.x += 1;
        } else if (tile === "-") {
          this.direction = "left";
          if (this.x !== board.length - 1) {
            beamSet.addBeam(this.x + 1, this.y, "right");
          }
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        } else if (tile === "|") {
          if (this.y === 0) {
            this.done = true;
            break;
          }
          this.y -= 1;
        } else if (tile === ".") {
          if (this.y === 0) {
            this.done = true;
            break;
          }
          this.y -= 1;
        }
        break;
      case "down":
        if (tile === "\\") {
          this.direction = "right";
          if (this.x === board[0].length - 1) {
            this.done = true;
            break;
          }
          this.x += 1;
        } else if (tile === "/") {
          this.direction = "left";
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        } else if (tile === "-") {
          this.direction = "left";
          if (this.x !== board.length - 1) {
            beamSet.addBeam(this.x + 1, this.y, "right");
          }
          if (this.x === 0) {
            this.done = true;
            break;
          }
          this.x -= 1;
        } else if (tile === "|") {
          if (this.y === board.length - 1) {
            this.done = true;
            break;
          }
          this.y += 1;
        } else if (tile === ".") {
          if (this.y === board.length - 1) {
            this.done = true;
            break;
          }
          this.y += 1;
        }
        break;
    }
  }
}

class BeamSet {
  beams;
  board;

  constructor(board) {
    this.beams = [new Beam(0, 0, "right")];
    this.board = board;
  }

  tick() {
    this.beams.forEach((beam) => {
      if (!beam.done) {
        beam.move(this.board, this);
      }
    });
  }

  addBeam(x, y, direction) {
    this.beams.push(new Beam(x, y, direction));
  }
}

function part1() {
  const input = parseInput();

  const beamSet = new BeamSet(input);
  // console.log(input[1][1]);
  // console.log(input[1]);
  // return;

  // console.log(beamSet.beams);
  while (!beamSet.beams.every((beam) => beam.done)) {
    // for (let i = 0; i < 25; i++) {
    beamSet.tick();
    // console.log(beamSet.beams);
  }
  // }

  const energized = [...input];
  beamSet.beams.forEach((beam) =>
    beam.trail.forEach((entry) => energized[entry[1]][entry[0]] = "#")
  );
  console.log(energized.map((row) => row.join("")).join("\n"));

  const energizedCount = energized.reduce((acc, curr) => {
    return curr.filter((el) => el === "#").length + acc;
  }, 0);

  console.log(energizedCount);

  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();
