var test = require('tap').test;

var squareGrid = require('../index.js');
var returnInterior = squareGrid.returnInterior;
var fixtures = require('./square-grid.fixture.json');

test('return interior - simple', function (t) {
  var withoutClip = squareGrid(fixtures.simple.polygon, fixtures.simple.cellSize, 'canvas', true);
  t.deepEqual(returnInterior(fixtures.simple.polygon, withoutClip), fixtures.simple.expected);
  t.end();
});

test('return interior - complex', function (t) {
  var withoutClip = squareGrid(fixtures.complex.polygon, fixtures.complex.cellSize, 'canvas', true);
  t.deepEqual(returnInterior(fixtures.complex.polygon, withoutClip), fixtures.complex.expected);
  t.end();
});

test('return interior - negative coordinates', function (t) {
  var fixture = [
    [-6, -5],
    [-4, -2],
    [6, -2],
    [3, 5]
  ];
  var expected = [
    [[0, -1], [0, 1], [2, 1], [2, -1]],
    [[ 2, -1], [ 2, 1], [ 4, 1], [ 4, -1]]
  ];
  var withoutClip = squareGrid(fixture, 2, 'cartesian', true);
  t.deepEqual(returnInterior(fixture, withoutClip), expected);
  t.end();
});
