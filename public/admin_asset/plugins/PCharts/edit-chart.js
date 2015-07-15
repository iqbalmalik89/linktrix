
			PCharts.ready(function () {
				generateChartData();
				createStockChart();
			});

			var chartData = [];

			function generateChartData() {
				var firstDate = new Date(2012, 0, 1);
				firstDate.setDate(firstDate.getDate() - 500);
				firstDate.setHours(0, 0, 0, 0);

				for (var i = 0; i < 500; i++) {
					var newDate = new Date(firstDate);
					newDate.setDate(newDate.getDate() + i);

					var a = Math.round(Math.random() * (40 + i)) + 100 + i;
					var b = Math.round(Math.random() * 100000000);

					chartData.push({
						date: newDate,
						value: a,
						volume: b
					});
				}
			}

			var chart;

			function createStockChart() {
				chart = new PCharts.AmStockChart();
				chart.pathToImages = "../PCharts/images/";

				// DATASETS //////////////////////////////////////////
				var dataSet = new PCharts.DataSet();
				dataSet.color = "#fe7b7b";
				dataSet.fieldMappings = [{
					fromField: "value",
					toField: "value"
				}, {
					fromField: "volume",
					toField: "volume"
				}];
				dataSet.dataProvider = chartData;
				dataSet.categoryField = "date";

				// set data sets to the chart
				chart.dataSets = [dataSet];

				// PANELS ///////////////////////////////////////////
				// first stock panel
				var stockPanel1 = new PCharts.StockPanel();
				stockPanel1.showCategoryAxis = false;
				stockPanel1.title = "Value";
				stockPanel1.percentHeight = 70;

				// graph of first stock panel
				var graph1 = new PCharts.StockGraph();
				graph1.valueField = "value";
				stockPanel1.addStockGraph(graph1);

				// create stock legend
				var stockLegend1 = new PCharts.StockLegend();
				stockLegend1.valueTextRegular = " ";
				stockLegend1.markerType = "none";
				stockPanel1.stockLegend = stockLegend1;


				// second stock panel
				var stockPanel2 = new PCharts.StockPanel();
				stockPanel2.title = "Volume";
				stockPanel2.percentHeight = 30;
				var graph2 = new PCharts.StockGraph();
				graph2.valueField = "volume";
				graph2.type = "column";
				graph2.fillAlphas = 1;
				stockPanel2.addStockGraph(graph2);

				// create stock legend
				var stockLegend2 = new PCharts.StockLegend();
				stockLegend2.valueTextRegular = " ";
				stockLegend2.markerType = "none";
				stockPanel2.stockLegend = stockLegend2;

				// set panels to the chart
				chart.panels = [stockPanel1, stockPanel2];


				// OTHER SETTINGS ////////////////////////////////////
				var scrollbarSettings = new PCharts.ChartScrollbarSettings();
				scrollbarSettings.graph = graph1;
				chart.chartScrollbarSettings = scrollbarSettings;

				var cursorSettings = new PCharts.ChartCursorSettings();
				cursorSettings.valueBalloonsEnabled = true;
				cursorSettings.graphBulletSize = 1;
				chart.chartCursorSettings = cursorSettings;


				// PERIOD SELECTOR ///////////////////////////////////
				var periodSelector = new PCharts.PeriodSelector();
				periodSelector.periods = [{
					period: "DD",
					count: 10,
					label: "10 days"
				}, {
					period: "MM",
					count: 1,
					label: "1 month"
				}, {
					period: "YYYY",
					count: 1,
					label: "1 year"
				}, {
					period: "YTD",
					label: "YTD"
				}, {
					period: "MAX",
					label: "MAX"
				}];
				chart.periodSelector = periodSelector;


				var panelsSettings = new PCharts.PanelsSettings();
				panelsSettings.usePrefixes = true;
				chart.panelsSettings = panelsSettings;


				// EVENTS
				var e0 = {
					date: new Date(2010, 8, 19),
					type: "sign",
					backgroundColor: "#85CDE6",
					graph: graph1,
					text: "S",
					description: "This is description of an event"
				};
				var e1 = {
					date: new Date(2010, 10, 19),
					type: "flag",
					backgroundColor: "#FFFFFF",
					backgroundAlpha: 0.5,
					graph: graph1,
					text: "F",
					description: "Some longer\ntext can also\n be added"
				};
				var e2 = {
					date: new Date(2010, 11, 10),
					showOnAxis: true,

					backgroundColor: "#85CDE6",
					type: "pin",
					text: "X",
					graph: graph1,
					description: "This is description of an event"
				};
				var e3 = {
					date: new Date(2010, 11, 26),
					showOnAxis: true,
					backgroundColor: "#85CDE6",
					type: "pin",
					text: "Z",
					graph: graph1,
					description: "This is description of an event"
				};
				var e4 = {
					date: new Date(2011, 0, 3),
					type: "sign",
					backgroundColor: "#85CDE6",
					graph: graph1,
					text: "U",
					description: "This is description of an event"
				};
				var e5 = {
					date: new Date(2011, 1, 6),
					type: "sign",
					graph: graph1,
					text: "D",
					description: "This is description of an event"
				};
				var e6 = {
					date: new Date(2011, 3, 5),
					type: "sign",
					graph: graph1,
					text: "L",
					description: "This is description of an event"
				};
				var e7 = {
					date: new Date(2011, 3, 5),
					type: "sign",
					graph: graph1,
					text: "R",
					description: "This is description of an event"
				};
				var e8 = {
					date: new Date(2011, 5, 15),
					type: "arrowUp",
					backgroundColor: "#00CC00",
					graph: graph1,
					description: "This is description of an event"
				};
				var e9 = {
					date: new Date(2011, 6, 25),
					type: "arrowDown",
					backgroundColor: "#1e293d",
					graph: graph1,
					description: "This is description of an event"
				};
				var e10 = {
					date: new Date(2011, 8, 1),
					type: "text",
					graph: graph1,
					text: "Longer text can\nalso be displayed",
					description: "This is description of an event"
				};

				dataSet.stockEvents = [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10];

				chart.write('chartdiv');
			}

	
	
	
	/*	chart1*/
	
