﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResourcesController', ResourcesController)
        .controller('ResourcesEditController', ResourcesEditController)
        .controller('ResourcesDeleteController', ResourcesDeleteController);
        //.controller('RowEditCtrl', RowEditCtrl)
        //.service('RowResourceEditor', RowResourceEditor)
	ResourcesController.$inject = ['$rootScope','$state','$cookieStore','$timeout','$scope','$log','$http','UserService', '$location', 'FlashService','$routeParams'];
	function ResourcesController($rootScope,$state,$cookieStore,$timeout,$scope,$log,$http,UserService, $location,FlashService,$routeParams) {

        var vm = this;
        $rootScope.shownav=true;
        $rootScope.rootAccess =  $cookieStore.get("rootAccess");
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
    //$scope.clickResourceHandler = RowResourceEditor.editRow;
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
                        // UserService.getResources()
                          // .then(function (response) {
                            $state.go("resources", {}, {reload: true});
                           // });
                    } else {
                      if(response.data.error.employee_id){
                        FlashService.Error('Employee ID ' +response.data.error.employee_id[0]);
                      }
                      if(response.data.error.heirarchy_name){
                        FlashService.Error('Heirarchy Name ' +response.data.error.heirarchy_name[0]);
                      }
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
$scope.$scope = $scope;
vm.gridOptions = {
   enableColumnResizing: true,
   enableCellEdit: false,
    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><a href="#/resources/edit/{{row.entity.id}}"><button type="button" class="btn btn-xs btn-primary" ><i class="fa fa-edit"></i></button></a>&nbsp<a href="#/resources/delete/{{row.entity.id}}"  ><button type="button" class="btn btn-xs danger-class"  ><i  class="fa fa-trash"></i></button></a></div>', width: 70 },
    { name: 'employee_name', width: 260 },
      { name: 'employee_id' , width: 130},
      { name: 'role' , width: 180},
      // { name: 'heirarchy_id' , width: 140},
      { name: 'skill', enableColumnResizing: true },
      //{ name: 'skill_id' },
    ]

  };
  $scope.removeaccount = function(id) {
        console.log(id);
      }; 
  //vm.gridOptions.columnDefs[6].visible = false;
  UserService.getResources()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }

ResourcesEditController.$inject = ['$scope','$state','$rootScope','$log','$http','UserService', '$location', 'FlashService','$timeout','$routeParams'];
function ResourcesEditController($scope,$state,$rootScope,$log,$http,UserService, $location,FlashService,$timeout,$routeParams) {
  var vm=this;
   vm.saveresource = saveresource;
  var splits=$location.url().toString().split("/");
  console.log(splits);
  UserService.getResource(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.data) {
                        vm.resource = response.data;
                        $scope.resmodel=vm.resource.skill_id;
                        // $scope.resmodel=vm.resource.resmodel;
                        //$scope.sermodel=vm.account.sermodel=
                       // vm.account.start_date=$scope.minEndDate;
             // //vm.account.end_date=$scope.maxEndDate;
             // vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
                      } 
                  });

                  function saveresource() {
            vm.dataLoading = true;
            vm.resource.resmodel=$scope.resmodel;


for(var i = 0; i < $rootScope.availableHeirarchyOptions.length; i++)
{
  if($rootScope.availableHeirarchyOptions[i].id == vm.resource.heirarchy_id)
  {
    vm.resource.role= $rootScope.availableHeirarchyOptions[i].role_name;
  }
}


            vm.resource.id=splits[splits.length - 1];
            UserService.editResource(vm.resource)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        // UserService.getResources()
                          // .then(function (response) {
                            $state.go("resources", {}, {reload: true});
                           // });
                    } else {
                      if(response.data.error.employee_id){
                        FlashService.Error('Employee ID ' +response.data.error.employee_id[0]);
                      }
                      if(response.data.error.heirarchy_name){
                        FlashService.Error('Heirarchy Name  ' +response.data.error.heirarchy_name[0]);
                      }
                        vm.dataLoading = false;
                    }
                });
        }
  
  
      

  }



ResourcesDeleteController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
function ResourcesDeleteController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  var vm=this;
   vm.deleteresource = deleteresource;
   $scope.deltext="";
  var splits=$location.url().toString().split("/");
  UserService.deleteDependency({"type":"resource","data":splits[splits.length - 1]})
                  .then(function (response) {
                    if(response.data){
                      $scope.deltext="The data you are trying to delete has a dependency and will be deleted if you proceed";
                    }
                  });
  function deleteresource() {
          vm.dataLoading = true;
              UserService.deleteResource(splits[splits.length - 1])
                  .then(function (response) {
                    console.log(response.status);
                      if (response.status==204) {
                          FlashService.Success('Delete successful', true);
                          vm.dataLoading = false;
                          $state.go("resources", {}, {reload: true});
                          // UserService.getAccounts()
                          //   .then(function (response) {
                          //      vm.gridOptions.data = response.data;
                          //    });
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                      // $state.go("account");
                  });
              
          }
  }

     
    
})();

