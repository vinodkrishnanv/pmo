  (function () {
      'use strict';

      angular
          .module('app')
          .controller('ProjectController', ProjectController)
          .directive('overlay',ProjectDirective);
          //ProjectDirective.$inject = ['ngAnimate'];
  	ProjectController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor','$filter','$q'];
  	function ProjectController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor,$filter,$q) {

          var vm = this;
          //THIS IS WHERE YOU CAN INITIALIZE VALUES
          $scope.type = "individual";
        $scope.end = new Date();
       $scope.example13model = [];
       $scope.resource ;// = "";

  $scope.example13settings = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'employee_name',
    idProp:'id',
    externalIdProp:'',
    closeOnBlur:true
      
  };
  $scope.disabled = function(date) {
          // if((date.getTime() > Math.max.apply(Math, $scope.accountrangeDates)) || (date.getTime() < Math.min.apply(Math, $scope.accountrangeDates)) )
           if((date.getTime() > $scope.newMax) || (date.getTime() < $scope.newMin) )
              return true;
      return false;
  }
  $scope.dselect = function(date) {
    console.log("control-here");
           if((date.getTime() > Math.max.apply(Math, $scope.accountrangeDates)) || (date.getTime() < Math.min.apply(Math, $scope.accountrangeDates)) )
              return true;
      return false;
  }
  $scope.resmodel = [];
  $scope.ressettings = {
    smartButtonMaxItems: 1,
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'employee_name',
    idProp:'id',
    externalIdProp:'',
    selectionLimit: 1,
    showUncheckAll :false,
    closeOnBlur:true,
    closeOnSelect:true
  };

  $scope.accountEvents = {
                       onItemSelect: function(item) {
                                                      $scope.IsVisible=$scope.calmodel=$scope.calrangemodel=item.id;
                                                      UserService.getFilteredResources(item.id).then(function (response){
                                                      $scope.example13data = response.data ;
                                                      });
                                                     },
               };
  $scope.yourEvents = {
                       onItemSelect: function(item) {
                                                      console.log($scope.accountrangeDates);
                                                       //$rootScope.$broadcast('refreshDatepickers');
                                                      $scope.selectedDates.length = 0;
                                                      //$scope.selectedDates = [1454610600000, 1454697000000];
                                                      //console.log($scope.selectedDates);
                                                      $scope.resource=item.id;
                                                      $scope.singleres=item.employee_name;
                                                      //$scope.selectedDates = [1454610600000, 1454697000000];
                                                      //$rootScope.$broadcast('refreshDatepickers');
                                                     },
               };
  $scope.resourceEvents = {
                       onItemSelect: function(item) {
                                                      $scope.addresmodel=$scope.showreshere=1;
                                                      $scope.calrangemodel=0;
                                                     },
               };
  $scope.accountmodel = [];
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
  		$scope.eventDetails = eventDetails;
      function eventDetails(event){
         $scope.selected = event;
         $scope.query = event;
        
      }
      $scope.activeDate;
      $scope.selectedDates = [];
      $scope.accountrangeDates = [];
      $scope.accountrange;
      $scope.user = [];
      var ary=[]
      var mydata = 
        {resource_id: '', name: '', Dates : '' }
      ;
      $scope.mynewdata = [
        {resource_id: '', name: '', Dates : '' }]
      ;
      $scope.items = [];
      $scope.removeFromSelected = function (dt) {
          $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
      }
      $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.calrangemodel=$scope.IsVisible = $scope.IsVisible ? false : true;

            }
       $scope.reload = function () {
          $scope.selectRange = 1;
          $scope.minEndDate=Math.min.apply(Math, $scope.accountrangeDates);
          $scope.maxEndDate=Math.max.apply(Math, $scope.accountrangeDates);
      }
      $scope.addAccountDates = function () {
          $scope.newMax = Math.max.apply(Math, $scope.accountrangeDates);
          $scope.newMin = Math.min.apply(Math, $scope.accountrangeDates);
          $scope.showaccountdates = 1;
          $rootScope.$broadcast('refreshDatepickers');
          $scope.IsVisible = 0;
      }
      $scope.changeAccountDates = function () {
          $scope.calrangemodel = 1;
          $rootScope.$broadcast('refreshDatepickers');
      }

      $scope.add = function(resource,singleres,date) {
        console.log($scope.items);
        var deferred = $q.defer();
         var filtered = $filter('filter')($scope.items, { resource_id: resource });
         var user = filtered.length ? filtered[0] : null;
         deferred.resolve(user);
        mydata.resource_id=resource;
        mydata.name=$scope.singleres;
        mydata.Dates=date;
        var index = $scope.mynewdata.indexOf(mydata);
        $scope.mynewdata.splice(index, 1);
        if(filtered.length==0){
        $scope.items.push(angular.copy(mydata));
        }else{
          for (var key in $scope.items) {
          if($scope.items[key].resource_id == resource){
            $scope.items[key].name=angular.copy($scope.singleres);
            $scope.items[key].Dates=angular.copy(date);
          }
        }
        }
      }

      $scope.saveproject = function() {
        var account = {};
          var accountDetails = {};
          accountDetails.id = $scope.accountmodel.id;
          accountDetails.resources = $scope.items;
          accountDetails.minEndDate = Math.min.apply(Math, $scope.accountrangeDates);
          accountDetails.maxEndDate =Math.max.apply(Math, $scope.accountrangeDates);
          account = {"account" : accountDetails}
          UserService.saveAccountDetails(account).then(function (response){
                                                     console.log("here");
                                                      });
      }
      }
      

      function ProjectDirective() {
      return {
        replace: true,
        templateUrl: "overlay.html"
      };
      }


  })();



