interface Node {
  name: string;
  connections: Node[];
}

function parseInput(data: string[]): Record<string, Node> {
  const nodes: Record<string, Node> = {};
  data.forEach((line: string) => {
    const [name, rest] = line.split(": ");
    let node = nodes[name];
    if (!node) {
      node = {
        name,
        connections: [],
      };
    }
    nodes[name] = node;
    rest.split(" ").forEach((connection: string) => {
      let existing = nodes[connection];
      if (!existing) {
        existing = {
          name: connection,
          connections: [],
        };
        nodes[connection] = existing;
      }
      node.connections.push(existing);
    });
  });
  return nodes;
}

// Count paths from current to target that visit specific required nodes
function countPathsWithRequired(
  current: Node,
  target: Node,
  visited: Set<string>,
  requiredNodes: Set<string>,
  visitedRequired: Set<string>,
  memo: Map<string, number>
): number {
  if (current.name === target.name) {
    // Only count this path if we've visited all required nodes
    return requiredNodes.size === visitedRequired.size ? 1 : 0;
  }

  // Create a cache key - only use current node and which required nodes we've visited
  const requiredKey = Array.from(visitedRequired).sort().join(",");
  const cacheKey = `${current.name}:${requiredKey}`;

  if (memo.has(cacheKey)) {
    return memo.get(cacheKey)!;
  }

  let totalPaths = 0;
  for (const connection of current.connections) {
    if (!visited.has(connection.name)) {
      visited.add(connection.name);

      // Check if this connection is a required node
      const newVisitedRequired = new Set(visitedRequired);
      if (requiredNodes.has(connection.name)) {
        newVisitedRequired.add(connection.name);
      }

      totalPaths += countPathsWithRequired(
        connection,
        target,
        visited,
        requiredNodes,
        newVisitedRequired,
        memo
      );

      visited.delete(connection.name);
    }
  }

  memo.set(cacheKey, totalPaths);
  return totalPaths;
}

export function part1(data: string[]): number {
  const nodes = parseInput(data);
  const you = nodes["you"];
  const out = nodes["out"];
  const visited = new Set<string>([you.name]);
  const memo = new Map<string, number>();
  const requiredNodes = new Set<string>();
  const visitedRequired = new Set<string>();

  return countPathsWithRequired(
    you,
    out,
    visited,
    requiredNodes,
    visitedRequired,
    memo
  );
}

export function part2(data: string[]): number {
  const nodes = parseInput(data);
  const svr = nodes["svr"];
  const dac = nodes["dac"];
  const fft = nodes["fft"];
  const out = nodes["out"];

  // Count paths from svr to out that visit both dac and fft
  const visited = new Set<string>([svr.name]);
  const memo = new Map<string, number>();
  const requiredNodes = new Set<string>(["dac", "fft"]);
  const visitedRequired = new Set<string>();

  return countPathsWithRequired(
    svr,
    out,
    visited,
    requiredNodes,
    visitedRequired,
    memo
  );
}
