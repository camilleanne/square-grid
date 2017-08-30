var test = require('tap').test;

var grid = require('../index.js');
var fixtures = require('./square-grid.fixture.json');

test('grid fails without correct input', function (t) {
  t.throws(function() { grid(null, null) }, new Error('polygon is required'));
  t.throws(function() { grid([[1,2], [3,4]], null) }, new Error('polygon array must have at least 3 vertices'));
  t.throws(function() { grid([[1,2], [3,4], [2,2]], null) }, new Error('cellSize is required'));
  t.throws(function() { grid([], 2) }, new Error('polygon must be an array of vertices'));
  t.throws(function() { grid([[1,2], [3,4], [2,2]], 2, 'vector') }, new Error('coordSystem must be either `canvas` || `cartesian`'));
  t.end();
});

test('grid works - simple', function (t) {
  t.deepEqual(grid(fixtures.simple.polygon, fixtures.simple.cellSize, 'canvas'), fixtures.simple.expected);
  t.end();
});

test('grid works - simple & noclip', function (t) {
  t.deepEqual(grid(fixtures.simple.polygon, fixtures.simple.cellSize, 'canvas', true), fixtures.simple.expectedNoClip);
  t.end();
});

test('grid works - complex', function (t) {
  t.deepEqual(grid(fixtures.complex.polygon, fixtures.complex.cellSize, 'canvas'), fixtures.complex.expected);
  t.end();
});

test('grid works - complex & noclip', function (t) {
  t.deepEqual(grid(fixtures.complex.polygon, fixtures.complex.cellSize, 'canvas', true), fixtures.complex.expectedNoClip);
  t.end();
});

test('grid works - cartesian, default', function (t) {
  var fixture = [
    [-4, 5],
    [-6, -2],
    [6, -2],
    [4, 5]
  ];
  t.deepEqual(grid(fixture, 4, null), [ [ [ -2, -2 ], [ -2, 2 ], [ 2, 2 ], [ 2, -2 ] ] ]);
  t.end();
});

test('grid works - cartesian', function (t) {
  var fixture = [
    [-4, 5],
    [-6, -2],
    [6, -2],
    [4, 5]
  ];
  t.deepEqual(grid(fixture, 4, 'cartesian', false), [ [ [ -2, -2 ], [ -2, 2 ], [ 2, 2 ], [ 2, -2 ] ] ]);
  t.end();
});