var chart1;
			var sArrow;
			var mArrow;
			var hArrow;
			var axis;
			
			PCharts.ready(function () {
				// clock is just an angular gauge with three arrows
				chart1 = new PCharts.AmAngularGauge();
				chart1.startDuration = 0.3;
			
				// main face
				axis = new PCharts.GaugeAxis();
				axis.startValue = 0;
				axis.endValue = 12;
				axis.valueInterval = 1;
				axis.minorTickInterval = 0.2;
				axis.showFirstLabel = false;
				axis.startAngle = 0;
				axis.endAngle = 360;
				axis.axisAlpha = 0.3;
				chart1.addAxis(axis);
			
				// seconds face
				var axis2 = new PCharts.GaugeAxis();
				axis2.startValue = 0;
				axis2.endValue = 60;
				axis2.valueInterval = 15;
				axis2.minorTickInterval = 1;
				axis2.showFirstLabel = false;
				axis2.startAngle = 0;
				axis2.endAngle = 360;
				axis2.radius = 40;
				axis2.centerY = 80;
				axis2.inside = false;
				axis2.axisAlpha = 0.3;
				chart1.addAxis(axis2);
			
				// hour arrow
				hArrow = new PCharts.GaugeArrow();
				hArrow.radius = "50%";
				hArrow.clockWiseOnly = true;
			
				// minutes arrow
				mArrow = new PCharts.GaugeArrow();
				mArrow.radius = "90%";
				mArrow.startWidth = 6;
				mArrow.nailRadius = 0;
				mArrow.clockWiseOnly = true;
			
				// seconds arrow
				sArrow = new PCharts.GaugeArrow();
				sArrow.axis = axis2; // this arrow uses different axis
				sArrow.startWidth = 3;
				sArrow.nailRadius = 4;
				sArrow.color = "#1e293d";
				sArrow.clockWiseOnly = true;
			
			
				// update clock before adding arrows to avoid initial animation
				updateClock();
			
				// add arrows
				chart1.addArrow(hArrow);
				chart1.addArrow(mArrow);
				chart1.addArrow(sArrow);
			
				chart1.write("chartdiv1");
			
				// update clock every second
				setInterval(updateClock, 1000);
			});
			
			// update clock
			function updateClock() {
				// get date
				var date = new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
			
				// update hours
				hArrow.setValue(hours + minutes / 60);
				// update minutes
				mArrow.setValue(12 * (minutes + seconds / 60) / 60);
				// update seconds
				sArrow.setValue(date.getSeconds());
			
				// update date
				var dateString = PCharts.formatDate(date, "DD MMM, EEE");
				axis.setTopText(dateString);
			}
	
	

      
	
	
	/*	chart2*/
	
	var chart2;
            var chartData2 = [
                {
                    "year": 1930,
                    "italy": 1,
                    "germany": 5,
                    "uk": 3
                },
                {
                    "year": 1934,
                    "italy": 1,
                    "germany": 2,
                    "uk": 6
                },
                {
                    "year": 1938,
                    "italy": 2,
                    "germany": 3,
                    "uk": 1
                },
                {
                    "year": 1950,
                    "italy": 3,
                    "germany": 4,
                    "uk": 1
                },
                {
                    "year": 1954,
                    "italy": 5,
                    "germany": 1,
                    "uk": 2
                },
                {
                    "year": 1958,
                    "italy": 3,
                    "germany": 2,
                    "uk": 1
                },
                {
                    "year": 1962,
                    "italy": 1,
                    "germany": 2,
                    "uk": 3
                },
                {
                    "year": 1966,
                    "italy": 2,
                    "germany": 1,
                    "uk": 5
                },
                {
                    "year": 1970,
                    "italy": 3,
                    "germany": 5,
                    "uk": 2
                },
                {
                    "year": 1974,
                    "italy": 4,
                    "germany": 3,
                    "uk": 6
                },
                {
                    "year": 1978,
                    "italy": 1,
                    "germany": 2,
                    "uk": 4
                }
            ];
            
            
            PCharts.ready(function () {
                // SERIAL CHART
                chart2 = new PCharts.AmSerialChart();
                chart2.dataProvider = chartData2;
                chart2.categoryField = "year";
                chart2.startDuration = 0.5;
                chart2.balloon.color = "#000000";
            
                // AXES
                // category
                var categoryAxis = chart2.categoryAxis;
                categoryAxis.fillAlpha = 1;
                categoryAxis.fillColor = "#FAFAFA";
                categoryAxis.gridAlpha = 0;
                categoryAxis.axisAlpha = 0;
                categoryAxis.gridPosition = "start";
                categoryAxis.position = "top";
            
                // value
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.title = "Place taken";
                valueAxis.dashLength = 5;
                valueAxis.axisAlpha = 0;
                valueAxis.minimum = 1;
                valueAxis.maximum = 6;
                valueAxis.integersOnly = true;
                valueAxis.gridCount = 10;
                valueAxis.reversed = true; // this line makes the value axis reversed
                chart2.addValueAxis(valueAxis);
            
                // GRAPHS
                // Italy graph						            		
                var graph = new PCharts.AmGraph();
                graph.title = "Italy";
                graph.valueField = "italy";
                graph.hidden = true; // this line makes the graph initially hidden           
                graph.balloonText = "place taken by Italy in [[category]]: [[value]]";
                graph.lineAlpha = 1;
                graph.bullet = "round";
                chart2.addGraph(graph);
            
                // Germany graph
                var graph = new PCharts.AmGraph();
                graph.title = "Germany";
                graph.valueField = "germany";
                graph.balloonText = "place taken by Germany in [[category]]: [[value]]";
                graph.bullet = "round";
                chart2.addGraph(graph);
            
                // United Kingdom graph
                var graph = new PCharts.AmGraph();
                graph.title = "United Kingdom";
                graph.valueField = "uk";
                graph.balloonText = "place taken by UK in [[category]]: [[value]]";
                graph.bullet = "round";
                chart2.addGraph(graph);
                
                // CURSOR
                var chartCursor = new PCharts.ChartCursor();
                chartCursor.cursorPosition = "mouse";
                chartCursor.zoomable = false;
                chartCursor.cursorAlpha = 0;
                chart2.addChartCursor(chartCursor);                
            
                // LEGEND
                var legend = new PCharts.AmLegend();
                legend.useGraphSettings = true;
                chart2.addLegend(legend);
            
                // WRITE
                chart2.write("chartdiv2");
            });
			
			
			

	
	/*	chart3*/

