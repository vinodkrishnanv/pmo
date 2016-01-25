(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResourcesController', ResourcesController)
        .controller('RowEditCtrl', RowEditCtrl)
        .service('RowEditor', RowEditor);
	ResourcesController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function ResourcesController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {

        var vm = this;
        vm.saveresource = saveresource;
        var rowIndexTemp = 0;
        $rootScope.availableHeirarchyOptions = [
      {id: 'Manager', name: 'Manager'},
      {id: 'Developer', name: 'Developer'},
      {id: 'Team Lead', name: 'Team Lead'}
    ];
    $scope.clickHandler = RowEditor.editRow;
    $scope.data = {
    repeatSelect: null,
    statusSelect: null,
    managerSelect: null,
    availableHeirarchyOptions: $rootScope.availableHeirarchyOptions,
   };
		$scope.eventDetails = eventDetails;
        $scope.message = 'Look! I am a Resource page.';
        $scope.items = [{
        'name': 'Item 1'
    }, {
        'name': 'Item 2'
    }, {
        'name': 'Account 3'
    }, {
        'name': 'Account 4'
    }, {
        'name': 'Item 5'
    }, {
        'name': 'Item 6'
    }, {
        'name': 'User 7'
    }, {
        'name': 'User 8'
    }, {
        'name': 'Item 9'
    }, {
        'name': 'Item 10'
    }, {
        'name': 'Item 11'
    }, {
        'name': 'Item 12'
    }, {
        'name': 'Item 13'
    }, {
        'name': 'Item 14'
    }, {
        'name': 'User 15'
    }, {
        'name': 'User 16'
    }, {
        'name': 'Person 17'
    }, {
        'name': 'Person 18'
    }, {
        'name': 'Person 19'
    }, {
        'name': 'Item 20'
    }, ];
    $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }

     function saveresource() {
            vm.dataLoading = true;
            UserService.saveResource(vm.resource)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        vm.gridOptions.data = UserService.getResources();
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

    function eventDetails(event){
       $scope.selected = event;
       $scope.query = event;
      
    }

    $scope.example13model = [];
$scope.example13data = [
    {id: 1, label: "David"},
    {id: 2, label: "Jhon"},
    {id: 3, label: "Lisa"},
    {id: 4, label: "Nicole"},
    {id: 5, label: "Danny"}];

$scope.example13settings = {
	scrollableHeight: '200px',
    scrollable: true,
	enableSearch: true,
    
};

vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'employeeName' },
      { name: 'employeeId' },
      { name: 'role' },
      { name: 'heirarchy' },
    ]

  };
  vm.gridOptions.data = UserService.getResources();
    }


RowEditor.$inject = ['$rootScope', '$modal','UserService'];

function RowEditor($rootScope, $modal,UserService) {

  var service = {};

  service.editRow = editRow;

  

  function editRow(grid, row) {
    $modal.open({

      templateUrl: 'pages/edit-resource-modal.html',

      controller: ['$modalInstance', '$rootScope', 'grid', 'row','UserService', RowEditCtrl],

      controllerAs: 'vm',

      resolve: {

        grid: function () { return grid; },

        row: function () { return row; }

      }

    });

  }

  

  return service;

}
function RowEditCtrl($modalInstance, $rootScope, grid, row ,UserService) {

  var vm = this;
  vm.entity = angular.copy(row.entity);
  vm.items = $rootScope.availableHeirarchyOptions;
  vm.save = save;
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
    UserService.editAccount(row.entity);

  }

}


     
    
})();

