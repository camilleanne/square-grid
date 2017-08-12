## squareGrid

creates a square grid from an arbitrary polygon. the grid can cover, or be inclusive of, the polygon.

based on [@turf/square-grid](https://github.com/Turfjs/turf/tree/master/packages/turf-square-grid) but for use with arbitrary polygons, not just bounding boxes, and in Euclidean space, not Cartesian. For a square grid useful for geo applications, go to Turf.

<img width="275" alt="screen shot 2017-08-08 at 12 18 12 pm" src="https://user-images.githubusercontent.com/3952537/29067962-1a81a3c6-7c35-11e7-8536-c382a841ed04.png"><img width="275" alt="screen shot 2017-08-08 at 12 17 42 pm" src="https://user-images.githubusercontent.com/3952537/29067963-1a9eb36c-7c35-11e7-8727-07ffed587aac.png">

<img width="275" alt="screen shot 2017-08-08 at 12 16 15 pm" src="https://user-images.githubusercontent.com/3952537/29067964-1aa7f102-7c35-11e7-8482-629c2bdf5f33.png"><img width="275" alt="screen shot 2017-08-08 at 12 16 50 pm" src="https://user-images.githubusercontent.com/3952537/29067965-1aaccc86-7c35-11e7-9007-122f478410c0.png">

**Parameters**

- `polygon`[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> array of vertices in `[[x, y],...]`

- `cellSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** width of each cell

-   `noClip` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** if true, does not remove sample grid units to fit completely within given polygon (optional, default `false`)

```
npm install square-sample-grid
```

### usage
```javascript
var grid = require('square-sample-grid');

var sampleGrid = grid([[20, 20],[60, 20],[80, 40],[10, 40]], 20, false);
//  [
//     [[60, 40],[60, 20],[40, 20],[40, 40]],
//     [[40, 40],[40, 20],[20, 20],[20, 40]]
//   ]

```

To Do:

* tests for internal functions
* performance improvements for complex polygons
* make build/browserify step for client-side
