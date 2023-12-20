function parseInput() {
  const input = Deno.readTextFileSync("src/day20/input.txt");

  //   const input = `broadcaster -> a, b, c
  // %a -> b
  // %b -> c
  // %c -> inv
  // &inv -> a`;

  //   const input = `broadcaster -> a
  // %a -> inv, con
  // &inv -> b
  // %b -> con
  // &con -> output`;

  const parsed = input.split("\n").filter((e) => !!e);

  return parsed;
}

class FlipFlop {
  // initially off
  // if receives a high pulse, ignore
  // if receives a low pulse, toggle the memory and send as output

  memory;
  outputs;
  label;

  constructor(outputs, label) {
    this.memory = 0;
    this.outputs = outputs;
    this.label = label;
  }

  addPulse(inVal, from, queue) {
    if (inVal === 1) {
      return [];
    }
    this.memory = this.memory === 1 ? 0 : 1;
    queue.push(...this.outputs.map((o) => [this.label, this.memory, o]));

    return this.outputs.map((o) => [this.label, this.memory, o]);
  }
}

class Conjunction {
  // initially remember off for all inputs
  // when receives a pulse, change memory for that input to match
  // if all inputs are high, send a low, otherwise send a high
  outputs;
  inputs;
  label;

  constructor(outputs, label) {
    this.outputs = outputs;
    this.inputs = new Map();
    this.label = label;
  }

  addInput(el, val) {
    this.inputs.set(el, val);
  }
  addPulse(inVal, from, queue) {
    this.inputs.set(from, inVal);
    const outVal = [...this.inputs.values()].every((v) => v === 1) ? 0 : 1;
    queue.push(...this.outputs.map((o) => [this.label, outVal, o]));

    return this.outputs.map((o) => [this.label, outVal, o]);
  }
}

class Broadcaster {
  // send input to all outputs
  outputs: string[];
  label;
  constructor(outputs) {
    this.outputs = outputs;
    this.label = "broadcaster";
  }
  addPulse(inVal, from, queue) {
    queue.push(...this.outputs.map((o) => [this.label, inVal, o]));

    return this.outputs.map((o) => [this.label, inVal, o]);
  }
}

function part1() {
  const input = parseInput();

  // pulse queue
  const modules = new Map();

  // do conjunctions first
  input
    .filter((el) => el[0] === "&")
    .forEach((conj) => {
      const definition = conj.split(" -> ")[0];
      const destinations = conj.split(" -> ")[1].split(", ");
      modules.set(
        definition.substring(1),
        new Conjunction(destinations, definition.substring(1))
      );
    });

  input
    .filter((item) => item[0] === "%")
    .forEach((item) => {
      const definition = item.split(" -> ")[0];
      const destinations = item.split(" -> ")[1].split(", ");
      modules.set(
        definition.substring(1),
        new FlipFlop(destinations, definition.substring(1))
      );
    });

  input
    .filter((item) => item[0] === "b")
    .forEach((item) => {
      const destinations = item.split(" -> ")[1].split(", ");
      modules.set("broadcaster", new Broadcaster(destinations));
    });

  const conjs = [...modules.entries()].filter(
    (m) => m[1] instanceof Conjunction
  );
  const ffs = [...modules.entries()].filter((m) => m[1] instanceof FlipFlop);

  modules.get("broadcaster").outputs.forEach((o) => {
    conjs
      .filter((c) => c[0].includes(o))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.inputs.addInput(o, 0);
        modules.set(c[0], conj);
      });
  });

  conjs.forEach((curr) => {
    conjs
      .filter((c) => curr[1].outputs.includes(c[0]))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.addInput(curr[0], 0);
        modules.set(c[0], conj);
      });
  });

  ffs.forEach((ff) => {
    conjs
      .filter((c) => ff[1].outputs.includes(c[0]))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.addInput(ff[0], 0);
        modules.set(c[0], conj);
      });
  });

  const pulsesSent = [];
  for (let i = 0; i < 1000; i++) {
    const pulseQueue = [["button", 0, "broadcaster"]];
    pulsesSent.push(["button", 0, "broadcaster"]);
    while (pulseQueue.length > 0) {
      const inst = pulseQueue.shift();

      const el = modules.get(inst[2]);

      if (!el) {
        continue;
      }

      const newPulses = el.addPulse(inst[1], inst[0], pulseQueue);

      pulsesSent.push(...newPulses);
      // console.log(pulseQueue);
      // console.log("-----------");
      // console.log(pulsesSent);
      // console.log("-----------");
    }
  }

  const counts = pulsesSent.reduce(
    (acc, curr) => {
      acc[String(curr[1])] += 1;
      return acc;
    },
    { "0": 0, "1": 0 }
  );

  const ans = counts["0"] * counts["1"];

  console.log(ans, counts);

  return 0;
}

function part2() {
  const input = parseInput();

  // pulse queue
  const modules = new Map();

  // do conjunctions first
  input
    .filter((el) => el[0] === "&")
    .forEach((conj) => {
      const definition = conj.split(" -> ")[0];
      const destinations = conj.split(" -> ")[1].split(", ");
      modules.set(
        definition.substring(1),
        new Conjunction(destinations, definition.substring(1))
      );
    });

  input
    .filter((item) => item[0] === "%")
    .forEach((item) => {
      const definition = item.split(" -> ")[0];
      const destinations = item.split(" -> ")[1].split(", ");
      modules.set(
        definition.substring(1),
        new FlipFlop(destinations, definition.substring(1))
      );
    });

  input
    .filter((item) => item[0] === "b")
    .forEach((item) => {
      const destinations = item.split(" -> ")[1].split(", ");
      modules.set("broadcaster", new Broadcaster(destinations));
    });

  const conjs = [...modules.entries()].filter(
    (m) => m[1] instanceof Conjunction
  );
  const ffs = [...modules.entries()].filter((m) => m[1] instanceof FlipFlop);

  modules.get("broadcaster").outputs.forEach((o) => {
    conjs
      .filter((c) => c[0].includes(o))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.inputs.addInput(o, 0);
        modules.set(c[0], conj);
      });
  });

  conjs.forEach((curr) => {
    conjs
      .filter((c) => curr[1].outputs.includes(c[0]))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.addInput(curr[0], 0);
        modules.set(c[0], conj);
      });
  });

  ffs.forEach((ff) => {
    conjs
      .filter((c) => ff[1].outputs.includes(c[0]))
      .forEach((c) => {
        const conj = modules.get(c[0]);
        conj.addInput(ff[0], 0);
        modules.set(c[0], conj);
      });
  });

  let rxEnabled = 0;
  let i = 0;
  while (rxEnabled === 0) {
    const pulseQueue = [["button", 0, "broadcaster"]];
    let newPulses = [];
    while (pulseQueue.length > 0) {
      const inst = pulseQueue.shift();

      const el = modules.get(inst[2]);

      if (!el) {
        continue;
      }

      newPulses = el.addPulse(inst[1], inst[0], pulseQueue);

      // pulsesSent.push(...newPulses);
      // console.log(pulseQueue);
      // console.log("-----------");
      // console.log(pulsesSent);
      // console.log("-----------");
    }

    const rx = newPulses.find((pulse) => pulse[1] === 0 && pulse[2] === "rx");
    if (rx === 0 && rxEnabled) {
      rxEnabled = 1 + i;
      return;
    }
    i++;
  }

  console.log(rxEnabled);

  return 0;
}

// part1();
part2();
