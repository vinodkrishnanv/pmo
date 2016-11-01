(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportsController', ReportsController);
//   angular
//   .module('app')
//   .component('modalComponent', {
//   templateUrl: 'myModalContent.html',
//   bindings: {
//     resolve: '<',
//     close: '&',
//     dismiss: '&'
//   },
//   controller: function () {
//     var $ctrl = this;

//     $ctrl.$onInit = function () {
//       $ctrl.items = $ctrl.resolve.items;
//       $ctrl.selected = {
//         item: $ctrl.items[0]
//       };
//     };

//     $ctrl.ok = function () {
//       $ctrl.close({$value: $ctrl.selected.item});
//     };

//     $ctrl.cancel = function () {
//       $ctrl.dismiss({$value: 'cancel'});
//     };
//   }
// });
	ReportsController.$inject = ['$rootScope','$timeout','$cookieStore','$scope','$state','$log','$http','UserService', '$location', 'FlashService','RowEditor','$uibModal','$document'];
	function ReportsController($rootScope,$timeout,$cookieStore,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$uibModal, $document) {

        var vm = this;

        $scope.gridOptions = {};
        $scope.gridOptions.enableHorizontalScrollbar = 0; 
  $rootScope.shownav=true;
  $rootScope.rootAccess =  $cookieStore.get("rootAccess");
  $rootScope.pmAccess =  $cookieStore.get("pmAccess");
  $scope.gridOptions.columnDefs = [
    { field:'id', width:50 },
    { field:'name' , width:100 },
    { field:'hours', width:80 },
    { field: 'bullet', cellTemplate: 'reports/bullet-cell.html',width:350},
    // { field: 'spark', cellTemplate: 'reports/donut-cell.html'}

    
    // { name:'Column Name', cellTemplate: '<spark-line-chart values="grid.appScope.valuesStacked"></spark-line-chart>'}
  ];
  // $scope.gridOptions.rowHeight = 400;
    $scope.knobvalue = 65;
  $scope.knoboptions = {
    size: 300
    //other options
  };
  $scope.moused = function(id)
  {
    data.forEach(function (d) {
      if (d.id == id){
        $scope.piedata = d.spark.data;
      }
    });
   $scope.popoverIsVisible = true;
  // $scope.popoverIsVisible = !$scope.popoverIsVisible;
  // popoverIsVisible
   }
  $scope.mousedleave = function() {
  $scope.popoverIsVisible = false; 
};

$scope.hidePopover = function () {
  $scope.popoverIsVisible = false;
};
	$scope.gridOptions.rowHeight=50;
  var data = [
    {
        "name": "Ethel Price",
        "id": 1,
        "hours": "40",
        "company": "Enersol",
        "spark":{
        	"data":[{"key":"a","y":2},{"key":"sadasdadas","y":2}]
        },
        "bullet":{
        	"data":{
            // "title": "Revenue",
            // "subtitle": "US$, in thousands",
            "ranges": [0,0,300],
            "measures": [220],
            "markers": [],
            "color":"yellow",
            // "tooltip":{"hidden":true}
        },
        }
    },
    {
        "name": "Claudine Neal",
        "id": 2,
        "hours": "35",
        "company": "Sealoud",
        "spark":{
        	"data":[{"key":1,"y":3},{"key":1,"y":3}]
        },
        "bullet":{
        	"data":{
            // "title": "Revenue",
            // "subtitle": "US$, in thousands",
            "ranges": [0,0,300],
            "measures": [220],
            "markers": [],
            "color":"yellow",
            // "tooltip":{"enabled":false}
        },
        }
    },
    {
        "name": "Beryl Rice",
        "id": 3,
        "hours": "35",
        "company": "Velity",
        "spark":{
        	"data":[{"key":1,"y":4},{"key":1,"y":4}],
        	// "options":{"chart":""}
        },
        "bullet":{
        	"data":{
            // "title": "Revenue",
            // "subtitle": "US$, in thousands",
            "ranges": [0,0,300],
            "measures": [220],
            "markers": [],
            "color":"yellow",
            
        },
        }
    }
];

      data.forEach(function (d) {
        // d.spark = {
        //   options: {
        //    chart: {
        //       type: 'pieChart',
        //       donut:true,
        //       height: 200,
        //       width: 350,
        //       x: function(d) { return d.x; },
        //       y: function(d) { return d.y; }
        //     }
        //   },
        //   // data: []
        // };
		d.spark.options = {};
		d.bullet.options = {};
        d.spark.options.chart =  {
              type: 'pieChart',
              donut:true,
              height: 200,
              width: 350,
              showLegend: false,
              arcsRadius: {
              	inner: 0,
              	outer: 0.9,
              },
              // pie: {
              //       startAngle: function(d) { return d.startAngle/2  },
              //       endAngle: function(d) { return d.endAngle/2}
              //   },
                duration: 500,
              x: function(d) { return d.key; },
              y: function(d) { return d.y; }
            };
             d.bullet.options.chart =  {
                type: 'bulletChart',
                transitionDuration: 500,
                width: 350,
                // tooltip: {
                // 	"enabled":false,
                // 	"hidden":true,
                // }
                tooltip: {
                  duration: 0,
                  snapDistance: 0,
                  classes: null,
                  chartContainer: null,
                  enabled: true,
                  hideDelay: 200,
                  headerEnabled: false,
                  fixedTop: null,
                  offset: {
                    left: 0,
                    top: 0
                  },
                  hidden: true,
                  data: null,
                  // id: "nvtooltip-9999"
                },
             };
          // data: []
        // Generate random X values
        // for (var i=0; i<10; i++) {
        //   d.spark.data.push({ x: i, y: Math.floor(Math.random()*(100-1+1)+1) });
        // }
      });
      console.log(data);

      $scope.pieoptions = {
            chart: {
                type: 'pieChart',
              donut:true,
              height: 400,
              width: 400,
              showLegend: false,
              arcsRadius: {
                inner: 0,
                outer: 0.9,
              },
              // pie: {
              //       startAngle: function(d) { return d.startAngle/2  },
              //       endAngle: function(d) { return d.endAngle/2}
              //   },
                duration: 500,
              x: function(d) { return d.key; },
              y: function(d) { return d.y; }
            }
        };

        
      
      $scope.gridOptions.data = data;
    }



     
    
})();

