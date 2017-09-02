'use strict';
var test = require('tap').test;

var makeBbox = require('../index.js').makeBbox;
var fixtures = require('./square-grid.fixture.json');

test('makes bbox - simple', function (t) {
  t.deepEqual(makeBbox(fixtures.simple.polygon, 'canvas'), fixtures.simple.expectedBbox);
  t.end();
});

test('makes bbox - complex', function (t) {
  t.deepEqual(makeBbox(fixtures.complex.polygon, 'canvas'), fixtures.complex.expectedBbox);
  t.end();
});

test('makes bbox - cartesian coordinates', function (t) {
  var fixture = [
      [-6, -5],
      [-4, -2],
      [6, -2],
      [3, 5]
    ];
  t.deepEqual(makeBbox(fixture, 'cartesian'), [ -6, -5, 6, 5 ]);
  t.end();
});
