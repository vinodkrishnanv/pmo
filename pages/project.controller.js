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
        $scope.type = "individual";
        $scope.start = new Date('11/20/13');
      $scope.end = new Date();
     $scope.example13model = [];
     $scope.resource ;// = "";
$scope.example13data = UserService.getResources();
$scope.example13settings = {
  scrollableHeight: '200px',
    scrollable: true,
  enableSearch: true,
  displayProp:'employeeName',
  idProp:'employeeName',
  externalIdProp:'employeeName',
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
  displayProp:'employeeName',
  idProp:'employeeName',
  externalIdProp:'employeeName',
  selectionLimit: 1,
  showUncheckAll :false,
  closeOnBlur:true,
  closeOnSelect:true
};

$scope.accountEvents = {
                     onItemSelect: function(item) {
                                                    $scope.calmodel=item.accountName;
                                                   },
             };
$scope.yourEvents = {
                     onItemSelect: function(item) {$scope.selectedDates.length = 0;
                                                    $scope.resource=item.employeeName;
                                                   },
             };
$scope.accountmodel = [];
$scope.accountdata = UserService.getAccounts();
$scope.accountsettings = {
  smartButtonMaxItems: 1,
  scrollableHeight: '200px',
    scrollable: true,
  enableSearch: true,
  displayProp:'accountName',
  idProp:'accountName',
  externalIdProp:'accountName',
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
    
    
    //THIS IS WHERE YOU CAN INITIALIZE VALUES
    //$scope.selectedDates = [new Date().setHours(0, 0, 0, 0), new Date(2015, 2, 20).setHours(0, 0, 0, 0), new Date(2015, 2, 10).setHours(0, 0, 0, 0), new Date(2015, 2, 15).setHours(0, 0, 0, 0)];
    $scope.selectedDates = [];
    $scope.accountrangeDates = [];
    $scope.accountrange;
    $scope.user = [];
    var mydata = 
      {name: '', Dates : '' }
    ;
    $scope.mynewdata = [
      {name: '', Dates : '' }]
    ;
    $scope.items = [];

    /*$scope.clear = function() {
      alert("here");
        $scope.selectedDates.length = 0;
    };*/


    $scope.removeFromSelected = function (dt) {
        $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
    }
     $scope.reload = function () {
        $scope.minEndDate=Math.min.apply(Math, $scope.accountrangeDates);
        $scope.maxEndDate=Math.max.apply(Math, $scope.accountrangeDates);
    }

    $scope.add = function(resource,date) {
      var deferred = $q.defer();
       var filtered = $filter('filter')($scope.items, { name: resource });
       var user = filtered.length ? filtered[0] : null;
       console.log(deferred);
       console.log(filtered);
       deferred.resolve(user);


      mydata.name=resource;
      mydata.Dates=date;
      var index = $scope.mynewdata.indexOf(mydata);
      $scope.mynewdata.splice(index, 1);
      if(filtered.length==0){
      $scope.items.push(angular.copy(mydata));
      }else{
        for (var key in $scope.items) {
        if($scope.items[key].name == resource){
          $scope.items[key].Dates=angular.copy(date);
        }
      }

      }
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
        // all the code here...
     });
   },
   template: templateUrl
  };
      /*return {
    restrict: 'A',
    link: function (scope, element, attr) {
        $timeout(function (){
           function reload(){
            alert("asdas");
          }
        });
    }
  }*/
                //<uib-datepicker ng-model="activeDate" multi-select="selectedDates" select-range="{{type=="range"}}" date-disabled="disabled(date)"></uib-datepicker>

  /*return {
    template: 'Student:<table><tr><td><uib-datepicker ng-model="activeDate" multi-select="selectedDates"  date-disabled="disabled(date)"></uib-datepicker></td></tr></table>'
  }*/


    }


})();



