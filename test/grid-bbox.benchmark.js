var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var grid = require('../src/grid-bbox.js');
var fixtures = require('./grid-box.fixture.json');

suite.add('simple polygon', function() {
  grid(fixtures.simple.polygon, fixtures.simple.cellSize);
})
.add('complex polygon', function() {
  grid(fixtures.complex.polygon, fixtures.complex.cellSize);
})
.add('simple polygon - noclip', function() {
  grid(fixtures.simple.polygon, fixtures.simple.cellSize, true);
})
.add('complex polygon - noclip', function() {
  grid(fixtures.complex.polygon, fixtures.complex.cellSize, true);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Benchmark complete');
})
.run()

/* 
* CURRENT RESULTS *
simple polygon x 955,408 ops/sec ±0.85% (85 runs sampled)
complex polygon x 140,672 ops/sec ±1.44% (86 runs sampled)
simple polygon - noclip x 3,113,815 ops/sec ±0.89% (88 runs sampled)
complex polygon - noclip x 988,976 ops/sec ±3.56% (81 runs sampled)
Benchmark complete
*/
