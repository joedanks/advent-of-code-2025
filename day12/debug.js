const testShapes = [
  "0:",
  "###",
  "##.",
  "##.",
  "",
  "4:",
  "###",
  "#..",
  "###",
  ""
];

const testRegions = [
  "4x4: 0 0 0 0 2 0"
];

function writeCoord(x, y) {
  return `${x},${y}`;
}

function parseShapes(data) {
  const presents = [];
  let tempPresent = null;
  let y = -1;
  
  for (const line of data) {
    if (line.includes(":")) {
      // Save previous present if exists
      if (tempPresent) {
        tempPresent.totalArea = tempPresent.shape.length;
        presents.push(tempPresent);
      }
      tempPresent = {
        id: parseInt(line.split(":")[0]),
        shape: [],
        totalArea: 0,
      };
      y = -1;
    } else if (line === "") {
      // Empty line - could be between presents or at end
      if (tempPresent && tempPresent.shape.length > 0) {
        tempPresent.totalArea = tempPresent.shape.length;
        presents.push(tempPresent);
        tempPresent = null;
      }
    } else {
      y++;
      line.split("").forEach((char, index) => {
        if (char === "#") {
          tempPresent.shape.push(writeCoord(index, y));
        }
      });
    }
  }
  
  // Don't forget the last present if no trailing empty line
  if (tempPresent && tempPresent.shape.length > 0) {
    tempPresent.totalArea = tempPresent.shape.length;
    presents.push(tempPresent);
  }
  
  return Object.fromEntries(presents.map((present) => [present.id, present]));
}

function parseRegions(data) {
  return data.map((line) => {
    const requiredPresents = {};
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

const presents = parseShapes(testShapes);
const regions = parseRegions(testRegions);

console.log("Presents:", JSON.stringify(presents, null, 2));
console.log("Regions:", JSON.stringify(regions, null, 2));
