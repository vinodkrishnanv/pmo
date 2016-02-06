﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResourcesController', ResourcesController)
        .controller('RowEditCtrl', RowEditCtrl)
        .service('RowResourceEditor', RowResourceEditor);
	ResourcesController.$inject = ['$rootScope','$timeout','$scope','$log','$http','UserService', '$location', 'FlashService','RowResourceEditor'];
	function ResourcesController($rootScope,$timeout,$scope,$log,$http,UserService, $location,FlashService,RowResourceEditor) {

        var vm = this;
        var jsonstring="";
        vm.saveresource = saveresource;
        //vm.getSkilldata = getSkilldata;
        $scope.resmodel = [];
$rootScope.ressettings = $scope.ressettings = {
  scrollableHeight: '200px',
    scrollable: true,
  enableSearch: true,
  displayProp:'skill_name',
  idProp:'id',
  externalIdProp:'id',
  closeOnBlur:true
};
$scope.data = {
                          repeatSelect: null,
                          statusSelect: null,
                          managerSelect: null,
                          
                         };
        var rowIndexTemp = 0;
        $timeout(function () {
        UserService.getHeirarchies()
                         .then(function (response) {
                          $rootScope.availableHeirarchyOptions = response.data;
                         $scope.data.availableHeirarchyOptions= $rootScope.availableHeirarchyOptions;
                         });
                       },3000);
        $timeout(function () {
        UserService.getSkills()
                         .then(function (response) {
                          $rootScope.availableSkillOptions = response.data;
                          $scope.data.availableSkillOptions = $rootScope.availableSkillOptions;
                          var skillArray = {}; 
                          for(var i = 0; i < response.data.length; i++) {
                          var obj = response.data[i];
                          skillArray[obj.id] = obj.skill_name;
                          }
                          $scope.resdata = response.data;
                         });
                       },3000);
    $scope.clickResourceHandler = RowResourceEditor.editRow;
		$scope.eventDetails = eventDetails;
        $scope.message = 'Look! I am a Resource page.';

       /* function getSkilldata(){
          return "are";
        }*/
        
    $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }

     function saveresource() {
            vm.dataLoading = true;
            vm.resource.resmodel=$scope.resmodel;
            UserService.saveResource(vm.resource)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getResources()
                          .then(function (response) {
                             vm.gridOptions.data = response.data;
                           });
                    } else {
                        FlashService.Error(response.data.error.heirarchy_name[0]);
                        vm.dataLoading = false;
                    }
                });
        }

    function eventDetails(event){
       $scope.selected = event;
       $scope.query = event;
      
    }

    $scope.example13model = [];
$scope.example13settings = {
	scrollableHeight: '200px',
    scrollable: true,
	enableSearch: true,
    
};

vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickResourceHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'employee_name' },
      { name: 'employee_id' },
      { name: 'role' },
      { name: 'heirarchy_id' },
      { name: 'skill' },
      //{ name: 'skill_id' },
    ]

  };
  //vm.gridOptions.columnDefs[6].visible = false;
  UserService.getResources()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }



RowResourceEditor.$inject = ['$rootScope', '$modal','UserService'];

function RowResourceEditor($rootScope, $modal,UserService) {

  var service = {};

  service.editRow = editRow;

  

  function editRow(grid, row) {
    $modal.open({

      templateUrl: 'resources/edit-resource-modal.html',

      controller: ['$modalInstance', '$rootScope', 'grid', 'row','UserService','$timeout', RowEditCtrl],

      controllerAs: 'vm',

      resolve: {

        grid: function () { return grid; },

        row: function () { return row; }

      }

    });

  }

  

  return service;

}
function RowEditCtrl($modalInstance, $rootScope, grid, row ,UserService, $timeout ) {
  //getSkilldata=ResourcesController.getSkilldata;
  var vm = this;
  vm.entity = angular.copy(row.entity);
  vm.entity.resdata=$rootScope.availableSkillOptions;
  vm.entity.ressettings=$rootScope.ressettings;
  vm.items = $rootScope.availableHeirarchyOptions;
  UserService.getResource(row.entity.id)
                          .then(function (response) {                          
                            vm.entity.employee_id = response.data.employee_id;
                            vm.entity.employee_name=response.data.employee_name;
                            vm.entity.heirarchy_id=response.data.heirarchy_id;
                            vm.entity.role=response.data.role;
                            vm.entity.skill_id=response.data.skill_id;

                           // vm.entity.resdata=$rootScope.availableSkillOptions; 
                            //vm.entity.skill_id=[{"id":2},{"id":3}];

                            //vm.entity.ressettings=$rootScope.ressettings;
                            //vm.items = $rootScope.availableHeirarchyOptions;
                           // console.log(vm.entity )
                            
                           });
  vm.save = save;
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
    var resource = {};
    resource.id=vm.entity.id;
    resource.employee_id=vm.entity.employee_id;
    resource.employee_name=vm.entity.employee_name;
    resource.heirarchy_id=vm.entity.heirarchy_id;
    resource.resmodel=vm.entity.skill_id;
    resource.role=vm.entity.role;
    UserService.editResource(resource);

  }

}


     
    
})();

