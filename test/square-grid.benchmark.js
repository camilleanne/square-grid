var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var grid = require('../index.js');
var fixtures = require('./square-grid.fixture.json');

var minSamples = 100;

suite.add('simple polygon', function() {
  grid(fixtures.simple.polygon, fixtures.simple.cellSize);
}, {minSamples: minSamples})
.add('complex polygon', function() {
  grid(fixtures.complex.polygon, fixtures.complex.cellSize);
}, {minSamples: minSamples})
.add('simple polygon - noclip', function() {
  grid(fixtures.simple.polygon, fixtures.simple.cellSize, true);
}, {minSamples: minSamples})
.add('complex polygon - noclip', function() {
  grid(fixtures.complex.polygon, fixtures.complex.cellSize, true);
}, {minSamples: minSamples})
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
