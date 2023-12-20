import "https://deno.land/std@0.208.0/dotenv/load.ts";

const session = Deno.env.get("SESSION") ?? "";
const day = Deno.args[0];

if (!day) {
  console.error("No day provided");
}

const res = await fetch("https://adventofcode.com/2022/day/1/input", {
  headers: {
    cookie: `session=${session}`,
  },
});

const text = await res.text();

await Deno.writeTextFile(`./day${day}/input.txt`, text);
