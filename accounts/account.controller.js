  (function () {
      'use strict';

      angular
          .module('app')
   .controller('AccountController', AccountController)
   .controller('AccountEditController', AccountEditController)
   .controller('AccountDeleteController', AccountDeleteController)

  // .controller('RowAccountEditCtrl', RowAccountEditCtrl)

  // .service('RowAccountEditor', RowAccountEditor);
  	AccountController.$inject = ['$rootScope','$cookieStore','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
  	function AccountController($rootScope,$cookieStore,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  		var vm = this;
        $rootScope.shownav=true;
        $rootScope.rootAccess =  $cookieStore.get("rootAccess");
          // vm.clickHandlers = RowAccountEditor.editAccountRow;
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
  $scope.dateOptions = {
    // dateDisabled: disabled,
    showWeeks: false,
    formatYear: 'yy',
    // maxDate: new Date(2020, 5, 22),
    // minDate: new Date(),
    startingDay: 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.serEvents = {
                             onItemSelect: function(item) {
                                              $scope.popup1[item.id] = {
                                                  opened:false
                                                };
                                                $scope.popup2[item.id] = {
                                                  opened:false
                                                };
                                            },
                            onItemDeselect: function(item) {
                              if(confirm("Are you sure you want to remove the mapping")){
                                            delete vm.ser[item.id];
                              }else{
                                $scope.sermodel.push(item);
                              }
                                           },
                     };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.popup1={};
  
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  $scope.popup2={};
  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  $scope.popup3={};
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  $scope.popup4={};

  $scope.add = function(serdet,ser) {
    vm.ser[ser.id]=angular.copy(serdet);
  }
  
  // $scope.popup1[1].opened=false;
  
  // $scope.popup1 = {
  //   opened: false
  // };

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
      { name: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><a href="#/account/edit/{{row.entity.id}}"><button type="button" class="btn btn-xs btn-primary"  ><i class="fa fa-edit"></i></button></a>&nbsp<a href="#/account/delete/{{row.entity.id}}"  ><button type="button" class="btn btn-xs danger-class"  ><i  class="fa fa-trash"></i></button></a></div>', width: 70 },
      { name: 'account_name',minWidth: 260, enableCellEdit: true},
        { name: 'organisational_unit_code' ,displayName:'OU Code',minWidth: 130},
        { name: 'services' ,minWidth: 260},
        // {  name: 'resource_needed',minWidth: 180 },
        { name: 'manager' ,minWidth: 260},
        { name: 'status',minWidth: 180 },
        // { name: 'start_date' ,minWidth: 180},
        // { name: 'end_date'  ,minWidth: 180},
        // { name: 'resource_allocated'  ,minWidth: 200},
        // { name: 'request_type' ,minWidth: 260},
        { name: 'region' ,minWidth: 160},
        { name: 'location' ,minWidth: 200},
        // { name: 'contract_type' ,minWidth: 160},
        // { name: 'customer_contact' ,minWidth: 260},
        // { name: 'other_persons' ,minWidth: 260},
        // { name: 'other_sales_email' ,minWidth: 260},
        // { name: 'sow_status' ,minWidth: 260},
        { name: 'comments' ,minWidth: 400},
        { name: 'account_lob' ,minWidth: 400},
        { name: 'overall_health' ,minWidth: 400},
        { name: 'account_contact' ,minWidth: 400},
        { name: 'csm_contact' ,minWidth: 400},
        { name: 'sales_contact' ,minWidth: 400},
        // { name: 'anticipated_value' ,minWidth: 160},
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
                            $rootScope.availOrgan = response.data;
                           $scope.data.availableOptions= $rootScope.availOrgan;
                           });
                         },3000);
    $timeout(function () {
          UserService.getManagers()
                           .then(function (response) {
                            $rootScope.availableManagers = response.data.success;
                            $scope.data.availableManagerOptions = $rootScope.availableManagers;
                            //$scope.resdata = response.data;
                           });
                         },3000);
      UserService.getAccounts()
                            .then(function (response) {
                               vm.gridOptions.data = response.data;
                             });
                            $scope.account=[];
                            $scope.service=[];
      $scope.sermodel=[];
      $scope.serIndModel={};
      $scope.cellValue ='';
      $scope.service.accountrangeDates = [];
      $scope.accountrange;
      $scope.serIndEvents = {
                             onItemSelect: function(item) {
                                              vm.service=angular.copy(vm.ser[item.id]);
                     }};
      $scope.reload = function () {
          $scope.selectRange = 1;
          $scope.minEndDate=Math.min.apply(Math, $scope.accountrangeDates);
          $scope.maxEndDate=Math.max.apply(Math, $scope.accountrangeDates);
      };
      // function removeaccount() {
      //   alert("sdsd");
      // };
      $scope.removeaccount = function(id) {
        alert(id);
      }; 
      vm.ser=[];
      $rootScope.sersettings  = $scope.sersettings  = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'service_code',
    idProp:'id',
    externalIdProp:'',
    closeOnBlur:true
  };
  $rootScope.serIndsettings  = $scope.serIndsettings  = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'service_code',
    idProp:'id',
    externalIdProp:'',
    closeOnBlur:true,
    selectionLimit: 1,
  };
      function getServices(){
        if(vm.account){
          UserService.getServices(vm.account.organisational_unit_id)
                  .then(function (response) {
                      if (response.data.success) {
                        $scope.serdata = response.data.success;
                      } 
                  });
        }
        
      }
      // function saveaccount() {
      //         vm.dataLoading = true;
      //         vm.account.sermodel=$scope.sermodel;
      //         vm.account.start_date=$scope.minEndDate;
      //         vm.account.end_date=$scope.maxEndDate;
      //         if(vm.account.anticipated_value && vm.account.anticipated_value_currency){
      //           vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
      //         }
      //         UserService.saveAccount(vm.account)
      //             .then(function (response) {
      //                 if (response.data) {
      //                     FlashService.Success('Save successful', true);
      //                     vm.dataLoading = false;
      //                     $state.go("account", {}, {reload: true});
      //                     // UserService.getAccounts()
      //                     //   .then(function (response) {
      //                     //      vm.gridOptions.data = response.data;
      //                     //    });
      //                 } else {
      //                     FlashService.Error(response.message);
      //                     vm.dataLoading = false;
      //                 }
      //             });
      //     }
      function saveaccount() {
              vm.dataLoading = true;
              var newserv=[];
              var count=0;
              for (var k in vm.ser){
                if (vm.ser.hasOwnProperty(k)) {
                     vm.ser[k].id=k;
                     newserv.push(vm.ser[k]);
                     count++;
                }
            }
            if(count==$scope.sermodel.length){
              vm.account.services=newserv;
              UserService.saveAccount(vm.account)
                  .then(function (response) {
                      if (response.data) {
                          FlashService.Success('Save successful', true);
                          vm.dataLoading = false;
                          $state.go("account", {}, {reload: true});
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                  });
                }else{
                  FlashService.Error("Fill all the details for selected services");
                }
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

  }

  // RowAccountEditor.$inject = ['$rootScope', '$modal','UserService'];

  // function RowAccountEditor($rootScope, $modal,UserService) {
  //   var service = {};

  //   service.editAccountRow = editAccountRow;

    

  //   function editAccountRow(grid, row) {
      
  //     console.log(row);
  //     $modal.open({

  //       templateUrl: 'accounts/edit-modal.html',

  //       controller: ['$modalInstance', '$rootScope','PersonSchema', 'grid', 'row','UserService', RowAccountEditCtrl],

  //       controllerAs: 'vm',

  //       resolve: {

  //         grid: function () { return grid; },

  //         row: function () { return row; }

  //       }

  //     });

  //   }

    

  //   return service;

  // }
  // function RowAccountEditCtrl($modalInstance, $rootScope,PersonSchema, grid, row ,UserService) {

  //   var vm = this;
  //   vm.schema = PersonSchema;
  //   vm.entity = angular.copy(row.entity);
  //   vm.items = $rootScope.availOrgan;
  //   vm.statusitems = $rootScope.availableStatus;
  //   vm.manitems = $rootScope.availableManagers;
  //   vm.save = save;
  //   function save() {
  //     row.entity = angular.extend(row.entity, vm.entity);
  //     $modalInstance.close(row.entity);
  //     UserService.editAccount(row.entity);
  //   }
  // }







AccountEditController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
function AccountEditController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  var vm=this;
   vm.saveaccount = saveaccount;
   vm.getServices=getServices;
   vm.account = [];
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
                                      vm.ser = {};
                                      angular.forEach(response.data.services, function (obj) {
                                        console.log(obj[0].service_id);
                                        console.log(obj[0]);
                                        vm.ser[obj[0].service_id]=obj[0];
                                     });
                                      console.log(typeof(vm.ser));
                                      // console.log(vm.ser.keys().length);

                                    });
                              } 
                          });
                      } 
                  });
                   UserService.getManagers()
                           .then(function (response) {
                            $rootScope.availableManagers = response.data.success;
                            $scope.data.availableManagerOptions = $rootScope.availableManagers;
                           });
                           $scope.serIndEvents = {
                             onItemSelect: function(item) {
                                              vm.service=angular.copy(vm.ser[item.id]);
                                            },
                     };


                     function saveaccount() {
              vm.dataLoading = true;
              var newserv=[];
              var count=0;
              for (var k in vm.ser){
                if (vm.ser.hasOwnProperty(k)) {
                     vm.ser[k].id=k;
                     newserv.push(vm.ser[k]);
                     count++;
                }
            }
            if(count==$scope.sermodel.length){
              vm.account.services=newserv;
              UserService.saveAccount(vm.account)
                  .then(function (response) {
                      if (response.data) {
                          FlashService.Success('Save successful', true);
                          vm.dataLoading = false;
                          $state.go("account", {}, {reload: true});
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                  });
                }else{
                  FlashService.Error("Fill all the details for selected services");
                }
          }
 $scope.add = function(serdet,ser) {
    vm.ser[ser.id]=angular.copy(serdet);
  }

  $scope.keylength = function(a) {
   var count = 0;
  var i;

  for (i in a) {
    if (a.hasOwnProperty(i)) {
        count++;
    }
  }
  return count;
  }
  $scope.fill = function(a) {
   var count = 0;
  var i;
  var keys = Object.keys(a);
  console.log(keys);
  console.log(keys[keys.length-1]);
  console.log(vm.ser[keys[keys.length-1]]);
  vm.service=angular.copy(vm.ser[keys[0]]);
  }
  
  // function saveaccount() {
  //             vm.dataLoading = true;
  //             vm.account.sermodel=$scope.sermodel;
  //             vm.account.start_date=$scope.minEndDate;
  //             vm.account.end_date=$scope.maxEndDate;
  //             if(vm.account.anticipated_value && vm.account.anticipated_value_currency){
  //               vm.account.anticipated_value = vm.account.anticipated_value.concat(" ").concat(vm.account.anticipated_value_currency);
  //             }
  //             UserService.saveAccount(vm.account)
  //                 .then(function (response) {
  //                     if (response.data) {
  //                         FlashService.Success('Save successful', true);
  //                         vm.dataLoading = false;
  //                         $state.go("account", {}, {reload: true});
  //                         // UserService.getAccounts()
  //                         //   .then(function (response) {
  //                         //      vm.gridOptions.data = response.data;
  //                         //    });
  //                     } else {
  //                         FlashService.Error(response.message);
  //                         vm.dataLoading = false;
  //                     }
  //                     // $state.go("account");
  //                 });
  //         }

          function getServices(){
        UserService.getServices(vm.account.organisational_unit_id)
                  .then(function (response) {
                      if (response.data.success) {
                        $scope.serdata = response.data.success;
                      } 
                  });
      }
      

  }



  AccountDeleteController.$inject = ['$rootScope','$scope','$state','$log','$http','UserService', '$location', 'FlashService', 'RowEditor', '$timeout','$routeParams'];
function AccountDeleteController($rootScope,$scope,$state,$log,$http,UserService, $location,FlashService,RowEditor,$timeout,$routeParams) {
  var vm=this;
   vm.deleteaccount = deleteaccount;
   
  var splits=$location.url().toString().split("/");
  $scope.deltext="";
  UserService.deleteDependency({"type":"account","data":splits[splits.length - 1]})
                  .then(function (response) {
                    if(response.data){
                      $scope.deltext="The data you are trying to delete has a dependency and will be deleted if you proceed";
                    }
                  });                       
  function deleteaccount() {
              vm.dataLoading = true;
              UserService.deleteAccount(splits[splits.length - 1])
                  .then(function (response) {
                      if (response.status==204) {
                          FlashService.Success('Delete successful', true);
                          vm.dataLoading = false;
                          $state.go("account", {}, {reload: true});
                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                      }
                  });
          }
  }

  











      }
  )();