(function () {
    'use strict';

    angular
        .module('app')
        .controller('ServiceProjectController', ServiceProjectController)
        .controller('ServiceProjectEditController', ServiceProjectEditController)
        .controller('ServiceProjectDeleteController', ServiceProjectDeleteController);
  ServiceProjectController.$inject = ['$rootScope','$timeout','$cookieStore','$scope','$state','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
  function ServiceProjectController($rootScope,$timeout,$cookieStore,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor) {

        var vm = this;
        $rootScope.shownav=true;
        $rootScope.rootAccess =  $cookieStore.get("rootAccess");
        var jsonstring="";
        vm.saveserviceproject = saveserviceproject;
        var rowIndexTemp = 0;
        $scope.accountmodel = [];
        $scope.sermodel = [];
        UserService.getAccounts().then(function (response) {
        $scope.accountdata = response.data;
        });
        $scope.accountsettings = {
          smartButtonMaxItems: 1,
          scrollableHeight: '200px',
          scrollable: true,
          enableSearch: true,
          displayProp:'account_name',
          idProp:'id',
          externalIdProp:'id',
          selectionLimit: 1,
          showUncheckAll :false,
          closeOnSelect:true
            
        };
        $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  $scope.popup2={};
      $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.popup1={};
     $scope.sersettings = {
          smartButtonMaxItems: 1,
          scrollableHeight: '200px',
          scrollable: true,
          enableSearch: true,
          displayProp:'service_code',
          idProp:'id',
          externalIdProp:'',
          selectionLimit: 1,
          showUncheckAll :false,
          closeOnSelect:true
            
        };
        $scope.accountEvents = {
                             onItemSelect: function(item) {
                                  FlashService.clearMessage();
                                  $scope.sermodel= [];
                                  UserService.getAccountServices(item.id).then(function (response){
                                    $scope.serdata = response.data.service_id ;
                                  });
                                  },
                                };
        
    

     function saveserviceproject() {
            vm.dataLoading = true;
            vm.serpro.account_id=$scope.accountmodel.id;
            vm.serpro.service_id=$scope.sermodel.id;
            UserService.saveServiceProject(vm.serpro)
                .then(function (response) {
                    if (response.data.id) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getAllServiceProjects()
                          .then(function (response) {
                            $state.go("serviceproject", {}, {reload: true});
                              vm.gridOptions.data = response.data;
                           });
                    } else {
                      // if(response.data.error.service_name){
                      //   FlashService.Error('Project Name ' +response.data.error.service_name[0]);

                      // }
                      // if(response.data.error.service_code){
                        FlashService.Error('Something happened . Please try again');
                        
                      // }
                        vm.dataLoading = false;
                    }
                });
        }

   


vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><a href="#/project/edit/{{row.entity.id}}"><button type="button" class="btn btn-xs btn-primary" ><i class="fa fa-edit"></i></button></a>&nbsp<a href="#/services/delete/{{row.entity.id}}"  ><button type="button" class="btn btn-xs danger-class"  ><i  class="fa fa-trash"></i></button></a></div>', width: 70 },
    { name: 'project_name',minWidth: 260 },
    { name: 'project_code' ,minWidth: 130},
    { name: 'start_date' ,minWidth: 260},
    { name: 'end_date' ,minWidth: 260},
    ]

  };
  UserService.getAllServiceProjects()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }



ServiceProjectEditController.$inject = ['$scope','$log','$state','$http','UserService', '$location', 'FlashService','$timeout','$routeParams'];
function ServiceProjectEditController($scope,$log,$state,$http,UserService, $location,FlashService,$timeout,$routeParams) {
  var vm=this;
   vm.saveserviceproject = saveserviceproject;
  var splits=$location.url().toString().split("/");
  console.log(splits);
  UserService.getProject(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.data) {
                        vm.serpro = response.data;
                        $scope.accountmodel.id=vm.serpro.account_id;
                        UserService.getAccountServices(vm.serpro.account_id).then(function (response){
                                    $scope.serdata = response.data.service_id ;
                                  });
                        $scope.sermodel.id=vm.serpro.service_id;
                       // vm.account.start_date=$scope.minEndDate;
             // //vm.account.end_date=$scope.maxEndDate;
             // vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
                      } 
                  });
                  vm.gridOptions = {

                      columnDefs: [
                      { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><a href="#/project/edit/{{row.entity.id}}"><button type="button" class="btn btn-xs btn-primary" ><i class="fa fa-edit"></i></button></a>&nbsp<a href="#/services/delete/{{row.entity.id}}"  ><button type="button" class="btn btn-xs danger-class"  ><i  class="fa fa-trash"></i></button></a></div>', width: 70 },
                      { name: 'project_name' },
                      { name: 'project_code' },
                      { name: 'start_date' },
                      { name: 'end_date' },
                      ]

                    };

                  function saveserviceproject() {
            vm.dataLoading = true;
            vm.serpro.account_id=$scope.accountmodel.id;
            vm.serpro.service_id=$scope.sermodel.id;
            vm.serpro.id = splits[splits.length - 1];
            UserService.editServiceProject(vm.serpro)
                .then(function (response) {
                    if (response.data.id) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getAllServiceProjects()
                          .then(function (response) {
                            $state.go("serviceproject", {}, {reload: true});
                              vm.gridOptions.data = response.data;
                           });
                    } else {
                      // if(response.data.error.service_name){
                      //   FlashService.Error('Project Name ' +response.data.error.service_name[0]);

                      // }
                      // if(response.data.error.service_code){
                         FlashService.Error('Something happened . Please try again');
                        
                      // }
                        vm.dataLoading = false;
                    }
                });
        }
  
  
      

  }

  ServiceProjectDeleteController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
function ServiceProjectDeleteController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  var vm=this;
   vm.deleteservice = deleteservice;
   
  var splits=$location.url().toString().split("/");
  $scope.deltext="";
  UserService.deleteDependency({"type":"service","data":splits[splits.length - 1]})
                  .then(function (response) {
                    if(response.data){
                      $scope.deltext="The data you are trying to delete has a dependency and will be deleted if you proceed";
                    }
                  });                 
  function deleteservice() {
              vm.dataLoading = true;
              UserService.deleteService(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.status==204) {
                          FlashService.Success('Delete successful', true);
                          vm.dataLoading = false;
                          $state.go("services", {}, {reload: true});
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                  });
          }
  }


     
    
})();

