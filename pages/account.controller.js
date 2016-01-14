(function () {
    'use strict';

    angular
        .module('app')
        .constant('PersonSchema', {

  type: 'object',

  properties: {

    accountName: { type: 'string', title: 'Account Name' },

    organisationalUnit: { type: 'string', title: 'Organisational Unit' },

    noOfResources: { type: 'string', title: 'No Of Resources' },

    manager: { type: 'string', title: 'Manager' },

    status: { type: 'string', title: 'Status' }

  }

})
 .controller('AccountController', AccountController)

.controller('RowEditCtrl', RowEditCtrl)

.service('RowEditor', RowEditor);
	AccountController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function AccountController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {
		var vm = this;
        vm.editRow = RowEditor.editRow;
        vm.saveaccount = saveaccount;
        //vm.getValue = getValue;
        //vm.save = save;
        var rowIndexTemp = 0;
  var colKeyTemp = '';
  var availOrgan ='';
  var availableStatus = "";
  var availableManagers = "";  
  $scope.clickHandler = RowEditor.editRow;
  vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'accountName' },
      { name: 'organisationalUnit' },
      { name: 'noOfResources' },
      { name: 'manager' },
      { name: 'status' },
    ]

  };
  
    /*$http.get('jsonFiles/data.json')

    .success(function (data) {

      vm.gridOptions.data = data;

    });*/
     vm.gridOptions.data = UserService.getAccounts();
    //console.log(vm.gridOptions);
    $scope.cellValue ='';
    function saveaccount() {
            vm.dataLoading = true;
            UserService.saveAccount(vm.account)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;

                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

    $scope.IsVisible = false;
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }
    $rootScope.availOrgan = [
      {id: 'OMC', name: 'OMC'},
      {id: 'Sales force', name: 'Sales force'},
      {id: 'P M D', name: 'P M D'}
    ],
    $rootScope.availableStatus =  [
      {id: 'Confirmed', name: 'Confirmed'},
      {id: 'Tentative', name: 'Tentative'}
    ],
    $rootScope.availableManagers = [
      {id: 'Varun', name: 'Varun'},
      {id: 'Prince', name: 'Prince'},
      {id: 'Raj', name: 'Raj'}
    ];
    $scope.data = {
    repeatSelect: null,
    statusSelect: null,
    managerSelect: null,
    availableOptions: $rootScope.availOrgan,
    availableStatusOptions: $rootScope.availableStatus,
    availableManagerOptions: $rootScope.availableManagers,
   };
        $scope.message = 'Look! I am an Account page.';

}

RowEditor.$inject = ['$rootScope', '$modal'];

function RowEditor($rootScope, $modal) {

  var service = {};

  service.editRow = editRow;

  

  function editRow(grid, row) {
    console.log(grid);
    console.log(row);
    $modal.open({

      templateUrl: 'pages/edit-modal.html',

      controller: ['$modalInstance', '$rootScope','PersonSchema', 'grid', 'row', RowEditCtrl],

      controllerAs: 'vm',

      resolve: {

        grid: function () { return grid; },

        row: function () { return row; }

      }

    });

  }

  

  return service;

}
function RowEditCtrl($modalInstance, $rootScope,PersonSchema, grid, row) {

  var vm = this;

  

  vm.schema = PersonSchema;

  vm.entity = angular.copy(row.entity);

  vm.form = [ 

    'accountName',

    {

      'key': 'organisationalUnit',
    "type": 'select',
    "titleMap": $rootScope.availOrgan,
      'title': 'Organisational Unit'

    },

    'noOfResources',
    
    {

      'key': 'manager',
    "type": 'select',
   "titleMap": $rootScope.availableManagers,

      'title': 'Manager'

    },

    {

      'key': 'status',
    "type": 'select',
   "titleMap": $rootScope.availableStatus,

      'title': 'Status'

    },

  ];

  

  vm.save = save;

  

  function save() {

    // Copy row values over

    row.entity = angular.extend(row.entity, vm.entity);

    $modalInstance.close(row.entity);

  }

}

  
  
  /*function getValue( cellValue, colKey, rowIndex ){
    	$('#cellModal').modal('show');
    	$scope.cellValue = cellValue; 
    	colKeyTemp= colKey;
    	rowIndexTemp = rowIndex;
  };
  function save(){
     $scope.myData[rowIndexTemp][colKeyTemp] = $scope.cellValue;
  }*/
  
  //$scope.myData = UserService.getAccounts();
  /*$scope.myData = [
    {accountName: "food", repeatSelect: 'Bolgogi' ,managerSelect: 'Bosdlgogi'},
    {accountName: "foasdod", repeatSelect: 'Boaslgogi' ,managerSelect: 'Bosdlgogi'},
    {accountName: "foasod", repeatSelect: 'Bolgasogi' ,managerSelect: 'Bosdasdflgogi'},
    {accountName: "fasood", repeatSelect: 'Bolasgogi' ,managerSelect: 'Bosdlgogi'}
  ];
  $scope.gridOptions = {
    data: 'myData',
};*/
  /*$scope.myData = [
    {famous: "food", name: 'Bolgogi'},
    {famous: "Music", name: 'Kangnam style'},
    {famous: "athlete1", name: 'Yuna Kim'},
    {famous: "athlete2", name: 'Hide On Bush'}
  ];*/
  /*$scope.gridOptions = {
    data: 'myData',
    rowTemplate:'<div style="height: 100%" ng-class="{green: row.getProperty(\'age\') < 30}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                           '<div ng-cell></div>' +
                     '</div></div>',
   /* enableCellSelection : true,
		enableCellEditOnFocus : true,*/
		//enableRowSelection : true,
		/*enableColumnResize : true,
		multiSelect: false,
    columnDefs: [
        {
            field: 'accountName', 
            enableCellEdit : true,
            editableCellTemplate: 'pages/celltemplate.html'
        },
        {
          field: 'repeatSelect', 
          enableCellEdit : true,
          editableCellTemplate: 'pages/celltemplate.html'
  
        },
        {
          field: 'managerSelect', 
          enableCellEdit : true,
          editableCellTemplate: 'pages/celltemplate.html'
  
        }

    ]*/
  
        
       // $scope.myData = UserService.getAccounts();
        /*$scope.myData = [{name: "Moroni", age: 50},
                 {name: "Tiancum", age: 43},
                 {name: "Jacob", age: 27},
                 {name: "Nephi", age: 29},
                 {name: "Enos", age: 34}];*/
		//$scope.gridOptions = { data: 'myData' };
		/*$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };	
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };*/
    //}
    }
)();