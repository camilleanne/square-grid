var test = require('tap').test;

var grid = require('../src/grid-bbox.js');
var fixtures = require('./grid-box.fixture.json');

test('grid fails without correct input', function (t) {
  t.throws(function() { grid(null, null) }, new Error('polygon is required'));
  t.throws(function() { grid([[1,2], [3,4], [2,2]], null) }, new Error('cellSize is required'));
  t.throws(function() { grid([], 2) }, new Error('polygon must be an array of vertices'));
  t.end();
});

test('grid works - simple', function (t) {
  t.deepEqual(grid(fixtures.simple.polygon, fixtures.simple.cellSize), fixtures.simple.expected);
  t.end();
});

test('grid works - simple & noclip', function (t) {
  t.deepEqual(grid(fixtures.simple.polygon, fixtures.simple.cellSize, true), fixtures.simple.expectedNoClip);
  t.end();
});

test('grid works - complex', function (t) {
  t.deepEqual(grid(fixtures.complex.polygon, fixtures.complex.cellSize), fixtures.complex.expected);
  t.end();
});

test('grid works - complex & noclip', function (t) {
  t.deepEqual(grid(fixtures.complex.polygon, fixtures.complex.cellSize, true), fixtures.complex.expectedNoClip);
  t.end();
});
