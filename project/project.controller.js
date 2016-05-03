  (function () {
      'use strict';

      angular
          .module('app')
          .controller('ProjectController', ProjectController)
          .directive('overlay',ProjectDirective);
          //ProjectDirective.$inject = ['ngAnimate'];
  	ProjectController.$inject = ['$rootScope','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor','$filter','$q','uiCalendarConfig'];
  	function ProjectController($rootScope,$scope,$log,$http,UserService, $location,FlashService,RowEditor,$filter,$q,uiCalendarConfig) {

          var vm = this;
          var rTEvents = [];
          $rootScope.shownav=true;
          $scope.type = "range";
          $scope.class=="red";
        $scope.end = new Date();
       $scope.example13model = [];
       $scope.resource ;// = "";
       $scope.singleperSelect="100";

  $scope.example13settings = {
    scrollableHeight: '200px',
      scrollable: true,
    enableSearch: true,
    displayProp:'employee_name',
    idProp:'id',
    externalIdProp:'',
    closeOnBlur:true,
    groupByTextProvider: function(groupValue) { if (groupValue === 'F') { return 'Suggested'; } else { return 'Remaining'; } } 
      
  };
  $scope.events = [

           ] ;
  $scope.uiConfig = {
        calendar:{
          height: 450,
          width: 650,
          editable: false,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender,
          eventLimit: true, 
          views: {
            agenda: {
              eventLimit: 2 // adjust to 6 only for agendaWeek/agendaDay
            }
          }
        }
      };
       
  $scope.person = {};
  $scope.disabled = function(date) {
    var flag = 0;
   
    //$scope.disdate=[];
      // if($scope.resmodel.id){
      //   var keepgoing =1;


      //                                                 angular.forEach($scope.disdate, function(value) {
      //                                                   if(keepgoing){
      //                                                         if(parseInt(value.start)==(parseInt(date.getTime()) + 19800000)){
      //                                                          // if((date.getTime() > $scope.newMax) || (date.getTime() < $scope.newMin) ){
      //                                                             flag = true;
      //                                                          // }
      //                                                           keepgoing=0;
      //                                                         }else{
      //                                                           flag = false;
      //                                                           keepgoing=1;
      //                                                         }
      //                                                         }
      //                                                 }); 
      //                                                 return flag;
      // }else{
        if($scope.newMax || $scope.newMin){
          if((date.getTime() > $scope.newMax) || (date.getTime() < $scope.newMin) )
               return true;
            return false;  
        }else{
          return false;  
        }
        
      // }
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
    // selectionLimit: 1,
    showUncheckAll :false,
    closeOnBlur:true,
    closeOnSelect:true
  };
  $scope.account=[];

  $scope.accountEvents = {
                       onItemSelect: function(item) {
                                                      $scope.IsVisible=$scope.calmodel=$scope.calrangemodel=item.id;
                                                      //UserService.getFilteredResources(item.id).then(function (response){
                                                      UserService.getallFilteredResources(item.id).then(function (response){
                                                      $scope.example13data = response.data ;
                                                      UserService.getMappedResource(item.id).then(function (response){
                                                      $scope.example13model = response.data ;
                                                      if($scope.example13model){
                                                        $scope.addresmodel=$scope.showreshere=1;
                                                        $scope.calrangemodel=0;
                                                      }
                                                      });
                                                      });
                                                      

                                                      UserService.getAccount(item.id).then(function (response){
                                                      $scope.account = response.data ;
                                                      $scope.newMax = $scope.account.end_date;
                                                      $scope.newMin = $scope.account.start_date;
                                                      $scope.showaccountdates = 1;
                                                      $rootScope.$broadcast('refreshDatepickers');
                                                      $scope.IsVisible = 0; 
                                                      
                                                      });

                                                      $scope.eventSources = [fetchEvents];

                                                      function fetchEvents(start, end, timezone, callback) {
                                                        var aid = "";
                                                                 aid=$scope.accountmodel.id;
                                                              console.log($('#mycalendar').fullCalendar('getView').start.format('x'));
                                                              var newEvents = [];
                                                              UserService.getAccountResource(aid)
                                                              .then(function(response) {
                                                                angular.forEach(response.data, function (obj) {
                                                                 newEvents.push({
                                                                  title: obj.title,
                                                                  start: new Date(Number(obj.start)+19800),
                                                                  allDay: true,
                                                                  //rendering: 'background',
                                                                  //backgroundColor: '#f26522',
                                                                });
                                                               });
                                                                  angular.copy(newEvents, $scope.events);
                                                                  callback($scope.events);
                                                                });  
                                                        }
                                                      //var newEvents = [];
                                                       $('#mycalendar').fullCalendar('refetchEvents') ;
                                                      // UserService.getAccountResource(item.id)
                                                      // .then(function(response) {
                                                      //   angular.forEach(response.data, function (obj) {
                                                      //    newEvents.push({
                                                      //     title: obj.title,
                                                      //     start: new Date(Number(obj.start)+19800),
                                                      //     allDay: true,
                                                      //   });
                                                      //  });
                                                      //     angular.copy(newEvents, $scope.events);
                                                      //    // callback($scope.events);
                                                      //   });  
                                                      // $scope.eventSources=[fetchEvents];
                                                      //$('#mycalendar').fullCalendar('refetchEvents') ;
                                                      
                                                      
                                                      
                                                     },
               };
  $scope.yourEvents = {
                       onItemSelect: function(item) {
                                                      $scope.selectedDates.length = 0;
                                                      $scope.resource=item.id;
                                                      $scope.singleres=item.employee_name;
                                                      var resdata={};
                                                      resdata.id=item.id;
                                                      resdata.account=$scope.accountmodel.id;
                                                      var res ={"resources":resdata};
                                                      UserService.getResourceAccountDates(res).then(function (response){
                                                      $scope.disdate=response.data.dis;
                                                      angular.forEach(response.data.ena, function(value) {
                                                              $scope.selectedDates.push(parseInt(value.start)-19800000);
                                                      }); 
                                                        //console.log($scope.disdate);
                                                        $rootScope.$broadcast('refreshDatepickers');
                                                      });

                                                      //UserService.getResourceDates(''+item.id+'').then(function (response){
                                                      //  $scope.disdate=response.data;
                                                      //angular.forEach(response.data, function(value) {
                                                       //       $scope.selectedDates.push(parseInt(value.start)-19800000);
                                                      //}); 
                                                        //console.log($scope.disdate);
                                                      //  $rootScope.$broadcast('refreshDatepickers');
                                                     // });
                                                      
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
      $scope.respevents = function (id,name) { 
        var text= 'button'+'#'+name+id ;
      var myEl = angular.element( document.querySelector( text ) ); 
        if(myEl.hasClass("btn-danger")){
          myEl.removeClass('btn-danger');
          myEl.addClass('btn-warning');
        }else{
          myEl.removeClass('btn-warning');
          myEl.addClass('btn-danger');
        }
        var news = { id: '', employee_name: ''};
      news.id=id;
      news.employee_name=name;                        
                                                     
                                                     var rs=$filter('filter')($scope.resmodel, {id: id});
                                                      if(rs[0]){
                                                      for (var i = $scope.resmodel.length - 1; i >= 0; i--) {
                                                            if ($scope.resmodel[i].id==id) {
                                                                $scope.resmodel.splice(i, 1);
                                                            }
                                                        }                                                
                                                      }else{
                                                      $scope.resmodel.push(news);  
                                                      }
                                                      $scope.activeDate=null;
                                                      $scope.selectedDates.length = 0;
                                                      $scope.resource=id;
                                                     // $scope.resmodel.id=id;
                                                      $scope.singleres=name;
                                                      var resdata={};
                                                      resdata.id=id;
                                                      resdata.account=$scope.accountmodel.id;
                                                      var res ={"resources":resdata};
                                                      UserService.getResourceAccountDates(res).then(function (response){
                                                        $rootScope.$broadcast('refreshDatepickers');
                                                      });

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
      $scope.remresdate = function (value) {
        for (var key in $scope.items) {
          if($scope.items[key].resource_id == value.resource_id){
             $scope.items.splice(key, 1);
          }
        }
      }

      $scope.add = function(resource,singleres,date) {
        
        angular.forEach($scope.resmodel, function(value) {
          var text= 'button'+'#'+value.employee_name+value.id ;
          var myEl = angular.element( document.querySelector( text ) ); 
        if(myEl.hasClass("btn-warning")){
          myEl.removeClass('btn-warning');
          myEl.addClass('btn-danger');
        }
        var deferred = $q.defer();
         var filtered = $filter('filter')($scope.items, { resource_id: value.id });
         var user = filtered.length ? filtered[0] : null;
         deferred.resolve(user);
        mydata.resource_id=value.id;
        mydata.account_id=$scope.accountmodel.id;
        var newdate=[];
        angular.forEach(date, function(value) {
        newdate.push(value+19800000);
        });
        mydata.name=value.employee_name;
        mydata.maxDate= Math.max.apply(Math, date);
        mydata.minDate= Math.min.apply(Math, date);
        mydata.Dates=newdate;
        mydata.percentage_loaded=$scope.singleperSelect;
        console.log(filtered.length);
        console.log($scope.items);
        var index = $scope.mynewdata.indexOf(mydata);
        $scope.mynewdata.splice(index, 1);
        var flag;
        if(filtered.length==0){
        $scope.items.push(angular.copy(mydata));
        }else{
          flag=1;
          for (var key in $scope.items) {
          if($scope.items[key].resource_id == value.id){
            flag=0;
            $scope.items[key].account_id=angular.copy($scope.accountmodel.id);
            $scope.items[key].name=angular.copy(value.employee_name);
            $scope.items[key].Dates=angular.copy(newdate);
            $scope.items[key].percentage_loaded=angular.copy($scope.singleperSelect);
            $scope.items[key].maxDate=angular.copy(Math.max.apply(Math, date));
            $scope.items[key].minDate=angular.copy(Math.min.apply(Math, date));
          }
        }
        if(flag){
             $scope.items.push(angular.copy(mydata));
          }
        }
        console.log($scope.items);
         // res = {"resources" : mydata}         
        });
  $scope.resmodel.length = 0;
        var res = {};
         var newstr='';
        UserService.validateNewResDetails($scope.items).then(function (response){
                                                      angular.forEach(response.data, function(value) {
                                                        if(value.success==0){
                                                          for (var key in $scope.items) {
                                                            if($scope.items[key].resource_id == value.resource_id){
                                                              $scope.items.splice(key, 1);
                                                            }
                                                          }
                                                          var sumstr="";
                                                          sumstr=(value.name + " is occupied with some other project on the following dates - ");
                                                           var datestring='';
                                                          angular.forEach(value.dates,function(nvalue) {
                                                            var d = new Date(Number(nvalue));
                                                          datestring=datestring+((d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear())+ ",");
                                                      });
                                                          console.log(newstr);
                                                          newstr=newstr+(" "+sumstr+datestring);
                                                        }
                                                      });

                                                            FlashService.Success(newstr, true);
                                                      var mydata={};
        });

      }
      function doWhateverWithAll(someArray,date) {
  // Mark which request we're currently doing
         var currentRequest = 0;
  // Make this promise based.
   var deferred = $q.defer();
         // var deferred = $q.deferred();
  // Set up a result array
        var results = []
  function makeNextRequest() {
    var deferred = $q.defer();
         var filtered = $filter('filter')($scope.items, { resource_id: someArray[currentRequest].id });
         var user = filtered.length ? filtered[0] : null;
         deferred.resolve(user);
        mydata.resource_id=someArray[currentRequest].id;
        var newdate=[];
        angular.forEach(date, function(value) {
        newdate.push(value+19800000);
        });
        mydata.name=someArray[currentRequest].employee_name;
        mydata.maxDate= Math.max.apply(Math, date);
        mydata.minDate= Math.min.apply(Math, date);
        mydata.Dates=newdate;
        mydata.percentage_loaded=$scope.singleperSelect;
    // Do whatever you need with the array item.
    // var postData = someArray[currentRequest];
    UserService.validateResDetails(mydata).then(function (response){
      results.push(response.data);
      // Increment progress.
      currentRequest++;
      // Continue if there are more items.
      if (currentRequest < someArray.length){
        makeNextRequest();
      }
      // Resolve the promise otherwise.
      else {
        deferred.resolve(results);  
      }  
        });
    
    // TODO handle errors appropriately.
  }
  // return a promise for the completed requests
  return deferred.promise;
}
      $scope.saveproject = function() {
        var account = {};
          var accountDetails = {};
          accountDetails.id = $scope.accountmodel.id;
          accountDetails.resources = $scope.items;
          //accountDetails.minEndDate = Math.min.apply(Math, $scope.accountrangeDates)+19800000;
          // if($scope.newMin){

          // }else{
            
          // }
          accountDetails.minEndDate = $scope.newMin;
          accountDetails.maxEndDate = $scope.newMax;
          //accountDetails.maxEndDate =Math.max.apply(Math, $scope.accountrangeDates)+19800000;
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



