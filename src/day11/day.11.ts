function parseInput() {
  const input = Deno.readTextFileSync("src/day11/input.txt");

  const parsed = input.split("\n");

  return parsed;
}

function part1() {
  const input = parseInput();
  //   const input = `...#......
  // .......#..
  // #.........
  // ..........
  // ......#...
  // .#........
  // .........#
  // ..........
  // .......#..
  // #...#.....`.split("\n");

  const rows = input.map((el) => el.split(""));

  const emptyRows: number[] = rows.reduce(
    (acc, row, i) => (row.every((e) => e === ".") ? [...acc, i] : acc),
    []
  );
  const emptyCols: number[] = rows[0].reduce((acc, col, j) => {
    return rows.map((row) => row[j]).every((e) => e === ".")
      ? [...acc, j]
      : acc;
  }, []);

  let expandedRows = [...rows];

  emptyCols.forEach((emptyColIndex, colUpdatedCount) => {
    expandedRows = expandedRows.map((row) => [
      ...row.slice(0, emptyColIndex + colUpdatedCount),
      "+",
      ...row.slice(emptyColIndex + colUpdatedCount),
    ]);
  });
  emptyRows.forEach((emptyRowIndex, rowUpdatedCount) => {
    const emptyRow = Array(expandedRows[0].length).fill("+");
    expandedRows = [
      ...expandedRows.slice(0, emptyRowIndex + rowUpdatedCount),
      emptyRow,
      ...expandedRows.slice(emptyRowIndex + rowUpdatedCount),
    ];
  });
  // console.log(expandedRows.map((row) => row.join("")).join("\n"));

  const galaxies = expandedRows.reduce((acc, currRow, i) => {
    let idx = currRow.indexOf("#");
    let indices = [];
    while (idx !== -1) {
      indices.push([i, idx]);
      idx = currRow.indexOf("#", idx + 1);
    }
    return [...acc, ...indices];
  }, []);

  const distances = getDistances(galaxies);

  const ans = distances.reduce((acc, curr) => {
    const sum = curr.reduce((at, ct) => at + ct, 0);
    return acc + sum;
  }, 0);
  console.log(ans);

  return 0;
}

function getDistances(arr) {
  if (arr.length === 1) {
    return [];
  }
  const first = arr[0];
  const rest = arr.slice(1);
  const dists = rest.map(
    (gal) => Math.abs(gal[0] - first[0]) + Math.abs(gal[1] - first[1])
  );

  return [dists, ...getDistances(rest)];
}

function part2() {
  const input = parseInput();
  //   const input = `...#......
  // .......#..
  // #.........
  // ..........
  // ......#...
  // .#........
  // .........#
  // ..........
  // .......#..
  // #...#.....`.split("\n");

  const rows = input.map((el) => el.split(""));

  const emptyRows: number[] = rows.reduce(
    (acc, row, i) => (row.every((e) => e === ".") ? [...acc, i] : acc),
    []
  );
  const emptyCols: number[] = rows[0].reduce((acc, col, j) => {
    return rows.map((row) => row[j]).every((e) => e === ".")
      ? [...acc, j]
      : acc;
  }, []);

  // replacing for visual aids
  /*
  let expandedRows = [...rows];
  emptyCols.forEach((emptyColIndex, colUpdatedCount) => {
    expandedRows = expandedRows.map((row) => [
      ...row.slice(0, emptyColIndex),
      "+",
      ...row.slice(emptyColIndex + 1),
    ]);
  });
  emptyRows.forEach((emptyRowIndex, rowUpdatedCount) => {
    const emptyRow = Array(expandedRows[0].length).fill("+");
    expandedRows = [
      ...expandedRows.slice(0, emptyRowIndex),
      emptyRow,
      ...expandedRows.slice(emptyRowIndex + 1),
    ];
  });
  */

  // console.log(expandedRows.map((row) => row.join("")).join("\n"));

  const galaxies = expandedRows.reduce((acc, currRow, i) => {
    let idx = currRow.indexOf("#");
    let indices = [];
    while (idx !== -1) {
      indices.push([i, idx]);
      idx = currRow.indexOf("#", idx + 1);
    }
    return [...acc, ...indices];
  }, []);

  const distances = getDistancesExtraExpanded(galaxies, emptyRows, emptyCols);

  const ans = distances.reduce((acc, curr) => {
    const sum = curr.reduce((at, ct) => at + ct, 0);
    return acc + sum;
  }, 0);

  // find the expansions between, add 999_999 for each occurrance
  console.log(ans);

  return 0;
}

function getDistancesExtraExpanded(arr, expandedRowIs, expandedColIs) {
  if (arr.length === 1) {
    return [];
  }

  const first = arr[0];
  const rest = arr.slice(1);
  const dists = rest.map((gal) => {
    const minX = Math.min(first[1], gal[1]);
    const maxX = Math.max(first[1], gal[1]);
    const minY = Math.min(first[0], gal[0]);
    const maxY = Math.max(first[0], gal[0]);
    const expandedRowCount = expandedRowIs.filter(
      (rowI) => minY < rowI && rowI < maxY
    ).length;
    const expandedColCount = expandedColIs.filter(
      (colI) => minX < colI && colI < maxX
    ).length;

    return (
      Math.abs(gal[0] - first[0]) +
      Math.abs(gal[1] - first[1]) +
      (expandedColCount + expandedRowCount) * 999_999
    );
  });

  return [
    dists,
    ...getDistancesExtraExpanded(rest, expandedRowIs, expandedColIs),
  ];
}

part1();
part2();
