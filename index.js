'use strict';

const pip = require('robust-point-in-polygon');

/**
 * This function was borrowed and modified from
 * @turf/square-grid
 * https://github.com/Turfjs/turf/tree/master/packages/turf-square-grid
 *
 * Creates a square sampling grid that fits within a given polygon.
 *
 * @name squareGrid
 * @param {Array<number>} polygon in [[vertexLat, vertexLng], ... ] format
 * @param {number} cellSize width of each cell in pixels
 * @param {boolean} noClip (optional) if false or missing squares that are not completely covered by the parent polygon are removed
 * @returns {Array<number>} grid a grid of square polygons in [[[vertexLat],[vertexLng], ... ]]
 * @example
 * var polygon = [[20,20], [60,20], [80,40], [10,40], [20,20]];
 * var cellSize = 2;
 * var noClip = false;
 *
 * var squareGrid = turf.squareGrid(polygon, cellSize, noClip);
 *
 */

module.exports = function squareGrid(polygon, cellSize, coordSystem, noClip) {
  const results = [];

  // validation
  if (!polygon) throw new Error('polygon is required');
  if (!Array.isArray(polygon) || !polygon.length) throw new Error('polygon must be an array of vertices');
  if (polygon.length < 3) throw new Error('polygon array must have at least 3 vertices');
  if (!cellSize) throw new Error('cellSize is required');
  const bbox = makeBbox(polygon, coordSystem); // Convert polygon to bbox

  const west = bbox[0];
  const south = bbox[1];
  const east = bbox[2];
  const north = bbox[3];

  // distance
  const xDistance = distance(west, east, coordSystem);
  const yDistance = distance(south, north, coordSystem);

  // rows & columns
  const columns = Math.ceil(xDistance / cellSize);
  const rows = Math.ceil(yDistance / cellSize);

  // columns | width | x
  const xFraction = cellSize / xDistance;
  const cellWidth = xFraction * (east - west);

  // rows | height | y
  const yFraction = cellSize / yDistance;
  const cellHeight = yFraction * (north - south);

  // iterate over columns & rows
  var currentX = west;
  for (var column = 0; column < columns; column++) {
    var currentY = south;
    for (var row = 0; row < rows; row++) {
      const cellPoly = [
        [currentX, currentY],
        [currentX, currentY + cellHeight],
        [currentX + cellWidth, currentY + cellHeight],
        [currentX + cellWidth, currentY]
      ];
      results.push(cellPoly);

      currentY += cellHeight;
    }
    currentX += cellWidth;
  }

  if (noClip) return results 
  return calculateIntersections(polygon, results);
};

function distance (from, to, coordSystem) {
  if (coordSystem === 'canvas') return from - to;
  else return to - from;
}

function makeBbox (array, coordSystem) {
  let bbox = [];
  if (coordSystem === 'canvas') {
    bbox = [-Infinity, -Infinity, Infinity, Infinity];
    for (var i = 0; i < array.length; i ++) {
      const coord = array[i];
      if (bbox[0] < coord[0]) bbox[0] = coord[0];
      if (bbox[1] < coord[1]) bbox[1] = coord[1];
      if (bbox[2] > coord[0]) bbox[2] = coord[0];
      if (bbox[3] > coord[1]) bbox[3] = coord[1];
    }
  } else {
    bbox = [Infinity, Infinity, -Infinity, -Infinity];
    for (var i = 0; i < array.length; i ++) {
      const coord = array[i];
      if (bbox[0] > coord[0]) bbox[0] = coord[0];
      if (bbox[1] > coord[1]) bbox[1] = coord[1];
      if (bbox[2] < coord[0]) bbox[2] = coord[0];
      if (bbox[3] < coord[1]) bbox[3] = coord[1];
    }
  }
  return bbox;
};

function calculateIntersections(polygon, array) {
  // throw away grid cells that intersect
  // with the parent polygon
  const insideArray = [];
  const boxes = array.length;
  for (var box = 0; box < boxes; box ++) {
    // iterate through point of box
    let keep = true;
    const corners = array[box].length;
    for (var corner = 0; corner < corners; corner ++) {
      if (pip(polygon, array[box][corner]) === 1) {
        keep = false;
        break;
      }
    }
    if (keep) insideArray.push(array[box]);
  }
  return insideArray;
}

module.exports.makeBbox = makeBbox;
module.exports.distance = distance;
module.exports.calculateIntersections = calculateIntersections;
