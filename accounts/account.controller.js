  (function () {
      'use strict';

      angular
          .module('app')
          /*.constant('PersonSchema', {

    type: 'object',

    properties: {

      accountName: { type: 'string', title: 'Account Name' },

      organisationalUnit: { type: 'string', title: 'Organisational Unit' },

      noOfResources: { type: 'string', title: 'No Of Resources' },

      manager: { type: 'string', title: 'Manager' },

      status: { type: 'string', title: 'Status' }

    }

  })*/
   .controller('AccountController', AccountController)
   .controller('AccountEditController', AccountEditController)

  .controller('RowAccountEditCtrl', RowAccountEditCtrl)

  .service('RowAccountEditor', RowAccountEditor);
  	AccountController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
  	function AccountController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  		var vm = this;
        $rootScope.shownav=true;
          vm.clickHandlers = RowAccountEditor.editAccountRow;
          vm.saveaccount = saveaccount;
          vm.getaccount = getaccount;
          vm.getServices = getServices;
          
          var rowIndexTemp = 0;
    var colKeyTemp = '';
    var availOrgan ='';
    var availableStatus = "";
    var availableManagers = "";  
    //clickHandlers = RowAccountEditor.editAccountRow;
    $rootScope.availableStatus =  [
        {id: 'Confirmed', name: 'Confirmed'},
        {id: 'Tentative', name: 'Tentative'}
      ];
      $scope.datepickerPopupConfig = {
  datepickerPopup: "MMM d, yyyy",
  closeOnDateSelection: true,
  appendToBody: false,
  showButtonBar: false
}
$scope.open = function() {
    $scope.opened = true;
  };

$scope.datepickerConfig = {
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  datepickerMode: 'day',
  minMode: 'day',
  maxMode: 'year',
  showWeeks: false,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
}
    $rootScope.availableReqTypes =  [
        {id: 'IMPLEMENTATION', name: 'IMPLEMENTATION'},
        {id: 'CAMPAIGN SERVICES', name: 'CAMPAIGN SERVICES'},
        {id: 'ADD-ONS', name: 'ADD-ONS'}
      ];
    $rootScope.availableRegionTypes =  [
        {id: 'APAC', name: 'APAC'},
        {id: 'EMEA', name: 'EMEA'},
        {id: 'US', name: 'US'},
      ];
      $rootScope.availableContactType =  [
        {id: 'Client', name: 'Client'},
        {id: 'IBM', name: 'IBM'},
        {id: 'Oracle', name: 'Oracle'},
      ];
      $rootScope.availableSowStatus =  [
        {id: 'Lead', name: 'Lead'},
        {id: 'SOW Signed', name: 'SOW Signed'},
        {id: 'SOW Not Signed', name: 'SOW Not Signed'},
        {id: 'Closed', name: 'Closed'},
        {id: 'Execution', name: 'Execution'},
      ];
      $rootScope.availableAnticipatedValueCurrency =  [
        {id: 'INR', name: 'INR'},
        {id: 'USD', name: 'USD'},
      ];
      
      var d=new Date();
    vm.gridOptions = {

      columnDefs: [
      { name: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><a href="#/account/edit/{{row.entity.id}}"><button type="button" class="btn btn-xs btn-primary"  ><i class="fa fa-edit"></i></button></a></div>', width: 60 },
      { name: 'account_name',minWidth: 260 },
      { name: 'account_code',minWidth: 130 },
        { name: 'organisational_unit_code' ,displayName:'OU Code',minWidth: 130},
        { name: 'services' ,minWidth: 260},
        {  name: 'resource_needed',minWidth: 180 },
        { name: 'manager' ,minWidth: 260},
        { name: 'status',minWidth: 180 },
        { name: 'start_date' ,minWidth: 180},
        { name: 'end_date'  ,minWidth: 180},
        { name: 'resource_allocated'  ,minWidth: 200},
        { name: 'request_type' ,minWidth: 260},
        { name: 'region' ,minWidth: 160},
        { name: 'location' ,minWidth: 200},
        { name: 'contract_type' ,minWidth: 160},
        { name: 'customer_contact' ,minWidth: 260},
        { name: 'other_persons' ,minWidth: 260},
        { name: 'other_sales_email' ,minWidth: 260},
        { name: 'sow_status' ,minWidth: 260},
        { name: 'comments' ,minWidth: 400},
        { name: 'anticipated_value' ,minWidth: 160},
      ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterCsvFilename: 'Accounts_'+d.toDateString().split(' ').join('_')+'.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
          return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
          docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
          docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
          return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }

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
      $scope.accountrangeDates = [];
      $scope.accountrange;
      $scope.reload = function () {
          $scope.selectRange = 1;
          $scope.minEndDate=Math.min.apply(Math, $scope.accountrangeDates);
          $scope.maxEndDate=Math.max.apply(Math, $scope.accountrangeDates);
      }
      $rootScope.sersettings  = $scope.sersettings  = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'service_code',
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
              vm.account.start_date=$scope.minEndDate;
              vm.account.end_date=$scope.maxEndDate;
              if(vm.account.anticipated_value && vm.account.anticipated_value_currency){
                vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
              }
              UserService.saveAccount(vm.account)
                  .then(function (response) {
                      if (response.data) {
                          FlashService.Success('Save successful', true);
                          vm.dataLoading = false;
                          $state.go("account", {}, {reload: true});
                          // UserService.getAccounts()
                          //   .then(function (response) {
                          //      vm.gridOptions.data = response.data;
                          //    });
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                  });
          }
          function getaccount(aid) {
             UserService.getAccounts()
                            .then(function (response) {
                               vm.gridOptions.data = response.data;
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
      availableReqTypes: $rootScope.availableReqTypes,
      availableRegionTypes: $rootScope.availableRegionTypes,
      availableContactType: $rootScope.availableContactType,
      availableSowStatus: $rootScope.availableSowStatus,
      availableAnticipatedValueCurrency: $rootScope.availableAnticipatedValueCurrency,
     };
          $scope.message = 'Look! I am an Account page.';
          //if($routeParams.param1){
            console.log($location.url());
            // 
            // vm.account.account_name="Test";
          //}

  }

  RowAccountEditor.$inject = ['$rootScope', '$modal','UserService'];

  function RowAccountEditor($rootScope, $modal,UserService) {
    var service = {};

    service.editAccountRow = editAccountRow;

    

    function editAccountRow(grid, row) {
      
      console.log(row);
      $modal.open({

        templateUrl: 'accounts/edit-modal.html',

        controller: ['$modalInstance', '$rootScope','PersonSchema', 'grid', 'row','UserService', RowAccountEditCtrl],

        controllerAs: 'vm',

        resolve: {

          grid: function () { return grid; },

          row: function () { return row; }

        }

      });

    }

    

    return service;

  }
  function RowAccountEditCtrl($modalInstance, $rootScope,PersonSchema, grid, row ,UserService) {

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







AccountEditController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
function AccountEditController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  var vm=this;
   vm.saveaccount = saveaccount;
   vm.getServices=getServices;
   
  var splits=$location.url().toString().split("/");
  UserService.getAccount(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.data) {
                        vm.account = response.data;
                        if(vm.account.anticipated_value){
                        var sp=vm.account.anticipated_value.split(" ");
                        vm.account.anticipated_value=sp[0];
                        vm.account.anticipated_value_currency=sp[1];
                        }
                        UserService.getServices(vm.account.organisational_unit_id)
                          .then(function (response) {
                              if (response.data.success) {
                                $scope.serdata = response.data.success;
                                UserService.getAccountServices(splits[splits.length - 1])
                                    .then(function (response) {
                                      $scope.sermodel=response.data.service_id;

                                    });
                              } 
                          });
                        //$scope.sermodel=vm.account.sermodel=
                       // vm.account.start_date=$scope.minEndDate;
             // //vm.account.end_date=$scope.maxEndDate;
             // vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
                      } 
                  });
                   UserService.getManagers()
                           .then(function (response) {
                            $rootScope.availableManagers = response.data.success;
                            $scope.data.availableManagerOptions = $rootScope.availableManagers;
                           });
  function saveaccount() {
              vm.dataLoading = true;
              vm.account.sermodel=$scope.sermodel;
              vm.account.start_date=$scope.minEndDate;
              vm.account.end_date=$scope.maxEndDate;
              if(vm.account.anticipated_value && vm.account.anticipated_value_currency){
                vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
              }
              UserService.saveAccount(vm.account)
                  .then(function (response) {
                      if (response.data) {
                          FlashService.Success('Save successful', true);
                          vm.dataLoading = false;
                          $state.go("account", {}, {reload: true});
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

          function getServices(){
        UserService.getServices(vm.account.organisational_unit_id)
                  .then(function (response) {
                      if (response.data.success) {
                        $scope.serdata = response.data.success;
                      } 
                  });
      }
      

  }











      }
  )();