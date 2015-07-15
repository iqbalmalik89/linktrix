var map;
			
			// svg path for target icon
			var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
			// svg path for plane icon
			var planeSVG = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";
			
			PCharts.ready(function() {
			    map = new PCharts.AmMap();
			    map.pathToImages = "plugins/PCharts/map/images/"; 
			    //map.panEventsEnabled = true; // this line enables pinch-zooming and dragging on touch devices
			
			    var dataProvider = {
			        mapVar: PCharts.maps.worldLow
			    };
			
			    map.areasSettings = {
			        unlistedAreasColor: "#FFCC00"
			    };
			
			    map.imagesSettings = {
			        color: "#CC0000",
			        rollOverColor: "#CC0000",
			        selectedColor: "#000000"
			    };
			
			    map.linesSettings = {
			        color: "#CC0000",
			        alpha: 0.4
			    };
			
			    // LONDON
			    var london = {
			        id: "london",
			        color: "#000000",
			        svgPath: targetSVG,
			        title: "London",
			        latitude: 51.5002,
			        longitude: -0.1262,
			        scale: 1.5,
			        zoomLevel: 2.74,
			        zoomLongitude: -20.1341,
			        zoomLatitude: 49.1712,
			
			        lines: [
			            {
			            latitudes: [51.5002, 50.4422],
			            longitudes: [-0.1262, 30.5367]},
			        {
			            latitudes: [51.5002, 46.9480],
			            longitudes: [-0.1262, 7.4481]},
			        {
			            latitudes: [51.5002, 59.3328],
			            longitudes: [-0.1262, 18.0645]},
			        {
			            latitudes: [51.5002, 40.4167],
			            longitudes: [-0.1262, -3.7033]},
			        {
			            latitudes: [51.5002, 46.0514],
			            longitudes: [-0.1262, 14.5060]},
			        {
			            latitudes: [51.5002, 48.2116],
			            longitudes: [-0.1262, 17.1547]},
			        {
			            latitudes: [51.5002, 44.8048],
			            longitudes: [-0.1262, 20.4781]},
			        {
			            latitudes: [51.5002, 55.7558],
			            longitudes: [-0.1262, 37.6176]},
			        {
			            latitudes: [51.5002, 38.7072],
			            longitudes: [-0.1262, -9.1355]},
			        {
			            latitudes: [51.5002, 54.6896],
			            longitudes: [-0.1262, 25.2799]},
			        {
			            latitudes: [51.5002, 64.1353],
			            longitudes: [-0.1262, -21.8952]},
			        {
			            latitudes: [51.5002, 40.4300],
			            longitudes: [-0.1262, -74.0000]}
			        ],
			
			        images: [{
			            label: "Flights from London",
			            svgPath: planeSVG,
			            left: 100,
			            top: 45,
			            labelShiftY:5,
			            color: "#CC0000",
			            labelColor: "#CC0000",
			            labelRollOverColor: "#CC0000",
			            labelFontSize: 20},
			        {
			            label: "show flights from Vilnius",
			            left: 106,
			            top: 70,
			            labelColor: "#000000",
			            labelRollOverColor: "#CC0000",
			            labelFontSize: 11,
			            linkToObject: "vilnius"}]
			    };
			
			
			    // VILNIUS
			    var vilnius = {
			        id: "vilnius",
			        color: "#000000",
			        svgPath: targetSVG,
			        title: "Vilnius",
			        latitude: 54.6896,
			        longitude: 25.2799,
			        scale: 1.5,
			        zoomLevel: 4.92,
			        zoomLongitude: 15.4492,
			        zoomLatitude: 50.2631,
			
			        lines: [{
			            latitudes: [54.6896, 50.8371],
			            longitudes: [25.2799, 4.3676]},
			        {
			            latitudes: [54.6896, 59.9138],
			            longitudes: [25.2799, 10.7387]},
			        {
			            latitudes: [54.6896, 40.4167],
			            longitudes: [25.2799, -3.7033]},
			        {
			            latitudes: [54.6896, 50.0878],
			            longitudes: [25.2799, 14.4205]},
			        {
			            latitudes: [54.6896, 48.2116],
			            longitudes: [25.2799, 17.1547]},
			        {
			            latitudes: [54.6896, 44.8048],
			            longitudes: [25.2799, 20.4781]},
			        {
			            latitudes: [54.6896, 55.7558],
			            longitudes: [25.2799, 37.6176]},
			        {
			            latitudes: [54.6896, 37.9792],
			            longitudes: [25.2799, 23.7166]},
			        {
			            latitudes: [54.6896, 54.6896],
			            longitudes: [25.2799, 25.2799]},
			        {
			            latitudes: [54.6896, 51.5002],
			            longitudes: [25.2799, -0.1262]},
			        {
			            latitudes: [54.6896, 53.3441],
			            longitudes: [25.2799, -6.2675]}],
			
			        images: [{
			            label: "Flights from Vilnius",
			            svgPath: planeSVG,  
			            left: 100,
			            top: 45,
			            labelShiftY:5,
			            color: "#CC0000",
			            labelColor: "#CC0000",
			            labelRollOverColor: "#CC0000",
			            labelFontSize: 20},
			        {
			            label: "show flights from London",
			            left: 106,
			            top: 70,
			            labelColor: "#000000",
			            labelRollOverColor: "#CC0000",
			            labelFontSize: 11,
			            linkToObject: "london"}]
			    };
			
			    // cities
			    var cities = [
			        london,
			        vilnius,
			    {
			        svgPath: targetSVG,
			        title: "Brussels",
			        latitude: 50.8371,
			        longitude: 4.3676},
			    {
			        svgPath: targetSVG,
			        title: "Prague",
			        latitude: 50.0878,
			        longitude: 14.4205},
			    {
			        svgPath: targetSVG,
			        title: "Athens",
			        latitude: 37.9792,
			        longitude: 23.7166},
			    {
			        svgPath: targetSVG,
			        title: "Reykjavik",
			        latitude: 64.1353,
			        longitude: -21.8952},
			    {
			        svgPath: targetSVG,
			        title: "Dublin",
			        latitude: 53.3441,
			        longitude: -6.2675},
			    {
			        svgPath: targetSVG,
			        title: "Oslo",
			        latitude: 59.9138,
			        longitude: 10.7387},
			    {
			        svgPath: targetSVG,
			        title: "Lisbon",
			        latitude: 38.7072,
			        longitude: -9.1355},
			    {
			        svgPath: targetSVG,
			        title: "Moscow",
			        latitude: 55.7558,
			        longitude: 37.6176},
			    {
			        svgPath: targetSVG,
			        title: "Belgrade",
			        latitude: 44.8048,
			        longitude: 20.4781},
			    {
			        svgPath: targetSVG,
			        title: "Bratislava",
			        latitude: 48.2116,
			        longitude: 17.1547},
			    {
			        svgPath: targetSVG,
			        title: "Ljubljana",
			        latitude: 46.0514,
			        longitude: 14.5060},
			    {
			        svgPath: targetSVG,
			        title: "Madrid",
			        latitude: 40.4167,
			        longitude: -3.7033},
			    {
			        svgPath: targetSVG,
			        title: "Stockholm",
			        latitude: 59.3328,
			        longitude: 18.0645},
			    {
			        svgPath: targetSVG,
			        title: "Bern",
			        latitude: 46.9480,
			        longitude: 7.4481},
			    {
			        svgPath: targetSVG,
			        title: "Kiev",
			        latitude: 50.4422,
			        longitude: 30.5367},
			    {
			        svgPath: targetSVG,
			        title: "Paris",
			        latitude: 48.8567,
			        longitude: 2.3510},
			    {
			        svgPath: targetSVG,
			        title: "New York",
			        latitude: 40.43,
			        longitude: -74}];
			
			
			    dataProvider.linkToObject = london;
			    dataProvider.images = cities;
			    map.dataProvider = dataProvider;
				map.backgroundZoomsToTop = true;
				map.linesAboveImages = true;
			    map.write("mapdiv1");
			
			});
















