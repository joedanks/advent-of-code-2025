interface Point {
  x: number;
  y: number;
}

function parseInput(data: string[]): Point[] {
  return data
    .map((line) => line.split(",").map((num) => parseInt(num)))
    .map(([x, y]) => ({ x, y }));
}

export function part1(data: string[]): number {
  let maxArea = 0;
  const points = parseInput(data);
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const x = Math.abs(p1.x - p2.x) + 1;
      const y = Math.abs(p1.y - p2.y) + 1;
      const area = x * y;
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

function isPointOnSegment(point: Point, p1: Point, p2: Point): boolean {
  // Check if point is within the bounding box of the segment
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY) {
    return false;
  }

  // Check if point is collinear using cross product
  // Cross product = 0 means the point is on the line
  const crossProduct =
    (point.y - p1.y) * (p2.x - p1.x) - (point.x - p1.x) * (p2.y - p1.y);

  return crossProduct === 0;
}

function isPointInPolygon(point: Point, polygon: Point[]): boolean {
  // First check if the point is on any edge of the polygon
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (isPointOnSegment(point, polygon[j], polygon[i])) {
      return true; // Point is on the boundary
    }
  }

  // Ray casting algorithm for interior points
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

// Check if two line segments intersect
function doSegmentsIntersect(
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point
): boolean {
  // Helper to calculate orientation of ordered triplet (p, q, r)
  // Returns: 0 = collinear, 1 = clockwise, 2 = counterclockwise
  const orientation = (p: Point, q: Point, r: Point): number => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
  };

  // Check if point q lies on segment pr (assuming collinear)
  const onSegment = (p: Point, q: Point, r: Point): boolean => {
    return (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    );
  };

  const o1 = orientation(p1, p2, p3);
  const o2 = orientation(p1, p2, p4);
  const o3 = orientation(p3, p4, p1);
  const o4 = orientation(p3, p4, p2);

  // General case: segments intersect if orientations differ
  if (o1 !== o2 && o3 !== o4) return true;

  // Special cases: collinear points
  if (o1 === 0 && onSegment(p1, p3, p2)) return true;
  if (o2 === 0 && onSegment(p1, p4, p2)) return true;
  if (o3 === 0 && onSegment(p3, p1, p4)) return true;
  if (o4 === 0 && onSegment(p3, p2, p4)) return true;

  return false;
}

// Efficiently check if a rectangle is fully inside the polygon
function isRectangleFullyInPolygon(
  p1: Point,
  p2: Point,
  polygon: Point[]
): boolean {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  // Four corners of the rectangle
  const corners = [
    { x: minX, y: minY },
    { x: maxX, y: minY },
    { x: maxX, y: maxY },
    { x: minX, y: maxY },
  ];

  // Check if ALL corners are inside (or on boundary)
  const allCornersInside = corners.every((corner) =>
    isPointInPolygon(corner, polygon)
  );
  if (!allCornersInside) return false;

  // Four edges of the rectangle
  const rectEdges = [
    [corners[0], corners[1]], // Top edge
    [corners[1], corners[2]], // Right edge
    [corners[2], corners[3]], // Bottom edge
    [corners[3], corners[0]], // Left edge
  ];

  // Check if any rectangle edge intersects with any polygon edge
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const polyEdge = [polygon[j], polygon[i]];

    for (const rectEdge of rectEdges) {
      if (
        doSegmentsIntersect(rectEdge[0], rectEdge[1], polyEdge[0], polyEdge[1])
      ) {
        // Check if this is just a touching/boundary case
        const isRectPointOnPolyEdge =
          isPointOnSegment(rectEdge[0], polyEdge[0], polyEdge[1]) ||
          isPointOnSegment(rectEdge[1], polyEdge[0], polyEdge[1]);

        const isPolyPointOnRectEdge =
          isPointOnSegment(polyEdge[0], rectEdge[0], rectEdge[1]) ||
          isPointOnSegment(polyEdge[1], rectEdge[0], rectEdge[1]);

        // If it's a proper intersection (not just touching), rectangle crosses boundary
        if (!isRectPointOnPolyEdge && !isPolyPointOnRectEdge) {
          return false;
        }
      }
    }
  }

  return true;
}

export function part2(data: string[]): number {
  let maxArea = 0;
  const points = parseInput(data);
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];

      if (isRectangleFullyInPolygon(p1, p2, points)) {
        const x = Math.abs(p1.x - p2.x) + 1;
        const y = Math.abs(p1.y - p2.y) + 1;
        const area = x * y;
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
}
