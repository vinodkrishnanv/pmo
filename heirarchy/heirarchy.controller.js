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
 .controller('HeirarchyController', HeirarchyController)

.controller('RowEditCtrl', RowEditCtrl)

.service('RowEditor', RowEditor);
	HeirarchyController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function HeirarchyController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {
		var vm = this;
        vm.editRow = RowEditor.editRow;
        vm.saveheirarchy = saveheirarchy;
        var rowIndexTemp = 0;
  var colKeyTemp = '';
  $scope.clickHandler = RowEditor.editRow;
  vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'heirarchy_name' },
    ]

  };
  
    /*$http.get('jsonFiles/data.json')

    .success(function (data) {

      vm.gridOptions.data = data;

    });*/
      UserService.getHeirarchies()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
     console.log(vm.gridOptions);
    $scope.cellValue ='';
    function saveheirarchy() {
            vm.dataLoading = true;
            var unit={"heirarchy_name" : vm.heirarchy}
            UserService.saveHeirarchies(unit)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getHeirarchies()
                         .then(function (response) {
                          vm.gridOptions.data = response.data;
                         });
                    } else {
                        FlashService.Error('Heirarchy Name ' + response.data.error.unit_name[0]);
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

      templateUrl: 'heirarchy/edit-heirarchy-modal.html',

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