/*mapdiv2*/


// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

var map = PCharts.makeChart("mapdiv2", {
	type: "map",
    "theme": "none",
     pathToImages: "plugins/PCharts/map/images/",

	imagesSettings: {
		rollOverColor: "#089282",
		rollOverScale: 3,
		selectedScale: 3,
		selectedColor: "#089282",
color:"#13564e"
	},

zoomControl:{buttonFillColor:"#15A892"},

areasSettings:{unlistedAreasColor:"#15A892"},

	dataProvider: {
		map: "worldLow",
		images: [{
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Vienna",
			latitude: 48.2092,
			longitude: 16.3728
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Minsk",
			latitude: 53.9678,
			longitude: 27.5766
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Brussels",
			latitude: 50.8371,
			longitude: 4.3676
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Sarajevo",
			latitude: 43.8608,
			longitude: 18.4214
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Sofia",
			latitude: 42.7105,
			longitude: 23.3238
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Zagreb",
			latitude: 45.8150,
			longitude: 15.9785
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Pristina",
			latitude: 42.666667,
			longitude: 21.166667
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Prague",
			latitude: 50.0878,
			longitude: 14.4205
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Copenhagen",
			latitude: 55.6763,
			longitude: 12.5681
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Tallinn",
			latitude: 59.4389,
			longitude: 24.7545
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Helsinki",
			latitude: 60.1699,
			longitude: 24.9384
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Paris",
			latitude: 48.8567,
			longitude: 2.3510
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Berlin",
			latitude: 52.5235,
			longitude: 13.4115
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Athens",
			latitude: 37.9792,
			longitude: 23.7166
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Budapest",
			latitude: 47.4984,
			longitude: 19.0408
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Reykjavik",
			latitude: 64.1353,
			longitude: -21.8952
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dublin",
			latitude: 53.3441,
			longitude: -6.2675
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Rome",
			latitude: 41.8955,
			longitude: 12.4823
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Riga",
			latitude: 56.9465,
			longitude: 24.1049
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Vaduz",
			latitude: 47.1411,
			longitude: 9.5215
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Vilnius",
			latitude: 54.6896,
			longitude: 25.2799
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Luxembourg",
			latitude: 49.6100,
			longitude: 6.1296
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Skopje",
			latitude: 42.0024,
			longitude: 21.4361
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Valletta",
			latitude: 35.9042,
			longitude: 14.5189
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Chisinau",
			latitude: 47.0167,
			longitude: 28.8497
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Monaco",
			latitude: 43.7325,
			longitude: 7.4189
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Podgorica",
			latitude: 42.4602,
			longitude: 19.2595
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Amsterdam",
			latitude: 52.3738,
			longitude: 4.8910
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Oslo",
			latitude: 59.9138,
			longitude: 10.7387
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Warsaw",
			latitude: 52.2297,
			longitude: 21.0122
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Lisbon",
			latitude: 38.7072,
			longitude: -9.1355
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bucharest",
			latitude: 44.4479,
			longitude: 26.0979
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Moscow",
			latitude: 55.7558,
			longitude: 37.6176
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "San Marino",
			latitude: 43.9424,
			longitude: 12.4578
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Belgrade",
			latitude: 44.8048,
			longitude: 20.4781
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bratislava",
			latitude: 48.2116,
			longitude: 17.1547
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ljubljana",
			latitude: 46.0514,
			longitude: 14.5060
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Madrid",
			latitude: 40.4167,
			longitude: -3.7033
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Stockholm",
			latitude: 59.3328,
			longitude: 18.0645
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bern",
			latitude: 46.9480,
			longitude: 7.4481
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kiev",
			latitude: 50.4422,
			longitude: 30.5367
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "London",
			latitude: 51.5002,
			longitude: -0.1262
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Gibraltar",
			latitude: 36.1377,
			longitude: -5.3453
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Saint Peter Port",
			latitude: 49.4660,
			longitude: -2.5522
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Douglas",
			latitude: 54.1670,
			longitude: -4.4821
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Saint Helier",
			latitude: 49.1919,
			longitude: -2.1071
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Longyearbyen",
			latitude: 78.2186,
			longitude: 15.6488
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kabul",
			latitude: 34.5155,
			longitude: 69.1952
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Yerevan",
			latitude: 40.1596,
			longitude: 44.5090
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Baku",
			latitude: 40.3834,
			longitude: 49.8932
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Manama",
			latitude: 26.1921,
			longitude: 50.5354
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dhaka",
			latitude: 23.7106,
			longitude: 90.3978
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Thimphu",
			latitude: 27.4405,
			longitude: 89.6730
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bandar Seri Begawan",
			latitude: 4.9431,
			longitude: 114.9425
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Phnom Penh",
			latitude: 11.5434,
			longitude: 104.8984
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Peking",
			latitude: 39.9056,
			longitude: 116.3958
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Nicosia",
			latitude: 35.1676,
			longitude: 33.3736
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "T'bilisi",
			latitude: 41.7010,
			longitude: 44.7930
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "New Delhi",
			latitude: 28.6353,
			longitude: 77.2250
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Jakarta",
			latitude: -6.1862,
			longitude: 106.8063
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Teheran",
			latitude: 35.7061,
			longitude: 51.4358
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Baghdad",
			latitude: 33.3157,
			longitude: 44.3922
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Jerusalem",
			latitude: 31.7857,
			longitude: 35.2007
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Tokyo",
			latitude: 35.6785,
			longitude: 139.6823
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Amman",
			latitude: 31.9394,
			longitude: 35.9349
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Astana",
			latitude: 51.1796,
			longitude: 71.4475
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kuwait",
			latitude: 29.3721,
			longitude: 47.9824
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bishkek",
			latitude: 42.8679,
			longitude: 74.5984
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Vientiane",
			latitude: 17.9689,
			longitude: 102.6137
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Beyrouth / Beirut",
			latitude: 33.8872,
			longitude: 35.5134
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kuala Lumpur",
			latitude: 3.1502,
			longitude: 101.7077
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ulan Bator",
			latitude: 47.9138,
			longitude: 106.9220
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Pyinmana",
			latitude: 19.7378,
			longitude: 96.2083
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kathmandu",
			latitude: 27.7058,
			longitude: 85.3157
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Muscat",
			latitude: 23.6086,
			longitude: 58.5922
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Islamabad",
			latitude: 33.6751,
			longitude: 73.0946
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Manila",
			latitude: 14.5790,
			longitude: 120.9726
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Doha",
			latitude: 25.2948,
			longitude: 51.5082
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Riyadh",
			latitude: 24.6748,
			longitude: 46.6977
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Singapore",
			latitude: 1.2894,
			longitude: 103.8500
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Seoul",
			latitude: 37.5139,
			longitude: 126.9828
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Colombo",
			latitude: 6.9155,
			longitude: 79.8572
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Damascus",
			latitude: 33.5158,
			longitude: 36.2939
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Taipei",
			latitude: 25.0338,
			longitude: 121.5645
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dushanbe",
			latitude: 38.5737,
			longitude: 68.7738
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bangkok",
			latitude: 13.7573,
			longitude: 100.5020
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dili",
			latitude: -8.5662,
			longitude: 125.5880
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ankara",
			latitude: 39.9439,
			longitude: 32.8560
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ashgabat",
			latitude: 37.9509,
			longitude: 58.3794
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Abu Dhabi",
			latitude: 24.4764,
			longitude: 54.3705
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Tashkent",
			latitude: 41.3193,
			longitude: 69.2481
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Hanoi",
			latitude: 21.0341,
			longitude: 105.8372
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Sanaa",
			latitude: 15.3556,
			longitude: 44.2081
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Buenos Aires",
			latitude: -34.6118,
			longitude: -58.4173
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bridgetown",
			latitude: 13.0935,
			longitude: -59.6105
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Belmopan",
			latitude: 17.2534,
			longitude: -88.7713
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Sucre",
			latitude: -19.0421,
			longitude: -65.2559
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Brasilia",
			latitude: -15.7801,
			longitude: -47.9292
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ottawa",
			latitude: 45.4235,
			longitude: -75.6979
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Santiago",
			latitude: -33.4691,
			longitude: -70.6420
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bogota",
			latitude: 4.6473,
			longitude: -74.0962
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "San Jose",
			latitude: 9.9402,
			longitude: -84.1002
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Havana",
			latitude: 23.1333,
			longitude: -82.3667
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Roseau",
			latitude: 15.2976,
			longitude: -61.3900
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Santo Domingo",
			latitude: 18.4790,
			longitude: -69.8908
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Quito",
			latitude: -0.2295,
			longitude: -78.5243
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "San Salvador",
			latitude: 13.7034,
			longitude: -89.2073
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Guatemala",
			latitude: 14.6248,
			longitude: -90.5328
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ciudad de Mexico",
			latitude: 19.4271,
			longitude: -99.1276
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Managua",
			latitude: 12.1475,
			longitude: -86.2734
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Panama",
			latitude: 8.9943,
			longitude: -79.5188
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Asuncion",
			latitude: -25.3005,
			longitude: -57.6362
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Lima",
			latitude: -12.0931,
			longitude: -77.0465
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Castries",
			latitude: 13.9972,
			longitude: -60.0018
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Paramaribo",
			latitude: 5.8232,
			longitude: -55.1679
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Washington",
			latitude: 38.8921,
			longitude: -77.0241
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Montevideo",
			latitude: -34.8941,
			longitude: -56.0675
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Caracas",
			latitude: 10.4961,
			longitude: -66.8983
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Oranjestad",
			latitude: 12.5246,
			longitude: -70.0265
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Cayenne",
			latitude: 4.9346,
			longitude: -52.3303
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Plymouth",
			latitude: 16.6802,
			longitude: -62.2014
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "San Juan",
			latitude: 18.4500,
			longitude: -66.0667
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Algiers",
			latitude: 36.7755,
			longitude: 3.0597
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Luanda",
			latitude: -8.8159,
			longitude: 13.2306
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Porto-Novo",
			latitude: 6.4779,
			longitude: 2.6323
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Gaborone",
			latitude: -24.6570,
			longitude: 25.9089
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Ouagadougou",
			latitude: 12.3569,
			longitude: -1.5352
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bujumbura",
			latitude: -3.3818,
			longitude: 29.3622
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Yaounde",
			latitude: 3.8612,
			longitude: 11.5217
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bangui",
			latitude: 4.3621,
			longitude: 18.5873
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Brazzaville",
			latitude: -4.2767,
			longitude: 15.2662
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kinshasa",
			latitude: -4.3369,
			longitude: 15.3271
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Yamoussoukro",
			latitude: 6.8067,
			longitude: -5.2728
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Djibouti",
			latitude: 11.5806,
			longitude: 43.1425
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Cairo",
			latitude: 30.0571,
			longitude: 31.2272
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Asmara",
			latitude: 15.3315,
			longitude: 38.9183
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Addis Abeba",
			latitude: 9.0084,
			longitude: 38.7575
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Libreville",
			latitude: 0.3858,
			longitude: 9.4496
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Banjul",
			latitude: 13.4399,
			longitude: -16.6775
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Accra",
			latitude: 5.5401,
			longitude: -0.2074
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Conakry",
			latitude: 9.5370,
			longitude: -13.6785
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bissau",
			latitude: 11.8598,
			longitude: -15.5875
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Nairobi",
			latitude: -1.2762,
			longitude: 36.7965
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Maseru",
			latitude: -29.2976,
			longitude: 27.4854
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Monrovia",
			latitude: 6.3106,
			longitude: -10.8047
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Tripoli",
			latitude: 32.8830,
			longitude: 13.1897
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Antananarivo",
			latitude: -18.9201,
			longitude: 47.5237
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Lilongwe",
			latitude: -13.9899,
			longitude: 33.7703
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Bamako",
			latitude: 12.6530,
			longitude: -7.9864
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Nouakchott",
			latitude: 18.0669,
			longitude: -15.9900
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Port Louis",
			latitude: -20.1654,
			longitude: 57.4896
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Rabat",
			latitude: 33.9905,
			longitude: -6.8704
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Maputo",
			latitude: -25.9686,
			longitude: 32.5804
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Windhoek",
			latitude: -22.5749,
			longitude: 17.0805
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Niamey",
			latitude: 13.5164,
			longitude: 2.1157
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Abuja",
			latitude: 9.0580,
			longitude: 7.4891
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Kigali",
			latitude: -1.9441,
			longitude: 30.0619
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dakar",
			latitude: 14.6953,
			longitude: -17.4439
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Freetown",
			latitude: 8.4697,
			longitude: -13.2659
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Mogadishu",
			latitude: 2.0411,
			longitude: 45.3426
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Pretoria",
			latitude: -25.7463,
			longitude: 28.1876
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Mbabane",
			latitude: -26.3186,
			longitude: 31.1410
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Dodoma",
			latitude: -6.1670,
			longitude: 35.7497
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Lome",
			latitude: 6.1228,
			longitude: 1.2255
		}, {
			svgPath: targetSVG,
			zoomLevel: 5,
			scale: 0.5,
			title: "Tunis",
			latitude: 36.8117,
			longitude: 10.1761
		}]
	}
});