var chartData3 = [
                {
                    "date": "2012-01-01",
                    "distance": 227,
                    "townName": "New York",
                    "townName2": "New York",
                    "townSize": 25,
                    "latitude": 40.71,
                    "duration": 408
                },
                {
                    "date": "2012-01-02",
                    "distance": 371,
                    "townName": "Washington",
                    "townSize": 14,
                    "latitude": 38.89,
                    "duration": 482
                },
                {
                    "date": "2012-01-03",
                    "distance": 433,
                    "townName": "Wilmington",
                    "townSize": 6,
                    "latitude": 34.22,
                    "duration": 562
                },
                {
                    "date": "2012-01-04",
                    "distance": 345,
                    "townName": "Jacksonville",
                    "townSize": 7,
                    "latitude": 30.35,
                    "duration": 379
                },
                {
                    "date": "2012-01-05",
                    "distance": 480,
                    "townName": "Miami",
                    "townName2": "Miami",
                    "townSize": 10,
                    "latitude": 25.83,
                    "duration": 501
                },
                {
                    "date": "2012-01-06",
                    "distance": 386,
                    "townName": "Tallahassee",
                    "townSize": 7,
                    "latitude": 30.46,
                    "duration": 443
                },
                {
                    "date": "2012-01-07",
                    "distance": 348,
                    "townName": "New Orleans",
                    "townSize": 10,
                    "latitude": 29.94,
                    "duration": 405
                },
                {
                    "date": "2012-01-08",
                    "distance": 238,
                    "townName": "Houston",
                    "townName2": "Houston",
                    "townSize": 16,
                    "latitude": 29.76,
                    "duration": 309
                },
                {
                    "date": "2012-01-09",
                    "distance": 218,
                    "townName": "Dalas",
                    "townSize": 17,
                    "latitude": 32.8,
                    "duration": 287
                },
                {
                    "date": "2012-01-10",
                    "distance": 349,
                    "townName": "Oklahoma City",
                    "townSize": 11,
                    "latitude": 35.49,
                    "duration": 485
                },
                {
                    "date": "2012-01-11",
                    "distance": 603,
                    "townName": "Kansas City",
                    "townSize": 10,
                    "latitude": 39.1,
                    "duration": 890
                },
                {
                    "date": "2012-01-12",
                    "distance": 534,
                    "townName": "Denver",
                    "townName2": "Denver",
                    "townSize": 18,
                    "latitude": 39.74,
                    "duration": 810
                },
                {
                    "date": "2012-01-13",
                    "townName": "Salt Lake City",
                    "townSize": 12,
                    "distance": 425,
                    "duration": 670,
                    "latitude": 40.75,
                    "dashLength": 8,
                    "alpha":0.4
                },
                {
                    "date": "2012-01-14",                                        
                    "latitude": 36.1,
                    "duration": 470,                    
                    "townName": "Las Vegas",
                    "townName2": "Las Vegas"
                },
                {
                    "date": "2012-01-15"
                },
                {
                    "date": "2012-01-16"
                },
                {
                    "date": "2012-01-17"
                },
                {
                    "date": "2012-01-18"
                },
                {
                    "date": "2012-01-19"
                }
            ];
            var chart3;

            PCharts.ready(function () {
                // SERIAL CHART
                chart3 = new PCharts.AmSerialChart();
                chart3.dataProvider = chartData3;
                chart3.categoryField = "date";
                chart3.dataDateFormat = "YYYY-MM-DD";
                chart3.color = "#1e293d";
                chart3.marginLeft = 0;

                // AXES
                // category
                var categoryAxis = chart3.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
                categoryAxis.autoGridCount = false;
                categoryAxis.gridCount = 50;
                categoryAxis.gridAlpha = 0.1;
                categoryAxis.gridColor = "#1e293d";
                categoryAxis.axisColor = "#555555";
                // we want custom date formatting, so we change it in next line
                categoryAxis.dateFormats = [{
                    period: 'DD',
                    format: 'DD'
                }, {
                    period: 'WW',
                    format: 'MMM DD'
                }, {
                    period: 'MM',
                    format: 'MMM'
                }, {
                    period: 'YYYY',
                    format: 'YYYY'
                }];

                // as we have data of different units, we create three different value axes
                // Distance value axis
                var distanceAxis = new PCharts.ValueAxis();
                distanceAxis.title = "distance";
                distanceAxis.gridAlpha = 0;
                distanceAxis.axisAlpha = 0;
                chart3.addValueAxis(distanceAxis);

                // latitude value axis
                var latitudeAxis = new PCharts.ValueAxis();
                latitudeAxis.gridAlpha = 0;
                latitudeAxis.axisAlpha = 0;
                latitudeAxis.labelsEnabled = false;
                latitudeAxis.position = "right";
                chart3.addValueAxis(latitudeAxis);

                // duration value axis
                var durationAxis = new PCharts.ValueAxis();
                durationAxis.title = "duration";
                // the following line makes this value axis to convert values to duration
                // it tells the axis what duration unit it should use. mm - minute, hh - hour...
                durationAxis.duration = "mm";
                durationAxis.durationUnits = {
                    DD: "d. ",
                    hh: "h ",
                    mm: "min",
                    ss: ""
                };
                durationAxis.gridAlpha = 0;
                durationAxis.axisAlpha = 0;
                durationAxis.inside = true;
                durationAxis.position = "right";
                chart3.addValueAxis(durationAxis);

                // GRAPHS
                // distance graph
                var distanceGraph = new PCharts.AmGraph();
                distanceGraph.valueField = "distance";
                distanceGraph.title = "distance";
                distanceGraph.type = "column";
                distanceGraph.fillAlphas = 0.9;
                distanceGraph.valueAxis = distanceAxis; // indicate which axis should be used
                distanceGraph.balloonText = "[[value]] miles";
                distanceGraph.legendValueText = "[[value]] mi";
                distanceGraph.legendPeriodValueText = "total: [[value.sum]] mi";
                distanceGraph.lineColor = "#263138";
                distanceGraph.dashLengthField = "dashLength";
                distanceGraph.alphaField = "alpha";
                chart3.addGraph(distanceGraph);

                // latitude graph                                               
                var latitudeGraph = new PCharts.AmGraph();
                latitudeGraph.valueField = "latitude";
                latitudeGraph.title = "latitude/city";
                latitudeGraph.type = "line";
                latitudeGraph.valueAxis = latitudeAxis; // indicate which axis should be used 
                latitudeGraph.lineColor = "#786c56";
                latitudeGraph.lineThickness = 1;
                latitudeGraph.legendValueText = "[[description]]/[[value]]";
                latitudeGraph.descriptionField = "townName";
                latitudeGraph.bullet = "round";
                latitudeGraph.bulletSizeField = "townSize"; // indicate which field should be used for bullet size
                latitudeGraph.bulletBorderColor = "#786c56";
                latitudeGraph.bulletBorderAlpha = 1;
                latitudeGraph.bulletBorderThickness = 2;
                latitudeGraph.bulletColor = "#000000";
                latitudeGraph.labelText = "[[townName2]]"; // not all data points has townName2 specified, that's why labels are displayed only near some of the bullets.  
                latitudeGraph.labelPosition = "right";
                latitudeGraph.balloonText = "latitude:[[value]]";
                latitudeGraph.showBalloon = true;
                latitudeGraph.dashLengthField = "dashLength";
                chart3.addGraph(latitudeGraph);

                // duration graph
                var durationGraph = new PCharts.AmGraph();
                durationGraph.title = "duration";
                durationGraph.valueField = "duration";
                durationGraph.type = "line";
                durationGraph.valueAxis = durationAxis; // indicate which axis should be used
                durationGraph.lineColor = "#ff5755";
                durationGraph.balloonText = "[[value]]";
                durationGraph.lineThickness = 1;
                durationGraph.legendValueText = "[[value]]";
                durationGraph.bullet = "square";
                durationGraph.bulletBorderColor = "#ff5755";
                durationGraph.bulletBorderThickness = 1;
                durationGraph.bulletBorderAlpha = 1;
                durationGraph.dashLengthField = "dashLength";
                chart3.addGraph(durationGraph);

                // CURSOR                                
                var chartCursor = new PCharts.ChartCursor();
                chartCursor.zoomable = false;
                chartCursor.categoryBalloonDateFormat = "DD";
                chartCursor.cursorAlpha = 0;
                chartCursor.valueBalloonsEnabled = false;
                chart3.addChartCursor(chartCursor);

                // LEGEND
                var legend = new PCharts.AmLegend();
                legend.bulletType = "round";
                legend.equalWidths = false;
                legend.valueWidth = 120;
                legend.useGraphSettings = true;
                legend.color = "#1e293d";
                chart3.addLegend(legend);

                // WRITE
                chart3.write("chartdiv3");
            });
			
			
			
			
			
			
			
			
			
			
			
			
		/*	chart4*/	
			
			var chart4;
			var arrow;
			var axisKM;
			var axisMiles;
						
			PCharts.ready(function () {
			
				// create angular gauge
				chart4 = new PCharts.AmAngularGauge();
			
				// kilometers axis
				axisKM = new PCharts.GaugeAxis();
				axisKM.startValue = 0;
				axisKM.endValue = 240;
				axisKM.radius = "100%";
				axisKM.inside = false;
				axisKM.gridInside = false;
				axisKM.axisColor = "#94dca0";
				axisKM.tickColor = "#94dca0";
				axisKM.axisThickness = 3;
				chart4.addAxis(axisKM);
			
				// miles axis
				axisMiles = new PCharts.GaugeAxis();
				axisMiles.startValue = 0;
				axisMiles.endValue = 160;
				axisMiles.radius = "80%";
				axisMiles.axisColor = "#bebd61";
				axisMiles.tickColor = "#bebd61";
				axisMiles.axisThickness = 3;
				chart4.addAxis(axisMiles);
			
				// arrow
				arrow = new PCharts.GaugeArrow();
				arrow.radius = "85%";
				arrow.color = "#8ec487";
				arrow.innerRadius = 50;
				arrow.nailRadius = 0;
				chart4.addArrow(arrow);
			
				chart4.write("chartdiv4");
				// update value every 2 seconds
				setInterval(randomValue, 2000);
			});
			
			// set random value
			function randomValue() {
				var value = Math.round(Math.random() * 240);
				arrow.setValue(value);
			}
			
			
