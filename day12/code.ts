interface Present {
  id: number;
  shape: string[];
  totalArea: number;
}

interface Region {
  width: number;
  height: number;
  requiredPresents: Record<number, number>;
}

function readCoord(input: string): [number, number] {
  const [x, y] = input.split(",").map(Number);
  return [x, y];
}

function writeCoord(x: number, y: number): string {
  return `${x},${y}`;
}

export function parseShapes(data: string[]): Record<number, Present> {
  const presents: Present[] = [];
  let tempPresent: Present | null = null;
  let y = 0;
  for (const line of data) {
    if (line.includes(":")) {
      tempPresent = {
        id: parseInt(line.split(":")[0]),
        shape: [],
        totalArea: 0,
      };
      y = 0;
    } else if (line === "") {
      tempPresent.totalArea = tempPresent.shape.length;
      presents.push(tempPresent);
    } else {
      line.split("").forEach((char, index) => {
        if (char === "#") {
          tempPresent.shape.push(writeCoord(index, y));
        }
      });
      y++;
    }
  }
  return Object.fromEntries(presents.map((present) => [present.id, present]));
}

function parseRegions(data: string[]): Region[] {
  return data.map((line) => {
    const requiredPresents: Record<number, number> = {};
    const [size, counts] = line.split(": ");
    const [width, height] = size.split("x").map(Number);
    counts.split(" ").forEach((count, index) => {
      requiredPresents[index] = parseInt(count);
    });
    return {
      width,
      height,
      requiredPresents,
    };
  });
}

const transformationCache = new Map<number, string[][]>();

export function getTransformationShapes(present: Present): string[][] {
  if (transformationCache.has(present.id)) {
    return transformationCache.get(present.id)!;
  }

  const transformations: string[][] = [];
  const seen = new Set<string>();

  // Add all 4 rotations
  for (let rotation = 0; rotation < 4; rotation++) {
    const rotated = rotate(present.shape, rotation);
    const key = rotated.sort().join(";");
    if (!seen.has(key)) {
      seen.add(key);
      transformations.push(rotated);
    }
  }

  // Add all 4 rotations of the flipped shape
  const flipped = flip(present.shape);
  for (let rotation = 0; rotation < 4; rotation++) {
    const rotated = rotate(flipped, rotation);
    const key = rotated.sort().join(";");
    if (!seen.has(key)) {
      seen.add(key);
      transformations.push(rotated);
    }
  }

  transformationCache.set(present.id, transformations);
  return transformations;
}

// Normalize shape so top-left coordinate is at (0,0)
function normalize(shape: string[]): string[] {
  if (shape.length === 0) return shape;

  const coords = shape.map(readCoord);
  const minX = Math.min(...coords.map(([x, _]) => x));
  const minY = Math.min(...coords.map(([_, y]) => y));

  return coords.map(([x, y]) => writeCoord(x - minX, y - minY));
}

// Rotate shape 90° clockwise (rotation times)
function rotate(shape: string[], rotation: number): string[] {
  let result = shape;

  for (let i = 0; i < rotation; i++) {
    const coords = result.map(readCoord);
    // Rotate 90° clockwise: (x, y) -> (y, -x)
    result = coords.map(([x, y]) => writeCoord(y, -x));
    result = normalize(result);
  }

  return result;
}

// Flip shape horizontally
function flip(shape: string[]): string[] {
  const coords = shape.map(readCoord);
  // Flip horizontally: (x, y) -> (-x, y)
  const flipped = coords.map(([x, y]) => writeCoord(-x, y));
  return normalize(flipped);
}

function evaluateRegion(
  region: Region,
  presents: Record<number, Present>
): boolean {
  const grid: Record<string, string> = initialGrid(region.width, region.height);
  const presentsToAdd: Present[] = Object.entries(
    region.requiredPresents
  ).flatMap(([id, count]) => {
    return Array.from({ length: count }, () => presents[id]);
  });

  presentsToAdd.sort((a, b) => b.totalArea - a.totalArea || a.id - b.id);

  const totalAreaNeeded = presentsToAdd.reduce(
    (acc, p) => acc + p.totalArea,
    0
  );
  if (totalAreaNeeded > region.width * region.height) {
    console.log("  -> Area too large");
    return false;
  }
  //simple area check
  if (
    presentsToAdd.length <
    Math.floor(region.width / 3) * Math.floor(region.height / 3)
  ) {
    console.log("  -> Basic fit");
    return true;
  }

  console.log(
    `Total area required/available: ${totalAreaNeeded}/${
      region.width * region.height
    }`
  );
  return presentsToAdd.length * 8 < region.width * region.height;
  // return false;
  // const result = backtrack(grid, presentsToAdd, 0, region.width, region.height);
  // console.log(`  -> Result: ${result}`);
  // return result;
}

// Main backtracking function - tries to fill the first empty cell
function backtrack(
  grid: Record<string, string>,
  availablePresents: Present[],
  index: number,
  width: number,
  height: number
): boolean {
  if (availablePresents.length === index) {
    return true;
  }

  const present = availablePresents[index];
  Object.entries(grid)
    .map(([key, _]) => readCoord(key))
    .forEach(([x, y]) => {
      const transformations = getTransformationShapes(present);
      for (const transformed of transformations) {
        if (!canPresentFit(grid, transformed, x, y, width, height)) {
          continue;
        }
        const newGrid = placePresent(grid, transformed, x, y);
        if (backtrack(newGrid, availablePresents, index + 1, width, height)) {
          return true;
        }
      }
    });
  return false;
}

function canPresentFit(
  grid: Record<string, string>,
  shape: string[],
  offsetX: number,
  offsetY: number,
  width: number,
  height: number
): boolean {
  for (const coord of shape) {
    const [x, y] = readCoord(coord);
    const newX = x + offsetX;
    const newY = y + offsetY;
    if (newX < 0 || newX >= width) {
      return false;
    }
    if (newY < 0 || newY >= height) {
      return false;
    }
    if ((grid[writeCoord(newX, newY)] ?? ".") === "#") {
      return false;
    }
  }
  return true;
}

function placePresent(
  grid: Record<string, string>,
  shape: string[],
  offsetX: number,
  offsetY: number
): Record<string, string> {
  const newGrid = { ...grid };
  for (const coord of shape) {
    const [x, y] = readCoord(coord);
    const newX = x + offsetX;
    const newY = y + offsetY;
    const nextCoord = writeCoord(newX, newY);
    newGrid[nextCoord] = "#";
  }
  return newGrid;
}

function initialGrid(width: number, height: number): Record<string, string> {
  return Array.from({ length: width * height }, (_, i) =>
    writeCoord(i % width, Math.floor(i / width))
  ).reduce((acc, coord) => {
    acc[coord] = ".";
    return acc;
  }, {} as Record<string, string>);
}

export function part1(inputShapes: string[], inputRegions: string[]): number {
  const presents = parseShapes(inputShapes);
  const regions = parseRegions(inputRegions);

  return regions.map((r) => evaluateRegion(r, presents)).filter((r) => r)
    .length;
}

export function part2(inputShapes: string[], inputRegions: string[]): number {
  const input = parseShapes(inputShapes);
  // TODO: Implement part 2 solution
  return 0;
}
