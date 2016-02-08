  (function () {
      'use strict';

      angular
          .module('app')
          .controller('ProjectController', ProjectController)
          .directive('myCustomer',ProjectDirective);
          ProjectDirective.$inject = ['$q'];
  	ProjectController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor','$filter','$q'];
  	function ProjectController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor,$filter,$q) {

          var vm = this;
          //THIS IS WHERE YOU CAN INITIALIZE VALUES
          $scope.type = "individual";
          $scope.start = new Date('11/20/13');
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
                                                      $scope.calmodel=item.id;
                                                      UserService.getFilteredResources(item.id).then(function (response){
                                                      $scope.example13data = response.data ;
                                                      });
                                                     },
               };
  $scope.yourEvents = {
                       onItemSelect: function(item) {
                                                      console.log(item);
                                                      $scope.selectedDates.length = 0;
                                                      $scope.resource=item.id;
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
      var mydata = 
        {resource_id: '', Dates : '' }
      ;
      $scope.mynewdata = [
        {resource_id: '', Dates : '' }]
      ;
      $scope.items = [];
      $scope.removeFromSelected = function (dt) {
          $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
      }
       $scope.reload = function () {
          $scope.minEndDate=Math.min.apply(Math, $scope.accountrangeDates);
          $scope.maxEndDate=Math.max.apply(Math, $scope.accountrangeDates);
      }

      $scope.add = function(resource,date) {
        var deferred = $q.defer();
         var filtered = $filter('filter')($scope.items, { resource_id: resource });
         var user = filtered.length ? filtered[0] : null;
         deferred.resolve(user);
        mydata.resource_id=resource;
        mydata.Dates=date;
        var index = $scope.mynewdata.indexOf(mydata);
        $scope.mynewdata.splice(index, 1);
        if(filtered.length==0){
        $scope.items.push(angular.copy(mydata));
        }else{
          for (var key in $scope.items) {
          if($scope.items[key].resource_id == resource){
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
      

      function ProjectDirective($q) {
        var templateUrl ="";
       return {
     restrict: 'E',
     scope: {
       minEndDate: '='
     },
     link: function($scope) {
       $scope.$watch('minEndDate', function() {
         templateUrl = '<uib-datepicker ng-model="activeDate" multi-select="selectedDates" select-range="{{type=="range"}}" date-disabled="disabled(date)"></uib-datepicker>'
       });
     },
     template: templateUrl
    };
      }


  })();