/*mapdiv3*/




var map;
			var continentsDataProvider;
			var backIconSVG = "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM27.436,17.39c0.001,0.002,0.004,0.002,0.005,0.004c-0.022,0.187-0.054,0.37-0.085,0.554c-0.015-0.012-0.034-0.025-0.047-0.036c-0.103-0.09-0.254-0.128-0.318-0.115c-0.157,0.032,0.229,0.305,0.267,0.342c0.009,0.009,0.031,0.03,0.062,0.058c-1.029,5.312-5.709,9.338-11.319,9.338c-4.123,0-7.736-2.18-9.776-5.441c0.123-0.016,0.24-0.016,0.28-0.076c0.051-0.077,0.102-0.241,0.178-0.331c0.077-0.089,0.165-0.229,0.127-0.292c-0.039-0.064,0.101-0.344,0.088-0.419c-0.013-0.076-0.127-0.256,0.064-0.407s0.394-0.382,0.407-0.444c0.012-0.063,0.166-0.331,0.152-0.458c-0.012-0.127-0.152-0.28-0.24-0.318c-0.09-0.037-0.28-0.05-0.356-0.151c-0.077-0.103-0.292-0.203-0.368-0.178c-0.076,0.025-0.204,0.05-0.305-0.015c-0.102-0.062-0.267-0.139-0.33-0.189c-0.065-0.05-0.229-0.088-0.305-0.088c-0.077,0-0.065-0.052-0.178,0.101c-0.114,0.153,0,0.204-0.204,0.177c-0.204-0.023,0.025-0.036,0.141-0.189c0.113-0.152-0.013-0.242-0.141-0.203c-0.126,0.038-0.038,0.115-0.241,0.153c-0.203,0.036-0.203-0.09-0.076-0.115s0.355-0.139,0.355-0.19c0-0.051-0.025-0.191-0.127-0.191s-0.077-0.126-0.229-0.291c-0.092-0.101-0.196-0.164-0.299-0.204c-0.09-0.579-0.15-1.167-0.15-1.771c0-2.844,1.039-5.446,2.751-7.458c0.024-0.02,0.048-0.034,0.069-0.036c0.084-0.009,0.31-0.025,0.51-0.059c0.202-0.034,0.418-0.161,0.489-0.153c0.069,0.008,0.241,0.008,0.186-0.042C8.417,8.2,8.339,8.082,8.223,8.082S8.215,7.896,8.246,7.896c0.03,0,0.186,0.025,0.178,0.11C8.417,8.091,8.471,8.2,8.625,8.167c0.156-0.034,0.132-0.162,0.102-0.195C8.695,7.938,8.672,7.853,8.642,7.794c-0.031-0.06-0.023-0.136,0.14-0.153C8.944,7.625,9.168,7.708,9.16,7.573s0-0.28,0.046-0.356C9.253,7.142,9.354,7.09,9.299,7.065C9.246,7.04,9.176,7.099,9.121,6.972c-0.054-0.127,0.047-0.22,0.108-0.271c0.02-0.015,0.067-0.06,0.124-0.112C11.234,5.257,13.524,4.466,16,4.466c3.213,0,6.122,1.323,8.214,3.45c-0.008,0.022-0.01,0.052-0.031,0.056c-0.077,0.013-0.166,0.063-0.179-0.051c-0.013-0.114-0.013-0.331-0.102-0.203c-0.089,0.127-0.127,0.127-0.127,0.191c0,0.063,0.076,0.127,0.051,0.241C23.8,8.264,23.8,8.341,23.84,8.341c0.036,0,0.126-0.115,0.239-0.141c0.116-0.025,0.319-0.088,0.332,0.026c0.013,0.115,0.139,0.152,0.013,0.203c-0.128,0.051-0.267,0.026-0.293-0.051c-0.025-0.077-0.114-0.077-0.203-0.013c-0.088,0.063-0.279,0.292-0.279,0.292s-0.306,0.139-0.343,0.114c-0.04-0.025,0.101-0.165,0.203-0.228c0.102-0.064,0.178-0.204,0.14-0.242c-0.038-0.038-0.088-0.279-0.063-0.343c0.025-0.063,0.139-0.152,0.013-0.216c-0.127-0.063-0.217-0.14-0.318-0.178s-0.216,0.152-0.305,0.204c-0.089,0.051-0.076,0.114-0.191,0.127c-0.114,0.013-0.189,0.165,0,0.254c0.191,0.089,0.255,0.152,0.204,0.204c-0.051,0.051-0.267-0.025-0.267-0.025s-0.165-0.076-0.268-0.076c-0.101,0-0.229-0.063-0.33-0.076c-0.102-0.013-0.306-0.013-0.355,0.038c-0.051,0.051-0.179,0.203-0.28,0.152c-0.101-0.051-0.101-0.102-0.241-0.051c-0.14,0.051-0.279-0.038-0.355,0.038c-0.077,0.076-0.013,0.076-0.255,0c-0.241-0.076-0.189,0.051-0.419,0.089s-0.368-0.038-0.432,0.038c-0.064,0.077-0.153,0.217-0.19,0.127c-0.038-0.088,0.126-0.241,0.062-0.292c-0.062-0.051-0.33-0.025-0.367,0.013c-0.039,0.038-0.014,0.178,0.011,0.229c0.026,0.05,0.064,0.254-0.011,0.216c-0.077-0.038-0.064-0.166-0.141-0.152c-0.076,0.013-0.165,0.051-0.203,0.077c-0.038,0.025-0.191,0.025-0.229,0.076c-0.037,0.051,0.014,0.191-0.051,0.203c-0.063,0.013-0.114,0.064-0.254-0.025c-0.14-0.089-0.14-0.038-0.178-0.012c-0.038,0.025-0.216,0.127-0.229,0.012c-0.013-0.114,0.025-0.152-0.089-0.229c-0.115-0.076-0.026-0.076,0.127-0.025c0.152,0.05,0.343,0.075,0.622-0.013c0.28-0.089,0.395-0.127,0.28-0.178c-0.115-0.05-0.229-0.101-0.406-0.127c-0.179-0.025-0.42-0.025-0.7-0.127c-0.279-0.102-0.343-0.14-0.457-0.165c-0.115-0.026-0.813-0.14-1.132-0.089c-0.317,0.051-1.193,0.28-1.245,0.318s-0.128,0.19-0.292,0.318c-0.165,0.127-0.47,0.419-0.712,0.47c-0.241,0.051-0.521,0.254-0.521,0.305c0,0.051,0.101,0.242,0.076,0.28c-0.025,0.038,0.05,0.229,0.191,0.28c0.139,0.05,0.381,0.038,0.393-0.039c0.014-0.076,0.204-0.241,0.217-0.127c0.013,0.115,0.14,0.292,0.114,0.368c-0.025,0.077,0,0.153,0.09,0.14c0.088-0.012,0.559-0.114,0.559-0.114s0.153-0.064,0.127-0.166c-0.026-0.101,0.166-0.241,0.203-0.279c0.038-0.038,0.178-0.191,0.014-0.241c-0.167-0.051-0.293-0.064-0.115-0.216s0.292,0,0.521-0.229c0.229-0.229-0.051-0.292,0.191-0.305c0.241-0.013,0.496-0.025,0.444,0.051c-0.05,0.076-0.342,0.242-0.508,0.318c-0.166,0.077-0.14,0.216-0.076,0.292c0.063,0.076,0.09,0.254,0.204,0.229c0.113-0.025,0.254-0.114,0.38-0.101c0.128,0.012,0.383-0.013,0.42-0.013c0.039,0,0.216,0.178,0.114,0.203c-0.101,0.025-0.229,0.013-0.445,0.025c-0.215,0.013-0.456,0.013-0.456,0.051c0,0.039,0.292,0.127,0.19,0.191c-0.102,0.063-0.203-0.013-0.331-0.026c-0.127-0.012-0.203,0.166-0.241,0.267c-0.039,0.102,0.063,0.28-0.127,0.216c-0.191-0.063-0.331-0.063-0.381-0.038c-0.051,0.025-0.203,0.076-0.331,0.114c-0.126,0.038-0.076-0.063-0.242-0.063c-0.164,0-0.164,0-0.164,0l-0.103,0.013c0,0-0.101-0.063-0.114-0.165c-0.013-0.102,0.05-0.216-0.013-0.241c-0.064-0.026-0.292,0.012-0.33,0.088c-0.038,0.076-0.077,0.216-0.026,0.28c0.052,0.063,0.204,0.19,0.064,0.152c-0.14-0.038-0.317-0.051-0.419,0.026c-0.101,0.076-0.279,0.241-0.279,0.241s-0.318,0.025-0.318,0.102c0,0.077,0,0.178-0.114,0.191c-0.115,0.013-0.268,0.05-0.42,0.076c-0.153,0.025-0.139,0.088-0.317,0.102s-0.204,0.089-0.038,0.114c0.165,0.025,0.418,0.127,0.431,0.241c0.014,0.114-0.013,0.242-0.076,0.356c-0.043,0.079-0.305,0.026-0.458,0.026c-0.152,0-0.456-0.051-0.584,0c-0.127,0.051-0.102,0.305-0.064,0.419c0.039,0.114-0.012,0.178-0.063,0.216c-0.051,0.038-0.065,0.152,0,0.204c0.063,0.051,0.114,0.165,0.166,0.178c0.051,0.013,0.215-0.038,0.279,0.025c0.064,0.064,0.127,0.216,0.165,0.178c0.039-0.038,0.089-0.203,0.153-0.166c0.064,0.039,0.216-0.012,0.331-0.025s0.177-0.14,0.292-0.204c0.114-0.063,0.05-0.063,0.013-0.14c-0.038-0.076,0.114-0.165,0.204-0.254c0.088-0.089,0.253-0.013,0.292-0.115c0.038-0.102,0.051-0.279,0.151-0.267c0.103,0.013,0.243,0.076,0.331,0.076c0.089,0,0.279-0.14,0.332-0.165c0.05-0.025,0.241-0.013,0.267,0.102c0.025,0.114,0.241,0.254,0.292,0.279c0.051,0.025,0.381,0.127,0.433,0.165c0.05,0.038,0.126,0.153,0.152,0.254c0.025,0.102,0.114,0.102,0.128,0.013c0.012-0.089-0.065-0.254,0.025-0.242c0.088,0.013,0.191-0.026,0.191-0.026s-0.243-0.165-0.331-0.203c-0.088-0.038-0.255-0.114-0.331-0.241c-0.076-0.127-0.267-0.153-0.254-0.279c0.013-0.127,0.191-0.051,0.292,0.051c0.102,0.102,0.356,0.241,0.445,0.33c0.088,0.089,0.229,0.127,0.267,0.242c0.039,0.114,0.152,0.241,0.19,0.292c0.038,0.051,0.165,0.331,0.204,0.394c0.038,0.063,0.165-0.012,0.229-0.063c0.063-0.051,0.179-0.076,0.191-0.178c0.013-0.102-0.153-0.178-0.203-0.216c-0.051-0.038,0.127-0.076,0.191-0.127c0.063-0.05,0.177-0.14,0.228-0.063c0.051,0.077,0.026,0.381,0.051,0.432c0.025,0.051,0.279,0.127,0.331,0.191c0.05,0.063,0.267,0.089,0.304,0.051c0.039-0.038,0.242,0.026,0.294,0.038c0.049,0.013,0.202-0.025,0.304-0.05c0.103-0.025,0.204-0.102,0.191,0.063c-0.013,0.165-0.051,0.419-0.179,0.546c-0.127,0.127-0.076,0.191-0.202,0.191c-0.06,0-0.113,0-0.156,0.021c-0.041-0.065-0.098-0.117-0.175-0.097c-0.152,0.038-0.344,0.038-0.47,0.19c-0.128,0.153-0.178,0.165-0.204,0.114c-0.025-0.051,0.369-0.267,0.317-0.331c-0.05-0.063-0.355-0.038-0.521-0.038c-0.166,0-0.305-0.102-0.433-0.127c-0.126-0.025-0.292,0.127-0.418,0.254c-0.128,0.127-0.216,0.038-0.331,0.038c-0.115,0-0.331-0.165-0.331-0.165s-0.216-0.089-0.305-0.089c-0.088,0-0.267-0.165-0.318-0.165c-0.05,0-0.19-0.115-0.088-0.166c0.101-0.05,0.202,0.051,0.101-0.229c-0.101-0.279-0.33-0.216-0.419-0.178c-0.088,0.039-0.724,0.025-0.775,0.025c-0.051,0-0.419,0.127-0.533,0.178c-0.116,0.051-0.318,0.115-0.369,0.14c-0.051,0.025-0.318-0.051-0.433,0.013c-0.151,0.084-0.291,0.216-0.33,0.216c-0.038,0-0.153,0.089-0.229,0.28c-0.077,0.19,0.013,0.355-0.128,0.419c-0.139,0.063-0.394,0.204-0.495,0.305c-0.102,0.101-0.229,0.458-0.355,0.623c-0.127,0.165,0,0.317,0.025,0.419c0.025,0.101,0.114,0.292-0.025,0.471c-0.14,0.178-0.127,0.266-0.191,0.279c-0.063,0.013,0.063,0.063,0.088,0.19c0.025,0.128-0.114,0.255,0.128,0.369c0.241,0.113,0.355,0.217,0.418,0.367c0.064,0.153,0.382,0.407,0.382,0.407s0.229,0.205,0.344,0.293c0.114,0.089,0.152,0.038,0.177-0.05c0.025-0.09,0.178-0.104,0.355-0.104c0.178,0,0.305,0.04,0.483,0.014c0.178-0.025,0.356-0.141,0.42-0.166c0.063-0.025,0.279-0.164,0.443-0.063c0.166,0.103,0.141,0.241,0.23,0.332c0.088,0.088,0.24,0.037,0.355-0.051c0.114-0.09,0.064-0.052,0.203,0.025c0.14,0.075,0.204,0.151,0.077,0.267c-0.128,0.113-0.051,0.293-0.128,0.47c-0.076,0.178-0.063,0.203,0.077,0.278c0.14,0.076,0.394,0.548,0.47,0.638c0.077,0.088-0.025,0.342,0.064,0.495c0.089,0.151,0.178,0.254,0.077,0.331c-0.103,0.075-0.28,0.216-0.292,0.47s0.051,0.431,0.102,0.521s0.177,0.331,0.241,0.419c0.064,0.089,0.14,0.305,0.152,0.445c0.013,0.14-0.024,0.306,0.039,0.381c0.064,0.076,0.102,0.191,0.216,0.292c0.115,0.103,0.152,0.318,0.152,0.318s0.039,0.089,0.051,0.229c0.012,0.14,0.025,0.228,0.152,0.292c0.126,0.063,0.215,0.076,0.28,0.013c0.063-0.063,0.381-0.077,0.546-0.063c0.165,0.013,0.355-0.075,0.521-0.19s0.407-0.419,0.496-0.508c0.089-0.09,0.292-0.255,0.268-0.356c-0.025-0.101-0.077-0.203,0.024-0.254c0.102-0.052,0.344-0.152,0.356-0.229c0.013-0.077-0.09-0.395-0.115-0.457c-0.024-0.064,0.064-0.18,0.165-0.306c0.103-0.128,0.421-0.216,0.471-0.267c0.051-0.053,0.191-0.267,0.217-0.433c0.024-0.167-0.051-0.369,0-0.457c0.05-0.09,0.013-0.165-0.103-0.268c-0.114-0.102-0.089-0.407-0.127-0.457c-0.037-0.051-0.013-0.319,0.063-0.345c0.076-0.023,0.242-0.279,0.344-0.393c0.102-0.114,0.394-0.47,0.534-0.496c0.139-0.025,0.355-0.229,0.368-0.343c0.013-0.115,0.38-0.547,0.394-0.635c0.013-0.09,0.166-0.42,0.102-0.497c-0.062-0.076-0.559,0.115-0.622,0.141c-0.064,0.025-0.241,0.127-0.446,0.113c-0.202-0.013-0.114-0.177-0.127-0.254c-0.012-0.076-0.228-0.368-0.279-0.381c-0.051-0.012-0.203-0.166-0.267-0.317c-0.063-0.153-0.152-0.343-0.254-0.458c-0.102-0.114-0.165-0.38-0.268-0.559c-0.101-0.178-0.189-0.407-0.279-0.572c-0.021-0.041-0.045-0.079-0.067-0.117c0.118-0.029,0.289-0.082,0.31-0.009c0.024,0.088,0.165,0.279,0.19,0.419s0.165,0.089,0.178,0.216c0.014,0.128,0.14,0.433,0.19,0.47c0.052,0.038,0.28,0.242,0.318,0.318c0.038,0.076,0.089,0.178,0.127,0.369c0.038,0.19,0.076,0.444,0.179,0.482c0.102,0.038,0.444-0.064,0.508-0.102s0.482-0.242,0.635-0.255c0.153-0.012,0.179-0.115,0.368-0.152c0.191-0.038,0.331-0.177,0.458-0.28c0.127-0.101,0.28-0.355,0.33-0.444c0.052-0.088,0.179-0.152,0.115-0.253c-0.063-0.103-0.331-0.254-0.433-0.268c-0.102-0.012-0.089-0.178-0.152-0.178s-0.051,0.088-0.178,0.153c-0.127,0.063-0.255,0.19-0.344,0.165s0.026-0.089-0.113-0.203s-0.192-0.14-0.192-0.228c0-0.089-0.278-0.255-0.304-0.382c-0.026-0.127,0.19-0.305,0.254-0.19c0.063,0.114,0.115,0.292,0.279,0.368c0.165,0.076,0.318,0.204,0.395,0.229c0.076,0.025,0.267-0.14,0.33-0.114c0.063,0.024,0.191,0.253,0.306,0.292c0.113,0.038,0.495,0.051,0.559,0.051s0.33,0.013,0.381-0.063c0.051-0.076,0.089-0.076,0.153-0.076c0.062,0,0.177,0.229,0.267,0.254c0.089,0.025,0.254,0.013,0.241,0.179c-0.012,0.164,0.076,0.305,0.165,0.317c0.09,0.012,0.293-0.191,0.293-0.191s0,0.318-0.012,0.433c-0.014,0.113,0.139,0.534,0.139,0.534s0.19,0.393,0.241,0.482s0.267,0.355,0.267,0.47c0,0.115,0.025,0.293,0.103,0.293c0.076,0,0.152-0.203,0.24-0.331c0.091-0.126,0.116-0.305,0.153-0.432c0.038-0.127,0.038-0.356,0.038-0.444c0-0.09,0.075-0.166,0.255-0.242c0.178-0.076,0.304-0.292,0.456-0.407c0.153-0.115,0.141-0.305,0.446-0.305c0.305,0,0.278,0,0.355-0.077c0.076-0.076,0.151-0.127,0.19,0.013c0.038,0.14,0.254,0.343,0.292,0.394c0.038,0.052,0.114,0.191,0.103,0.344c-0.013,0.152,0.012,0.33,0.075,0.33s0.191-0.216,0.191-0.216s0.279-0.189,0.267,0.013c-0.014,0.203,0.025,0.419,0.025,0.545c0,0.053,0.042,0.135,0.088,0.21c-0.005,0.059-0.004,0.119-0.009,0.178C27.388,17.153,27.387,17.327,27.436,17.39zM20.382,12.064c0.076,0.05,0.102,0.127,0.152,0.203c0.052,0.076,0.14,0.05,0.203,0.114c0.063,0.064-0.178,0.14-0.075,0.216c0.101,0.077,0.151,0.381,0.165,0.458c0.013,0.076-0.279,0.114-0.369,0.102c-0.089-0.013-0.354-0.102-0.445-0.127c-0.089-0.026-0.139-0.343-0.025-0.331c0.116,0.013,0.141-0.025,0.267-0.139c0.128-0.115-0.189-0.166-0.278-0.191c-0.089-0.025-0.268-0.305-0.331-0.394c-0.062-0.089-0.014-0.228,0.141-0.331c0.076-0.051,0.279,0.063,0.381,0c0.101-0.063,0.203-0.14,0.241-0.165c0.039-0.025,0.293,0.038,0.33,0.114c0.039,0.076,0.191,0.191,0.141,0.229c-0.052,0.038-0.281,0.076-0.356,0c-0.075-0.077-0.255,0.012-0.268,0.152C20.242,12.115,20.307,12.013,20.382,12.064zM16.875,12.28c-0.077-0.025,0.025-0.178,0.102-0.229c0.075-0.051,0.164-0.178,0.241-0.305c0.076-0.127,0.178-0.14,0.241-0.127c0.063,0.013,0.203,0.241,0.241,0.318c0.038,0.076,0.165-0.026,0.217-0.051c0.05-0.025,0.127-0.102,0.14-0.165s0.127-0.102,0.254-0.102s0.013,0.102-0.076,0.127c-0.09,0.025-0.038,0.077,0.113,0.127c0.153,0.051,0.293,0.191,0.459,0.279c0.165,0.089,0.19,0.267,0.088,0.292c-0.101,0.025-0.406,0.051-0.521,0.038c-0.114-0.013-0.254-0.127-0.419-0.153c-0.165-0.025-0.369-0.013-0.433,0.077s-0.292,0.05-0.395,0.05c-0.102,0-0.228,0.127-0.253,0.077C16.875,12.534,16.951,12.306,16.875,12.28zM17.307,9.458c0.063-0.178,0.419,0.038,0.355,0.127C17.599,9.675,17.264,9.579,17.307,9.458zM17.802,18.584c0.063,0.102-0.14,0.431-0.254,0.407c-0.113-0.027-0.076-0.318-0.038-0.382C17.548,18.545,17.769,18.529,17.802,18.584zM13.189,12.674c0.025-0.051-0.039-0.153-0.127-0.013C13.032,12.71,13.164,12.725,13.189,12.674zM20.813,8.035c0.141,0.076,0.339,0.107,0.433,0.013c0.076-0.076,0.013-0.204-0.05-0.216c-0.064-0.013-0.104-0.115,0.062-0.203c0.165-0.089,0.343-0.204,0.534-0.229c0.19-0.025,0.622-0.038,0.774,0c0.152,0.039,0.382-0.166,0.445-0.254s-0.203-0.152-0.279-0.051c-0.077,0.102-0.444,0.076-0.521,0.051c-0.076-0.025-0.686,0.102-0.812,0.102c-0.128,0-0.179,0.152-0.356,0.229c-0.179,0.076-0.42,0.191-0.509,0.229c-0.088,0.038-0.177,0.19-0.101,0.216C20.509,7.947,20.674,7.959,20.813,8.035zM14.142,12.674c0.064-0.089-0.051-0.217-0.114-0.217c-0.12,0-0.178,0.191-0.103,0.254C14.002,12.776,14.078,12.763,14.142,12.674zM14.714,13.017c0.064,0.025,0.114,0.102,0.165,0.114c0.052,0.013,0.217,0,0.167-0.127s-0.167-0.127-0.204-0.127c-0.038,0-0.203-0.038-0.267,0C14.528,12.905,14.65,12.992,14.714,13.017zM11.308,10.958c0.101,0.013,0.217-0.063,0.305-0.101c0.088-0.038,0.216-0.114,0.216-0.229c0-0.114-0.025-0.216-0.077-0.267c-0.051-0.051-0.14-0.064-0.216-0.051c-0.115,0.02-0.127,0.14-0.203,0.14c-0.076,0-0.165,0.025-0.14,0.114s0.077,0.152,0,0.19C11.117,10.793,11.205,10.946,11.308,10.958zM11.931,10.412c0.127,0.051,0.394,0.102,0.292,0.153c-0.102,0.051-0.28,0.19-0.305,0.267s0.216,0.153,0.216,0.153s-0.077,0.089-0.013,0.114c0.063,0.025,0.102-0.089,0.203-0.089c0.101,0,0.304,0.063,0.406,0.063c0.103,0,0.267-0.14,0.254-0.229c-0.013-0.089-0.14-0.229-0.254-0.28c-0.113-0.051-0.241-0.28-0.317-0.331c-0.076-0.051,0.076-0.178-0.013-0.267c-0.09-0.089-0.153-0.076-0.255-0.14c-0.102-0.063-0.191,0.013-0.254,0.089c-0.063,0.076-0.14-0.013-0.217,0.012c-0.102,0.035-0.063,0.166-0.012,0.229C11.714,10.221,11.804,10.361,11.931,10.412zM24.729,17.198c-0.083,0.037-0.153,0.47,0,0.521c0.152,0.052,0.241-0.202,0.191-0.267C24.868,17.39,24.843,17.147,24.729,17.198zM20.114,20.464c-0.159-0.045-0.177,0.166-0.304,0.306c-0.128,0.141-0.267,0.254-0.317,0.241c-0.052-0.013-0.331,0.089-0.242,0.279c0.089,0.191,0.076,0.382-0.013,0.472c-0.089,0.088,0.076,0.342,0.052,0.482c-0.026,0.139,0.037,0.229,0.215,0.229s0.242-0.064,0.318-0.229c0.076-0.166,0.088-0.331,0.164-0.47c0.077-0.141,0.141-0.434,0.179-0.51c0.038-0.075,0.114-0.316,0.102-0.457C20.254,20.669,20.204,20.489,20.114,20.464zM10.391,8.802c-0.069-0.06-0.229-0.102-0.306-0.11c-0.076-0.008-0.152,0.06-0.321,0.06c-0.168,0-0.279,0.067-0.347,0C9.349,8.684,9.068,8.65,9.042,8.692C9.008,8.749,8.941,8.751,9.008,8.87c0.069,0.118,0.12,0.186,0.179,0.178s0.262-0.017,0.288,0.051C9.5,9.167,9.569,9.226,9.712,9.184c0.145-0.042,0.263-0.068,0.296-0.119c0.033-0.051,0.263-0.059,0.263-0.059S10.458,8.861,10.391,8.802z";
			
			
			function handleGoHome() {
			    map.dataProvider = continentsDataProvider;
			    map.validateNow();
			}
			
			PCharts.ready(function() {
			    map = new PCharts.AmMap();
			    map.pathToImages = "plugins/PCharts/map/images/";
			    //map.panEventsEnabled = true; // this line enables pinch-zooming and dragging on touch devices
			
			    var worldDataProvider = {
			        mapVar: PCharts.maps.worldLow,
			        getAreasFromMap:true
			    };
			
			    map.areasSettings = {
			        autoZoom: true,
			        rollOverOutlineColor: "#000000",
			        selectedColor: "#BBBB00",
			        color: "#BBBB00"
			    };
			
			    continentsDataProvider = {
			        mapVar: PCharts.maps.continentsLow,
			
			        areas: [
			            {
			            id: "africa",
			            linkToObject: worldDataProvider,
			            color: "#723C1A",
			            passZoomValuesToTarget: true},
			        {
			            id: "asia",
			            linkToObject: worldDataProvider,
			            color: "#C8AB67",
			            passZoomValuesToTarget: true},
			        {
			            id: "australia",
			            linkToObject: worldDataProvider,
			            color: "#93644A",
			            passZoomValuesToTarget: true},
			        {
			            id: "europe",
			            linkToObject: worldDataProvider,
			            color: "#AA805A",
			            passZoomValuesToTarget: true},
			        {
			            id: "north_america",
			            linkToObject: worldDataProvider,
			            color: "#8D725F",
			            passZoomValuesToTarget: true},
			        {
			            id: "south_america",
			            linkToObject: worldDataProvider,
			            color: "#BE8045",
			            passZoomValuesToTarget: true}]
			    };
			
			    var backButton = {
			        svgPath: backIconSVG,
			        label: "Back to continents map",
			        rollOverColor: "#CC0000",
			        labelRollOverColor: "#CC0000",
			        useTargetsZoomValues: true,
			        linkToObject: continentsDataProvider,
			        left: 30,
			        bottom: 30,
			        labelFontSize: 15
			    };
			
			    worldDataProvider.images = [backButton];
			
			    map.dataProvider = continentsDataProvider;
			
			    // monitor when home icon was clicked and also go to continents map
			    map.addListener("homeButtonClicked", handleGoHome);
			
			    map.write("mapdiv3");
			
			});






