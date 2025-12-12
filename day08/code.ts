interface Junction {
  x: number;
  y: number;
  z: number;
}

function toKey(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function fromKey(key: string): [number, number, number] {
  const [x, y, z] = key.split(",").map((s) => parseInt(s));
  return [x, y, z];
}

function parseInput(data: string[]): Junction[] {
  return data.map((line) => {
    const [x, y, z] = fromKey(line);
    return { x, y, z };
  });
}

function distance(a: Junction, b: Junction): number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const dz = Math.abs(a.z - b.z);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
}

interface JunctionDistance {
  a: string;
  b: string;
  distance: number;
}

function computeJunctionDistances(junctions: Junction[]): JunctionDistance[] {
  const distances: JunctionDistance[] = [];
  for (let i = 0; i < junctions.length - 1; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      distances.push({
        a: toKey(junctions[i].x, junctions[i].y, junctions[i].z),
        b: toKey(junctions[j].x, junctions[j].y, junctions[j].z),
        distance: distance(junctions[i], junctions[j]),
      });
    }
  }

  return distances;
}

interface Circuit {
  junctions: Set<string>;
}

export function part1(data: string[], connectionsToMake: number): number {
  const junctions = parseInput(data);
  const distances = computeJunctionDistances(junctions);
  const connections: JunctionDistance[] = [];
  const circuits: Circuit[] = [];

  for (let i = 0; i < connectionsToMake; i++) {
    const shortestDistance = distances.reduce((acc, next) => {
      if (next.distance < acc.distance) {
        return next;
      }
      return acc;
    });
    connections.push(shortestDistance);
    distances.splice(distances.indexOf(shortestDistance), 1);
    const existing = circuits.filter(
      (c) =>
        c.junctions.has(shortestDistance.a) ||
        c.junctions.has(shortestDistance.b)
    );
    if (existing.length === 1) {
      existing[0].junctions.add(shortestDistance.a);
      existing[0].junctions.add(shortestDistance.b);
    } else if (existing.length === 2) {
      circuits.splice(circuits.indexOf(existing[0]), 1);
      circuits.splice(circuits.indexOf(existing[1]), 1);
      const mergedJunctions = [
        ...existing[0].junctions,
        ...existing[1].junctions,
      ].reduce((acc, next) => acc.add(next), new Set<string>());
      circuits.push({
        junctions: mergedJunctions,
      });
    } else {
      circuits.push({
        junctions: new Set<string>()
          .add(shortestDistance.a)
          .add(shortestDistance.b),
      });
    }
  }

  circuits.sort((a, b) => b.junctions.size - a.junctions.size);
  return circuits
    .slice(0, 3)
    .map((c) => c.junctions.size)
    .reduce((acc, next) => acc * next, 1);
}

export function part2(data: string[]): number {
  const junctions = parseInput(data);
  const distances = computeJunctionDistances(junctions);
  const connections: JunctionDistance[] = [];
  const circuits: Circuit[] = [];
  let finalConnection: JunctionDistance;

  do {
    const shortestDistance = distances.reduce((acc, next) => {
      if (next.distance < acc.distance) {
        return next;
      }
      return acc;
    });
    connections.push(shortestDistance);
    distances.splice(distances.indexOf(shortestDistance), 1);
    const existing = circuits.filter(
      (c) =>
        c.junctions.has(shortestDistance.a) ||
        c.junctions.has(shortestDistance.b)
    );
    if (existing.length === 1) {
      existing[0].junctions.add(shortestDistance.a);
      existing[0].junctions.add(shortestDistance.b);
    } else if (existing.length === 2) {
      circuits.splice(circuits.indexOf(existing[0]), 1);
      circuits.splice(circuits.indexOf(existing[1]), 1);
      const mergedJunctions = [
        ...existing[0].junctions,
        ...existing[1].junctions,
      ].reduce((acc, next) => acc.add(next), new Set<string>());
      circuits.push({
        junctions: mergedJunctions,
      });
    } else {
      circuits.push({
        junctions: new Set<string>()
          .add(shortestDistance.a)
          .add(shortestDistance.b),
      });
    }
    finalConnection = shortestDistance;
  } while (circuits[0].junctions.size < junctions.length);

  return fromKey(finalConnection.a)[0] * fromKey(finalConnection.b)[0];
}
