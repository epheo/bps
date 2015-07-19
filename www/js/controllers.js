angular.module('bps.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AnalyseCtrl', function($scope) {
  $scope.activities = [
    { title: 'Record 1', id: 1 },
    { title: 'Record 2', id: 2 },
    { title: 'Record 3', id: 3 },
    { title: 'Record 4', id: 4 },
    { title: 'Record 5', id: 5 },
    { title: 'Record 6', id: 6 }
  ];
})

.controller('ActivityCtrl', function($scope, $stateParams) {

    nv.addGraph(function() {
        var chart = nv.models.lineChart();
        var fitScreen = false;
        var width = 550;
        var height = 300;
        var zoom = .8;

        chart.useInteractiveGuideline(true);
        chart.xAxis
            .tickFormat(d3.format(',r'));

        chart.lines.dispatch.on("elementClick", function(evt) {
            console.log(evt);
        });

        chart.yAxis
            .axisLabel('HeartRate (bpm)')
            .tickFormat(d3.format(',r'));


        d3.select('#chart1 svg')
            .attr('perserveAspectRatio', 'xMinYMid')
            .attr('width', width)
            .attr('height', height)
            .datum(retrieveData());

        setChartViewBox();
        resizeChart();

        nv.utils.windowResize(resizeChart);

        d3.select('#zoomIn').on('click', zoomIn);
        d3.select('#zoomOut').on('click', zoomOut);


        function setChartViewBox() {
            var w = width * zoom,
                h = height * zoom;

            chart
                .width(w)
                .height(h);

            d3.select('#chart1 svg')
                .attr('viewBox', '0 0 ' + w + ' ' + h)
                .transition().duration(500)
                .call(chart);
        }

        function zoomOut() {
            zoom += .25;
            setChartViewBox();
        }

        function zoomIn() {
            if (zoom <= .5) return;
            zoom -= .25;
            setChartViewBox();
        }

        // This resize simply sets the SVG's dimensions, without a need to recall the chart code
        // Resizing because of the viewbox and perserveAspectRatio settings
        // This scales the interior of the chart unlike the above
        function resizeChart() {
            var container = d3.select('#chart1');
            var svg = container.select('svg');

            if (fitScreen) {
                // resize based on container's width AND HEIGHT
                var windowSize = nv.utils.windowSize();
                svg.attr("width", windowSize.width);
                svg.attr("height", windowSize.height);
            } else {
                // resize based on container's width
                var aspect = chart.width() / chart.height();
                var targetWidth = parseInt(container.style('width'));
                svg.attr("width", targetWidth);
                svg.attr("height", Math.round(targetWidth / aspect));
            }
        }
        return chart;
    });


    function retrieveData() {

        var partner1 = [
                { x: 1434402430, y:	74},
                { x: 1434402490, y:	78},
                { x: 1434402550, y:	69},
                { x: 1434402610, y:	70},
                { x: 1434402670, y:	96},
                { x: 1434402730, y:	70},
                { x: 1434402790, y:	82},
                { x: 1434402850, y:	93},
                { x: 1434402910, y:	82},
                { x: 1434402970, y:	96},
                { x: 1434403030, y:	98},
                { x: 1434403090, y:	95},
                { x: 1434403150, y:	94},
                { x: 1434403210, y:	122},
                { x: 1434403270, y:	143},
                { x: 1434403330, y:	145},
                { x: 1434403390, y:	86},
                { x: 1434403450, y:	86},
                { x: 1434403510, y:	78},
                { x: 1434403570, y:	69},
                { x: 1434403630, y:	70},
                { x: 1434403690, y:	69},
                { x: 1434403750, y:	70} ];

        var partner2 = [
                { x: 1434402430, y:	70},
                { x: 1434402490, y:	73},
                { x: 1434402550, y:	72},
                { x: 1434402610, y:	82},
                { x: 1434402670, y:	93},
                { x: 1434402730, y:	82},
                { x: 1434402790, y:	96},
                { x: 1434402850, y:	83},
                { x: 1434402910, y:	84},
                { x: 1434402970, y:	82},
                { x: 1434403030, y:	88},
                { x: 1434403090, y:	96},
                { x: 1434403150, y:	98},
                { x: 1434403210, y:	95},
                { x: 1434403270, y:	94},
                { x: 1434403330, y:	122},
                { x: 1434403390, y:	143},
                { x: 1434403450, y:	145},
                { x: 1434403510, y:	86},
                { x: 1434403570, y:	86},
                { x: 1434403630, y:	78},
                { x: 1434403690, y:	69},
                { x: 1434403750, y:	70} ];

        return [
            {
                values: partner1,
                key: "Partner 1",
                color: "#ff7f0e"
            },
            {
                values: partner2,
                key: "Partner 2",
                color: "#2ca02c"
            }
        ];
    }
})
.controller('RecordCtrl',['$scope', '$interval',  function($scope, $interval) {
        $scope.heartRate = 69;

        $scope.heartRateHistory = [{
            values: [],
            key: "You",
            color: "#ff7f0e"
        }];

        var promise = $interval(function() {
            // Rnd bpm 40..140
            var hr = Math.floor((Math.random() * 100) + 40);
            // Update scope
            $scope.heartRate = hr;
            //Check if object was correctly initialized
            if ($scope.heartRateHistory[0]) {
                var hrValues = $scope.heartRateHistory[0].values;
                var point ={
                    x: Date.now(),
                    y: hr
                };
                hrValues.push(point);
                console.log(hrValues);
                // Remove 1st element of array if too long
                if (hrValues.length > 10) {
                    hrValues.shift();
                }
            }

            // Refresh graph
            loadGraph();
        },1000);

        // Destroy interval service correctly
        $scope.$on('$destroy', function() {
            if(angular.isDefined(promise)){
                $interval.cancel(promise);
                promise = undefined;
            }
        });

        var chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart.xAxis
            .tickFormat(d3.format(',r'));

        chart.lines.dispatch.on("elementClick", function(evt) {
            console.log(evt);
        });

        chart.yAxis
            .axisLabel('HeartRate (bpm)')
            .tickFormat(d3.format(',r'));

        function loadGraph() {
            console.log('Loading Graph...');
            d3.select('#realTimeChart svg')
                .datum($scope.heartRateHistory)
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        }

        nv.addGraph(loadGraph);
    }]);
