  (function () {
      'use strict';

      angular
          .module('app')
          .controller('ProjectController', ProjectController)
          .filter('propsFilter',function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
})
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
  $scope.person = {};
  $scope.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
    { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
    { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
  ];
  $scope.multipleDemo = {};
  $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
  $scope.disabled = function(date) {
    $scope.disdate=[];
      if($scope.resmodel.id){
        console.log("here");
                                                      
                                                      angular.forEach($scope.disdate, function(value) {
                                                              if(value.start==(date.getTime() + 19800000)){
                                                                return false;
                                                              }
                                                      }); 
      }
      //      if((date.getTime() > $scope.newMax) || (date.getTime() < $scope.newMin) )
      //         return true;
      // return false;
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
  $scope.account=[];

  $scope.accountEvents = {
                       onItemSelect: function(item) {
                                                      $scope.IsVisible=$scope.calmodel=$scope.calrangemodel=item.id;
                                                      UserService.getFilteredResources(item.id).then(function (response){
                                                      $scope.example13data = response.data ;
                                                      });

                                                      UserService.getAccount(item.id).then(function (response){
                                                      $scope.account = response.data ;
                                                      $scope.newMax = $scope.account.end_date;
                                                      $scope.newMin = $scope.account.start_date;
                                                      $scope.showaccountdates = 1;
                                                      $rootScope.$broadcast('refreshDatepickers');
                                                      $scope.IsVisible = 0; 
                                                      
                                                      });
                                                      
                                                      
                                                     },
               };
  $scope.yourEvents = {
                       onItemSelect: function(item) {
                                                      $scope.selectedDates.length = 0;
                                                      $scope.resource=item.id;
                                                      $scope.singleres=item.employee_name;
                                                      UserService.getResourceDates(''+item.id+'').then(function (response){
                                                        $scope.disdate=response.data;
                                                        $rootScope.$broadcast('refreshDatepickers');
                                                      });
                                                      
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
        var newdate=[];
        angular.forEach(date, function(value) {
        newdate.push(value+19800000);
});
        mydata.name=$scope.singleres;
        //mydata.Dates=date;
        mydata.Dates=newdate;
        mydata.percentage_loaded=100;
        var index = $scope.mynewdata.indexOf(mydata);
        $scope.mynewdata.splice(index, 1);
        if(filtered.length==0){
        $scope.items.push(angular.copy(mydata));
        }else{
          for (var key in $scope.items) {
          if($scope.items[key].resource_id == resource){
            $scope.items[key].name=angular.copy($scope.singleres);
            $scope.items[key].Dates=angular.copy(newdate);
            $scope.items[key].percentage_loaded=angular.copy(100);

          }
        }
        }
      }

      $scope.saveproject = function() {
        var account = {};
          var accountDetails = {};
          accountDetails.id = $scope.accountmodel.id;
          accountDetails.resources = $scope.items;
          accountDetails.minEndDate = Math.min.apply(Math, $scope.accountrangeDates)+19800000;
          accountDetails.maxEndDate =Math.max.apply(Math, $scope.accountrangeDates)+19800000;
          account = {"account" : accountDetails}
          UserService.saveAccountDetails(account).then(function (response){
                                                      FlashService.Success(response.data, true);
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



