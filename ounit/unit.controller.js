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
 .controller('UnitController', UnitController)

.controller('RowEditCtrl', RowEditCtrl)

.service('RowEditor', RowEditor);
	UnitController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function UnitController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {
		var vm = this;
        vm.editRow = RowEditor.editRow;
        vm.saveunit = saveunit;
        var rowIndexTemp = 0;
  var colKeyTemp = '';
  var availOrgan ='';
  var availableStatus = "";
  var availableManagers = "";  
  $scope.clickHandler = RowEditor.editRow;
  vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 80 },
    { name: 'unit_name' ,width:300 },
    ]

  };
  
    /*$http.get('jsonFiles/data.json')

    .success(function (data) {

      vm.gridOptions.data = data;

    });*/
      UserService.getUnits()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
     console.log(vm.gridOptions);
    $scope.cellValue ='';
    function saveunit() {
            vm.dataLoading = true;
            var unit={"unit_name" : vm.unit}
            UserService.saveUnit(unit)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getUnits()
                         .then(function (response) {
                          vm.gridOptions.data = response.data;
                         });
                    } else {
                        FlashService.Error('Organisational Unit Name ' + response.data.error.unit_name[0]);
                        vm.dataLoading = false;
                    }
                });
        }
    $scope.IsVisible = false;
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }
}

RowEditor.$inject = ['$rootScope', '$modal','UserService'];

function RowEditor($rootScope, $modal,UserService) {

  var service = {};

  service.editRow = editRow;

  

  function editRow(grid, row) {
    console.log(grid);
    console.log(row);
    $modal.open({

      templateUrl: 'ounit/edit-unit-modal.html',

      controller: ['$modalInstance', '$rootScope','PersonSchema', 'grid', 'row','UserService', RowEditCtrl],

      controllerAs: 'vm',

      resolve: {

        grid: function () { return grid; },

        row: function () { return row; }

      }

    });

  }

  

  return service;

}
function RowEditCtrl($modalInstance, $rootScope,PersonSchema, grid, row ,UserService) {

  var vm = this;
  vm.schema = PersonSchema;
  vm.entity = angular.copy(row.entity);
  console.log(vm.entity);
  vm.save = save;
  function save() {
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
    UserService.editUnit(row.entity);

  }
}
    }
)();