var jsts = require('jsts');

var fs = require('fs');
var fileList = [];

// Read Geojson files in Working Directory and fileList
const testFolder = '../sync/';

var turf = require('@turf/turf');
var geojsonArea = require('@mapbox/geojson-area');


fs.readdir(testFolder, (err, files) => {
  
	// Find geojson files
	files.forEach(file => {
	if(file.endsWith('.geojson')) {
		fileList.push(file);
	}
	});

	// Compare each of the geojson files
	for (var i = 0; i < fileList.length; i++) 
	{
		for (var j = i + 1; j < fileList.length; j++) 
		{
			var poly1 = JSON.parse(fs.readFileSync(testFolder + '/' + fileList[i], 'utf8'));
			var poly2 = JSON.parse(fs.readFileSync(testFolder + '/' + fileList[j], 'utf8'));
			var intersection = turf.intersect(poly1, poly2);

			// Intersection of two GIS Polygons
			var area_intersection = geojsonArea.geometry(intersection.geometry);
			var area_poly1        = geojsonArea.geometry(poly1.geometry);

			// Calculating percentage of overlap of two polygons
			var percent_poly1_covered_by_poly2 = (area_intersection / area_poly1)*100;
			console.warn("Comparing  " + fileList[i] + " and " + fileList[j]);
			console.warn("Similarity Percent:" + percent_poly1_covered_by_poly2 + "%\n");

			// Union of two GIS Polygons
			var union = turf.union(poly1,poly2);
			console.warn(JSON.stringify(union));

		}	
	}
})