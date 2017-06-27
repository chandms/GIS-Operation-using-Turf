// Constants
var minIntersectPerc = 30;
var minSentenceSimilarity = 0.3;

var jsts = require('jsts');

var fs = require('fs');
var fileList = [];

// Read Geojson files in Working Directory and fileList
const testFolder = '../sync/';

var turf = require('@turf/turf');
var geojsonArea = require('@mapbox/geojson-area');

var natural = require('natural');

function calcIntersectPerc(poly1,intersection)
{
	// Intersection of two GIS Polygons
	var area_intersection = geojsonArea.geometry(intersection.geometry);
	var area_poly1        = geojsonArea.geometry(poly1.geometry);

	// Calculating percentage of overlap of two polygons
	return ((area_intersection / area_poly1)*100);
}
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

			// Comparing two text fields using JaroWinklerDistance
			console.log("Comparing '" + poly1['properties']['TEXT'] + "' and '" + poly2['properties']['TEXT'] + "'");
			var sentenceSimilarity = natural.JaroWinklerDistance(poly1['properties']['TEXT'],poly2['properties']['TEXT']);

			if (sentenceSimilarity > minSentenceSimilarity)
			{	
				console.warn("sentenceSimilarity " + sentenceSimilarity );
					
				var percentCovered = calcIntersectPerc(poly1, intersection);
				
				console.warn("Comparing  " + fileList[i] + " and " + fileList[j]);
				console.warn("Intersection Percent:" + percentCovered + "%\n");

				switch (true) {
				    case (percentCovered < 30):
				    	// Keep the maximum covered area
				    	console.warn((turf.area(poly1) > turf.area(poly2)) ? JSON.stringify(poly1):JSON.stringify(poly2));
				        break;
				    case (percentCovered > 30 && percentCovered < 70):
				    	// Do something not yet decided
				        break;
				    case (percentCovered > 70 && percentCovered < 100):
				    	// Union of two similar polygons
				    	console.warn(JSON.stringify(turf.union(poly1,poly2)));
				        break;
				    default:
				        break;
				}
				// Union of two GIS Polygons
				// if(percent_poly1_covered_by_poly2 > minIntersectPerc)
				// var union = turf.union(poly1,poly2);
				// console.warn(JSON.stringify(union));
			}
			else
			{
				console.warn("sentenceSimilarity " + sentenceSimilarity +  " below threshold " + minSentenceSimilarity);
			}

		}	
	}
})