function parseInput() {
  const input = Deno.readTextFileSync("src/day19/input.txt");

  /*
  const input = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;
  */

  const parsed = input.split("\n\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  const workflows = input[0].split("\n").filter((e) => !!e);
  const partList = input[1].split("\n").filter((e) => !!e);

  const parts = partList.map((part) => {
    const digits = part.match(/\d+/g) ?? [];
    console.log(digits);
    const x = parseInt(digits[0]);
    const m = parseInt(digits[1]);
    const a = parseInt(digits[2]);
    const s = parseInt(digits[3]);
    return { x, m, a, s };
  });

  console.log(parts);

  const workflowMap = new Map();
  const accepted = [];

  workflows.forEach((workflow) => {
    const label = workflow.substring(0, workflow.indexOf("{"));
    const instructions = workflow.substring(
      workflow.indexOf("{") + 1,
      workflow.indexOf("}"),
    ).split(",");
    // console.log(label);
    // console.log(instructions);
    workflowMap.set(label, instructions);
  });

  // console.log(workflowMap.get("in"));

  // console.log(parts[0], executeWorkflow(parts[0], workflowMap.get("in")));
  parts.forEach((part) => {
    const res = getFinalState(part, workflowMap);
    console.log(part, res);
    if (res === "A") {
      accepted.push(part);
    }
  });

  const ans = accepted.reduce((acc, curr) => {
    return acc + curr.x + curr.m + curr.a + curr.s;
  }, 0);

  console.log(ans);

  return 0;
}

function getFinalState(part, workflowMap) {
  let state = "in";
  while (state !== "A" && state !== "R") {
    state = executeWorkflow(part, workflowMap.get(state));
  }

  return state;
}

function executeWorkflow(part, flow: string[]) {
  for (let i = 0; i < flow.length; i++) {
    const step = flow[i];
    if (step.includes(":")) {
      const test = step.split(":")[0];
      const { x, m, a, s } = part;
      const res = eval(test);
      if (res) {
        return step.split(":")[1];
      }
    } else {
      return step;
    }
  }
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();