/*mapdiv4*/


         
			// add all your code to this method, as this will ensure that page is loaded
			PCharts.ready(function() {
			    // create AmMap object
			    var map = new PCharts.AmMap();
			    // set path to images
			    map.pathToImages = "plugins/PCharts/map/images/";
			    
			    /* create data provider object
			     mapVar tells the map name of the variable of the map data. You have to
			     view source of the map file you included in order to find the name of the 
			     variable - it's the very first line after commented lines.
			     
			     getAreasFromMap indicates that amMap should read all the areas available
			     in the map data and treat them as they are included in your data provider.
			     in case you don't set it to true, all the areas except listed in data
			     provider will be treated as unlisted.
			    */
			    var dataProvider = {
			        mapVar: PCharts.maps.worldLow,
			        getAreasFromMap:true                    
			    }; 
			    // pass data provider to the map object
			    map.dataProvider = dataProvider;
			
			    /* create areas settings
			     * autoZoom set to true means that the map will zoom-in when clicked on the area
			     * selectedColor indicates color of the clicked area.
			     */
			    map.areasSettings = {
			        autoZoom: true,
			        selectedColor: "#CC0000"
			    };
			
			    // let's say we want a small map to be displayed, so let's create and add it to the map
			    map.smallMap = new PCharts.SmallMap();
			
			    // write the map to container div
			    map.write("mapdiv4");               
			    
			});