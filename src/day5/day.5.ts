import { minOf } from "https://deno.land/std@0.208.0/collections/min_of.ts";
import { chunk } from "https://deno.land/std@0.208.0/collections/chunk.ts";
import { range } from "https://deno.land/x/iterators@v0.2.0/mod.ts";
function parseInput() {
  const input = Deno.readTextFileSync("src/day5/input.txt");

  const parsed = input.split("\n\n");

  return parsed;
}

function part1() {
  const input = parseInput();
  /*
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n\n");
*/
  const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));
  const maps = input
    .slice(1)
    .map((mapper) => mapper.split(":\n")[1].split("\n"));

  console.log(seeds);
  console.log(maps);

  const firstMap = maps[0].reduce((acc, mapPart) => {
    const firstMapPart = mapPart.split(" ").map((n) => parseInt(n));

    const destStart = firstMapPart[0];
    const sourceStart = firstMapPart[1];
    const range = firstMapPart[2];

    acc.set(sourceStart, { destStart, range });

    return acc;
  }, new Map());

  const allMaps = maps.map((singleMap) => {
    return singleMap.reduce((acc, mapPart) => {
      const firstMapPart = mapPart.split(" ").map((n) => parseInt(n));

      const destStart = firstMapPart[0];
      const sourceStart = firstMapPart[1];
      const range = firstMapPart[2];

      acc.set(sourceStart, { destStart, range });

      return acc;
    }, new Map());
  });

  console.log(allMaps);

  const finalLocations = allMaps.reduce((acc, currMap) => {
    const mappedSeeds = acc.map((seed) => {
      let placement;
      for (const entry of currMap.entries()) {
        // console.log(seed, entry[0], entry[1].destStart, entry[1].range);
        // console.log(entry[0] <= seed && seed < entry[0] + entry[1].range);

        if (entry[0] <= seed && seed < entry[0] + entry[1].range) {
          const diff = seed - entry[0];
          placement = entry[1].destStart + diff;

          console.log("seed", seed, "mapped to", placement);
          break;
        }
      }
      return placement ? placement : seed;
    });
    console.log(mappedSeeds);
    return mappedSeeds;
  }, seeds);

  const min = minOf(finalLocations, (e) => e);
  console.log(finalLocations);
  console.log(min);
  return 0;
}

function part2() {
  // const input = parseInput();

  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n\n");

  const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));

  const chunkedSeeds = chunk(seeds, 2);

  const seedMaps = chunkedSeeds.map((seedPair) => [
    seedPair[0],
    seedPair[0] + seedPair[1] - 1,
  ]);
  // .slice(1, 2);

  const maps = input
    .slice(1)
    .map((mapper) => mapper.split(":\n")[1].split("\n"));

  // console.log("seedMaps", seedMaps);
  // console.log(maps);

  const allMaps = maps.map((singleMap) => {
    return singleMap.reduce((acc, mapPart) => {
      const firstMapPart = mapPart.split(" ").map((n) => parseInt(n));

      const destStart = firstMapPart[0];
      const sourceStart = firstMapPart[1];
      const range = firstMapPart[2];

      acc.set(sourceStart, { destStart, range });

      return acc;
    }, new Map());
  });
  // .slice(0, 1);

  // console.log("allMaps", allMaps);
  // console.log("seed maps", seedMaps);

  const finalLocations = seedMaps.reduce((acc, currSeed) => {
    console.log("currSeed", currSeed);
    console.log("acc", acc);
    let mappedSeeds = [...acc];
    allMaps.forEach((currMap) => {
      console.log("currMap", currMap);
      const splitSeeds = testAndSplitSeeds(currSeed, currMap);
      console.log("splitSeeds", splitSeeds);
      mappedSeeds.push(...splitSeeds);
      console.log("mappedSeeds", mappedSeeds);
    });
    return mappedSeeds;
  }, []);

  // console.log(finalLocations);
  // const min = minOf(finalLocations, (e) => e);
  // console.log(min);

  return 0;
}

// seed = [79, 79 + 14 - 1]
function testAndSplitSeeds(seed = [70, 92], map = new Map()) {
  const sortedMap = [...map.entries()].toSorted((a, b) => a[0] - b[0]);

  console.log(seed);
  console.log(sortedMap);

  const firstMatch = sortedMap.find(
    (item) => item[0] <= seed[1] && seed[1] <= item[0] + item[1].range
  );
  console.log(firstMatch);

  if (!firstMatch) {
    const res = [seed[0], seed[1]];
    console.log("done no match", seed, "=>", res);
    return [res];
  }

  const diff = firstMatch[1].destStart - firstMatch[0];

  if (seed[0] >= firstMatch[0]) {
    // entirely contained, return
    // console.log("firstMatch", firstMatch, "seed[0]", seed[0]);
    const res = [seed[0] + diff, seed[1] + diff];
    console.log("done", seed, "=>", res);
    return [res];
  } else {
    const res = [firstMatch[1].destStart, seed[1] + diff];
    const rest = [seed[0], firstMatch[0] - 1];
    console.log("splitting", seed, "=>", res);
    console.log("recursing with", rest);
    return [res, testAndSplitSeeds(rest, map).flat()];
  }
}

// const res = testAndSplitSeeds();
// console.log(res);
// part1();
part2();
