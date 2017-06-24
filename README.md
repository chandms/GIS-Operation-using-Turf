# GIS operation using TURF

## Installation

If you have `node` installed, you also have a command called `npm` installed:
this is what you use to download extra software for `node`. This project has
some preset requirements, which are stored in [package.json](package.json),
so if you open a terminal in the same folder as this project and run the command

```sh
$ npm install
```

Then the `npm` command with automatically find, download, and install `turf`
to this directory.

Next, you should open `index.js`, either locally or
[on GitHub](index.js), read through the code comments to understand what it does.

When you feel comfortable with your understanding of the process, run it:

```sh
$ node index.js
```

This tells `node` to run the code in `index.js`. That should quickly report:

```sh
$ node index.js
{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-82.574787,35.594087],[-82.574787,35.615581],[-82.545261,35.615581],[-82.545261,35.602602],[-82.52964,35.602602],[-82.52964,35.585153],[-82.560024,35.585153],[-82.560024,35.594087],[-82.574787,35.594087]]]},"properties":{"fill":"#0f0"}}
Comparing  1.geojson and 5.geojson
Similarity Percent:19.809459799644888%
```

Only the union and intersection percentage calculation is done as of now.
