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
  	AccountController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout'];
  	function AccountController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor,$timeout) {
  		var vm = this;
          vm.editRow = RowEditor.editRow;
          vm.saveaccount = saveaccount;
          vm.getServices = getServices;
          
          var rowIndexTemp = 0;
    var colKeyTemp = '';
    var availOrgan ='';
    var availableStatus = "";
    var availableManagers = "";  
    $scope.clickHandler = RowEditor.editRow;
    $rootScope.availableStatus =  [
        {id: 'Confirmed', name: 'Confirmed'},
        {id: 'Tentative', name: 'Tentative'}
      ];
    vm.gridOptions = {

      columnDefs: [
      { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
      { name: 'account_name' },
        { name: 'organisational_unit_name' },
        { name: 'services' },
        {  name: 'resource_needed' },
        { name: 'manager' },
        { name: 'status' },
      ]

    };
    $timeout(function () {
          UserService.getUnits()
                           .then(function (response) {
                            console.log(response.data)
                            $rootScope.availOrgan = response.data;
                           $scope.data.availableOptions= $rootScope.availOrgan;
                           });
                         },3000);
    $timeout(function () {
          UserService.getManagers()
                           .then(function (response) {
                            $rootScope.availableManagers = response.data.success;
                            $scope.data.availableManagerOptions = $rootScope.availableManagers;
                            console.log($scope.data.availableManagerOptions);
                            //$scope.resdata = response.data;
                           });
                         },3000);
      UserService.getAccounts()
                            .then(function (response) {
                               vm.gridOptions.data = response.data;
                             });
      $scope.sermodel=[];
      $scope.cellValue ='';
      $rootScope.sersettings  = $scope.sersettings  = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'service_name',
    idProp:'id',
    externalIdProp:'id',
    closeOnBlur:true
  };
      function getServices(){
        UserService.getServices(vm.account.organisational_unit_id)
                  .then(function (response) {
                      if (response.data.success) {
                        $scope.serdata = response.data.success;
                      } 
                  });
      }
      function saveaccount() {
              vm.dataLoading = true;
              vm.account.sermodel=$scope.sermodel;
              UserService.saveAccount(vm.account)
                  .then(function (response) {
                      if (response.data) {
                          FlashService.Success('Save successful', true);
                          vm.dataLoading = false;
                          UserService.getAccounts()
                            .then(function (response) {
                               vm.gridOptions.data = response.data;
                             });
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
      availableOptions: $rootScope.availOrgan,
      availableStatusOptions: $rootScope.availableStatus,
      availableManagerOptions: $rootScope.availableManagers,
     };
          $scope.message = 'Look! I am an Account page.';

  }

  RowEditor.$inject = ['$rootScope', '$modal','UserService'];

  function RowEditor($rootScope, $modal,UserService) {

    var service = {};

    service.editRow = editRow;

    

    function editRow(grid, row) {
      console.log(grid);
      console.log(row);
      $modal.open({

        templateUrl: 'accounts/edit-modal.html',

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
    vm.items = $rootScope.availOrgan;
    vm.statusitems = $rootScope.availableStatus;
    vm.manitems = $rootScope.availableManagers;
    vm.save = save;
    function save() {
      row.entity = angular.extend(row.entity, vm.entity);
      $modalInstance.close(row.entity);
      UserService.editAccount(row.entity);
    }
  }
      }
  )();