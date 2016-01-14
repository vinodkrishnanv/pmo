(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', AccountController);
	AccountController.$inject = ['$scope','$log','$http','UserService', '$location', 'FlashService'];
	function AccountController($scope,$log,$http,UserService, $location,FlashService) {
		var vm = this;

        vm.saveaccount = saveaccount;
        vm.getValue = getValue;
        vm.save = save;
        var rowIndexTemp = 0;
  var colKeyTemp = '';
  
  $scope.cellValue ='';
  
  function getValue( cellValue, colKey, rowIndex ){
    	$('#cellModal').modal('show');
    	$scope.cellValue = cellValue; 
    	colKeyTemp= colKey;
    	rowIndexTemp = rowIndex;
  };
  function save(){
     $scope.myData[rowIndexTemp][colKeyTemp] = $scope.cellValue;
  }
  
  $scope.myData = UserService.getAccounts();
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
  $scope.gridOptions = {
    data: 'myData',
    enableCellSelection : true,
		enableCellEditOnFocus : true,
		enableRowSelection : false,
		enableColumnResize : true,
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

    ]
  };
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
    $scope.data = {
    repeatSelect: null,
    statusSelect: null,
    managerSelect: null,
    availableOptions: [
      {id: '1', name: 'OMC'},
      {id: '2', name: 'Salesforce'},
      {id: '3', name: 'PMD'}
    ],
    availableStatusOptions: [
      {id: '1', name: 'Confirmed'},
      {id: '2', name: 'Tentative'}
    ],
    availableManagerOptions: [
      {id: '1', name: 'Varun'},
      {id: '2', name: 'Prince'},
      {id: '3', name: 'Raj'}
    ],
   };
        $scope.message = 'Look! I am an Account page.';
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
    }
    

})();