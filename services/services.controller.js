(function () {
    'use strict';

    angular
        .module('app')
        .controller('ServicesController', ServicesController);
	ServicesController.$inject = ['$rootScope','$timeout','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function ServicesController($rootScope,$timeout,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {

        var vm = this;
        var jsonstring="";
        vm.saveservice = saveservice;
        var rowIndexTemp = 0;
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
            UserService.saveService(vm.service)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getAllServices()
                          .then(function (response) {
                             vm.gridOptions.data = response.data;
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
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'service_name' },
      { name: 'service_code' },
    ]

  };
  UserService.getAllServices()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }






     
    
})();