/*	chart5*/		
			
			
 var chart5;

            var chartData5 = [
                {
                    "direction": "N",
                    "value": 8
                },
                {
                    "direction": "NE",
                    "value": 9
                },
                {
                    "direction": "E",
                    "value": 4.5
                },
                {
                    "direction": "SE",
                    "value": 3.5
                },
                {
                    "direction": "S",
                    "value": 9.2
                },
                {
                    "direction": "SW",
                    "value": 8.4
                },
                {
                    "direction": "W",
                    "value": 11.1
                },
                {
                    "direction": "NW",
                    "value": 10
                }
            ];


            PCharts.ready(function () {
                // RADAR CHART
                chart5 = new PCharts.AmRadarChart();
                chart5.dataProvider = chartData5;
                chart5.categoryField = "direction";
                chart5.startDuration = 1;

                // TITLE
                chart5.addTitle("Prevailing winds", 15);

                // VALUE AXIS
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.gridType = "circles";
                valueAxis.fillAlpha = 0.05;
                valueAxis.fillColor = "#000000";
                valueAxis.axisAlpha = 0.2;
                valueAxis.gridAlpha = 0;
                valueAxis.fontWeight = "bold";
                valueAxis.minimum = 0;
                chart5.addValueAxis(valueAxis);

                // GRAPH
                var graph = new PCharts.AmGraph();
                graph.lineColor = "#FFCC00";
                graph.fillAlphas = 0.4;
                graph.bullet = "round";
                graph.valueField = "value";
                graph.balloonText = "[[category]]: [[value]] m/s";
                chart5.addGraph(graph);

                // GUIDES
                // blue fill
                var guide = new PCharts.Guide();
                guide.angle = 225;
                guide.tickLength = 0;
                guide.toAngle = 315;
                guide.value = 0;
                guide.toValue = 14;
                guide.fillColor = "#0066CC";
                guide.fillAlpha = 0.6;
                valueAxis.addGuide(guide);

                // red fill
                guide = new PCharts.Guide();
                guide.angle = 45;
                guide.tickLength = 0;
                guide.toAngle = 135;
                guide.value = 0;
                guide.toValue = 14;
                guide.fillColor = "#CC3333";
                guide.fillAlpha = 0.6;
                valueAxis.addGuide(guide);

                // WRITE                
                chart5.write("chartdiv5");
            });
			
		
		
		
		
		
			
			
		/*chart6*/

		var chart6;

            var chartData6 = [
                {
                    "country": "Czech Republic",
                    "litres": 156.9
                },
                {
                    "country": "Ireland",
                    "litres": 131.1
                },
                {
                    "country": "Germany",
                    "litres": 115.8
                },
                {
                    "country": "Australia",
                    "litres": 109.9
                },
                {
                    "country": "Austria",
                    "litres": 108.3
                },
                {
                    "country": "UK",
                    "litres": 99
                }
            ];

            PCharts.ready(function () {
                // RADAR CHART
                chart6 = new PCharts.AmRadarChart();
                chart6.dataProvider = chartData6;
                chart6.categoryField = "country";
                chart6.startDuration = 2;

                // VALUE AXIS
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.axisAlpha = 0.15;
                valueAxis.minimum = 0;
                valueAxis.dashLength = 3;
                valueAxis.axisTitleOffset = 20;
                valueAxis.gridCount = 5;
                chart6.addValueAxis(valueAxis);

                // GRAPH
                var graph = new PCharts.AmGraph();
                graph.valueField = "litres";
                graph.bullet = "round";
                graph.balloonText = "[[value]] litres of beer per year";
                chart6.addGraph(graph);

                // WRITE
                chart6.write("chartdiv6");
            });
			
			
			
			
			
			
			/*chart7*/
			
		
 var chartData7 = [
                {
                    "lineColor": "#ffc321",
                    "date": "2012-01-01",
                    "duration": 408
                },
                {
                    "date": "2012-01-02",
                    "duration": 482
                },
                {
                    "date": "2012-01-03",
                    "duration": 562
                },
                {
                    "date": "2012-01-04",
                    "duration": 379
                },
                {
                    "lineColor": "#fd813c",
                    "date": "2012-01-05",
                    "duration": 501
                },
                {
                    "date": "2012-01-06",
                    "duration": 443
                },
                {
                    "date": "2012-01-07",
                    "duration": 405
                },
                {
                    "date": "2012-01-08",
                    "duration": 309,
                    "lineColor": "#CC0000"
                },
                {
                    "date": "2012-01-09",
                    "duration": 287
                },
                {
                    "date": "2012-01-10",
                    "duration": 485
                },
                {
                    "date": "2012-01-11",
                    "duration": 890
                },
                {
                    "date": "2012-01-12",
                    "duration": 810
                }
            ];
            var chart7;

            PCharts.ready(function () {
                // SERIAL CHART
                chart7 = new PCharts.AmSerialChart();
                chart7.dataProvider = chartData7;
                chart7.pathToImages = "../PCharts/images/";
                chart7.categoryField = "date";
                chart7.dataDateFormat = "YYYY-MM-DD";

                var balloon = chart7.balloon;
                balloon.cornerRadius = 6;
                balloon.adjustBorderColor = false;
                balloon.horizontalPadding = 10;
                balloon.verticalPadding = 10;

                // AXES
                // category axis
                var categoryAxis = chart7.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
                categoryAxis.autoGridCount = false;
                categoryAxis.gridCount = 50;
                categoryAxis.gridAlpha = 0;
                categoryAxis.gridColor = "#000000";
                categoryAxis.axisColor = "#555555";
                // we want custom date formatting, so we change it in next line
                categoryAxis.dateFormats = [{
                    period: 'DD',
                    format: 'DD'
                }, {
                    period: 'WW',
                    format: 'MMM DD'
                }, {
                    period: 'MM',
                    format: 'MMM'
                }, {
                    period: 'YYYY',
                    format: 'YYYY'
                }];

                // as we have data of different units, we create two different value axes
                // Duration value axis
                var durationAxis = new PCharts.ValueAxis();
                durationAxis.gridAlpha = 0.05;
                durationAxis.axisAlpha = 0;
                // the following line makes this value axis to convert values to duration
                // it tells the axis what duration unit it should use. mm - minute, hh - hour...
                durationAxis.duration = "mm";
                durationAxis.durationUnits = {
                    DD: "d. ",
                    hh: "h ",
                    mm: "min",
                    ss: ""
                };
                chart7.addValueAxis(durationAxis);


                // GRAPHS
                // duration graph
                var durationGraph = new PCharts.AmGraph();
                durationGraph.title = "duration";
                durationGraph.valueField = "duration";
                durationGraph.type = "line";
                durationGraph.valueAxis = durationAxis; // indicate which axis should be used
                durationGraph.lineColorField = "lineColor";
                durationGraph.fillColorsField = "lineColor";
                durationGraph.fillAlphas = 0.3;
                durationGraph.balloonText = "[[value]]";
                durationGraph.lineThickness = 1;
                durationGraph.legendValueText = "[[value]]";
                durationGraph.bullet = "square";
                durationGraph.bulletBorderThickness = 1;
                durationGraph.bulletBorderAlpha = 1;
                chart7.addGraph(durationGraph);

                // CURSOR
                var chartCursor = new PCharts.ChartCursor();
                chartCursor.zoomable = false;
                chartCursor.categoryBalloonDateFormat = "YYYY MMM DD";
                chartCursor.cursorAlpha = 0;
                chart7.addChartCursor(chartCursor);


                var chartScrollbar = new PCharts.ChartScrollbar();
                chart7.addChartScrollbar(chartScrollbar);

                // WRITE
                chart7.write("chartdiv7");
            });
			
			
			
			
			
			
			
			/*chart8*/
			
			
			var chart8;
            var chartData8 = [
                {
                    "year": 2009,
                    "income": 23.5,
                    "expenses": 18.1
                },
                {
                    "year": 2010,
                    "income": 26.2,
                    "expenses": 22.8
                },
                {
                    "year": 2011,
                    "income": 30.1,
                    "expenses": 23.9
                },
                {
                    "year": 2012,
                    "income": 29.5,
                    "expenses": 25.1
                },
                {
                    "year": 2013,
                    "income": 30.6,
                    "expenses": 27.2,
                    "dashLengthLine": 5
                },
                {
                    "year": 2014,
                    "income": 34.1,
                    "expenses": 29.9,
                    "dashLengthColumn": 5,
                    "alpha":0.2,
                    "additional":"(projection)"
                }
                
            ];


            PCharts.ready(function () {
                // SERIAL CHART  
                chart8 = new PCharts.AmSerialChart();
                chart8.pathToImages = "../PCharts/images/";
                chart8.dataProvider = chartData8;
                chart8.categoryField = "year";
                chart8.startDuration = 1;
                
                chart8.handDrawn = true;
                chart8.handDrawnScatter = 3;

                // AXES
                // category
                var categoryAxis = chart8.categoryAxis;
                categoryAxis.gridPosition = "start";

                // value
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.axisAlpha = 0;
                chart8.addValueAxis(valueAxis);

                // GRAPHS
                // column graph
                var graph1 = new PCharts.AmGraph();
                graph1.type = "column";
                graph1.title = "Income";
                graph1.lineColor = "#fe7b7b";
                graph1.valueField = "income";
                graph1.lineAlpha = 1;
                graph1.fillAlphas = 1;
                graph1.dashLengthField = "dashLengthColumn";
                graph1.alphaField = "alpha";
                graph1.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
                chart8.addGraph(graph1);

                // line
                var graph2 = new PCharts.AmGraph();
                graph2.type = "line";
                graph2.title = "Expenses";
                graph2.lineColor = "#fcd202";
                graph2.valueField = "expenses";
                graph2.lineThickness = 3;
                graph2.bullet = "round";
                graph2.bulletBorderThickness = 3;
                graph2.bulletBorderColor = "#fcd202";
                graph2.bulletBorderAlpha = 1;
                graph2.bulletColor = "#ffffff";
                graph2.dashLengthField = "dashLengthLine";
                graph2.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
                chart8.addGraph(graph2);

                // LEGEND                
                var legend = new PCharts.AmLegend();
                legend.useGraphSettings = true;
                chart8.addLegend(legend);

                // WRITE
                chart8.write("chartdiv8");
            });
			
			
			
			
			
			/*chart9*/
			
			 var chart9;

            var chartData9 = [
                {
                    "name": "Income A",
                    "open": 0,
                    "close": 11.13,
                    "color": "#54cb6a",
                    "balloonValue": 11.13
                },
                {
                    "name": "Income B",
                    "open": 11.13,
                    "close": 15.81,
                    "color": "#54cb6a",
                    "balloonValue": 4.68
                },
                {
                    "name": "Total Income",
                    "open": 0,
                    "close": 15.81,
                    "color": "#169b2f",
                    "balloonValue": 15.81
                },
                {
                    "name": "Expenses A",
                    "open": 12.92,
                    "close": 15.81,
                    "color": "#cc4b48",
                    "balloonValue": 2.89
                },
                {
                    "name": "Expenses B",
                    "open": 8.64,
                    "close": 12.92,
                    "color": "#cc4b48",
                    "balloonValue": 4.24
                },
                {
                    "name": "Revenue",
                    "open": 0,
                    "close": 8.64,
                    "color": "#1c8ceb",
                    "balloonValue": 11.13
                }
            ];


            PCharts.ready(function () {
                // Waterfall chart is a simple serial chart with some specific settings
                chart9 = new PCharts.AmSerialChart();
                chart9.dataProvider = chartData9;
                chart9.categoryField = "name";
                chart9.columnWidth = 0.6;
                chart9.startDuration = 1;

                // AXES
                // Category
                var categoryAxis = chart9.categoryAxis;
                categoryAxis.gridAlpha = 0.1;
                categoryAxis.axisAlpha = 0;
                categoryAxis.gridPosition = "start";

                // Value
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.gridAlpha = 0.1;
                valueAxis.axisAlpha = 0;
                chart9.addValueAxis(valueAxis);

                // GRAPH                          
                var graph = new PCharts.AmGraph();
                graph.valueField = "close";
                graph.openField = "open";
                graph.type = "column";
                graph.lineAlpha = 1;
                graph.lineColor = "#BBBBBB";
                graph.colorField = "color";
                graph.fillAlphas = 0.8;
                graph.balloonText = "<span style='color:[[color]]'>[[category]]</span><br><span style='font-size:13px;'><b>$[[balloonValue]] Mln</b></span>";
                graph.labelText = "$[[balloonValue]]";
                chart9.addGraph(graph);

                // Trend lines used for connectors
                var trendLine = new PCharts.TrendLine();
                trendLine.initialCategory = "Income A";
                trendLine.finalCategory = "Income B";
                trendLine.initialValue = 11.13;
                trendLine.finalValue = 11.13;
                trendLine.lineColor = "#888888";
                trendLine.dashLength = 3;
                chart9.addTrendLine(trendLine);

                trendLine = new PCharts.TrendLine();
                trendLine.initialCategory = "Income B";
                trendLine.finalCategory = "Expenses A";
                trendLine.initialValue = 15.81;
                trendLine.finalValue = 15.81;
                trendLine.lineColor = "#888888";
                trendLine.dashLength = 3;
                chart9.addTrendLine(trendLine);

                trendLine = new PCharts.TrendLine();
                trendLine.initialCategory = "Expenses A";
                trendLine.finalCategory = "Expenses B";
                trendLine.initialValue = 12.92;
                trendLine.finalValue = 12.92;
                trendLine.lineColor = "#888888";
                trendLine.dashLength = 3;
                chart9.addTrendLine(trendLine);

                trendLine = new PCharts.TrendLine();
                trendLine.initialCategory = "Expenses B";
                trendLine.finalCategory = "Revenue";
                trendLine.initialValue = 8.64;
                trendLine.finalValue = 8.64;
                trendLine.lineColor = "#888888";
                trendLine.dashLength = 3;
                chart9.addTrendLine(trendLine);

                // WRITE                  
                chart9.write("chartdiv9");
            });
			
			
			
			
			
			
			
			/*chart10*/
			
			
			var chart10;

            var chartData10 = [
                {
                    "year": "2003",
                    "europe": 2.5,
                    "namerica": 2.5,
                    "asia": 2.1,
                    "lamerica": 0.3,
                    "meast": 0.2,
                    "africa": 0.1
                },
                {
                    "year": "2004",
                    "europe": 2.6,
                    "namerica": 2.7,
                    "asia": 2.2,
                    "lamerica": 0.3,
                    "meast": 0.3,
                    "africa": 0.1
                },
                {
                    "year": "2005",
                    "europe": 2.8,
                    "namerica": 2.9,
                    "asia": 2.4,
                    "lamerica": 0.3,
                    "meast": 0.3,
                    "africa": 0.1
                }
            ];

            PCharts.ready(function () {
                // SERIAL CHART
                chart10 = new PCharts.AmSerialChart();
                chart10.dataProvider = chartData10;
                chart10.categoryField = "year";

                // sometimes we need to set margins manually
                // autoMargins should be set to false in order chart to use custom margin values
                chart10.autoMargins = false;
                chart10.marginLeft = 0;
                chart10.marginRight = 0;
                chart10.marginTop = 30;
                chart10.marginBottom = 40;

                // AXES
                // category
                var categoryAxis = chart10.categoryAxis;
                categoryAxis.gridAlpha = 0;
                categoryAxis.axisAlpha = 0;
                categoryAxis.gridPosition = "start";

                // value
                var valueAxis = new PCharts.ValueAxis();
                valueAxis.stackType = "100%"; // this line makes the chart 100% stacked
                valueAxis.gridAlpha = 0;
                valueAxis.axisAlpha = 0;
                valueAxis.labelsEnabled = false;
                chart10.addValueAxis(valueAxis);

                // GRAPHS
                // first graph                          
                var graph = new PCharts.AmGraph();
                graph.title = "Europe";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "europe";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#fe7b7b";
                chart10.addGraph(graph);

                // second graph              
                graph = new PCharts.AmGraph();
                graph.title = "North America";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "namerica";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#ffedbc";
                chart10.addGraph(graph);

                // third graph              
                graph = new PCharts.AmGraph();
                graph.title = "Asia-Pacific";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "asia";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#aff3bc";
                chart10.addGraph(graph);

                // fourth graph
                graph = new PCharts.AmGraph();
                graph.title = "Latin America";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "lamerica";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#69A55C";
                chart10.addGraph(graph);

                // fifth graph  
                graph = new PCharts.AmGraph();
                graph.title = "Middle-East";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "meast";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#B5B8D3";
                chart10.addGraph(graph);

                // sixth graph
                graph = new PCharts.AmGraph();
                graph.title = "Africa";
                graph.labelText = "[[percents]]%";
                graph.balloonText = "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>";
                graph.valueField = "africa";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                graph.lineColor = "#F4E23B";
                chart10.addGraph(graph);

                // LEGEND                  
                var legend = new PCharts.AmLegend();
                legend.borderAlpha = 0.2;
                legend.horizontalGap = 10;
                legend.autoMargins = false;
                legend.marginLeft = 20;
                legend.marginRight = 20;
                chart10.addLegend(legend);

                // WRITE                  
                chart10.write("chartdiv10");
            });

            // this method makes chart 2D/3D
            function setDepth() {
                if (document.getElementById("rb1").checked) {
                    chart10.depth3D = 0;
                    chart10.angle = 0;
                } else {
                    chart10.depth3D = 25;
                    chart10.angle = 30;
                }
                chart10.validateNow();
            }
			
			
			