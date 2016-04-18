(function () {
    'use strict';

    angular
        .module('app')
        .controller('ServicesController', ServicesController)
        .controller('ServicesEditController', ServicesEditController);
	ServicesController.$inject = ['$rootScope','$timeout','$scope','$state','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function ServicesController($rootScope,$timeout,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor) {

        var vm = this;
        $rootScope.shownav=true;
        var jsonstring="";
        vm.saveservice = saveservice;
        var rowIndexTemp = 0;
        $scope.sermodel = [];
          $scope.sersettings = {
            smartButtonMaxItems: 1,
            showUncheckAll :false,
            selectionLimit: 1,
            scrollableHeight: '200px',
              scrollable: true,
            enableSearch: true,
            displayProp:'unit_code',
            idProp:'id',
            externalIdProp:'',
            closeOnBlur:true,
              
          };
        UserService.getUnits().then(function (response) {
          $scope.serdata = response.data;
        });
    //     $rootScope.availableSkillOptions = [
    //   {id: 'Technical', skill_type: 'Technical'},
    //   {id: 'Marketing', skill_type: 'Marketing'}
    // ];

        /*$scope.data = {
                          repeatSelect: null,
                          statusSelect: null,
                          managerSelect: null,
                          availableSkillOptions: $rootScope.availableSkillOptions,
                         };*/
        $timeout(function () {
        UserService.getAllServices()
                         .then(function (response) {
                          $scope.data = {
                          repeatSelect: null,
                          statusSelect: null,
                          managerSelect: null,
                          availableServicesOptions: $rootScope.availableServicesOptions,
                         };
                         });
                       },3000);
    $scope.clickHandler = RowEditor.editRow;
		$scope.eventDetails = eventDetails;
    $scope.message = 'Look! I am a Service page.';
        
    $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }

     function saveservice() {
            vm.dataLoading = true;
            vm.service.unit_code=$scope.sermodel.id;
            UserService.saveService(vm.service)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getAllServices()
                          .then(function (response) {
                            $state.go("services", {}, {reload: true});
                             // vm.gridOptions.data = response.data;
                           });
                    } else {
                        FlashService.Error(response.data.error.skill_name[0]);
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
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ui-sref="services.edit({id:{{row.entity.id}}})"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'service_name' },
      { name: 'service_code' },
    ]

  };
  UserService.getAllServices()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }



ServicesEditController.$inject = ['$scope','$log','$state','$http','UserService', '$location', 'FlashService','$timeout','$routeParams'];
function ServicesEditController($scope,$log,$state,$http,UserService, $location,FlashService,$timeout,$routeParams) {
  var vm=this;
   vm.saveservice = saveservice;
  var splits=$location.url().toString().split("/");
  console.log(splits);
  UserService.getService(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.data) {
                        vm.service = response.data;
                        //$scope.sermodel=vm.account.sermodel=
                       // vm.account.start_date=$scope.minEndDate;
             // //vm.account.end_date=$scope.maxEndDate;
             // vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
                      } 
                  });

                  function saveservice() {
            vm.dataLoading = true;
            vm.service.unit_code=$scope.sermodel.id;
            vm.service.id = splits[splits.length - 1];
            UserService.editService(vm.service)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getServices()
                          .then(function (response) {
                            $state.go("services", {}, {reload: true});
                             // vm.gridOptions.data = response.data;
                           });
                    } else {
                        FlashService.Error(response.data);
                        vm.dataLoading = false;
                    }
                });
        }
  
  
      

  }


     
    
})();

