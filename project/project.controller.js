        (function () {
            'use strict';

            angular
                .module('app')
                .controller('ProjectController', ProjectController)
                .directive('overlay',ProjectDirective);
        	ProjectController.$inject = ['$state','$rootScope','$cookieStore','$anchorScroll','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor','$filter','$q','uiCalendarConfig'];
        	function ProjectController($state,$rootScope,$cookieStore,$anchorScroll,$scope,$log,$http,UserService, $location,FlashService,RowEditor,$filter,$q,uiCalendarConfig) {
            
                var vm = this;
                var splits=$location.url().toString().split("/");
                var strings=splits[splits.length-1];
                var newEl = angular.element( document.querySelector( ".hideoncalendar" ) );
                if(strings=="calendar"){
                  newEl.addClass("hidden"); 
                }else{
                  newEl.removeClass("hidden"); 
                }
                var rTEvents = [];
                $rootScope.shownav=true;
                $rootScope.rootAccess =  $cookieStore.get("rootAccess");
                $scope.type = "range";
                $scope.class=="red";
                $scope.end = new Date();
                $scope.example13model = [];
                $scope.resource ;
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
                $scope.events = [] ;
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
        $scope.reshowButtons =function(){
           var newEl = angular.element( document.querySelector( ".hideoncalendar" ) );
           newEl.removeClass("hidden"); 
        }
        $scope.disabled = function(date) {
          var flag = 0;
          var d = new Date(date);
          var day=d.getDay();
          if(day==0 || day==6){
            return true;
          }else{
            
              if($scope.newMax || $scope.newMin){
                if((date.getTime() > $scope.newMax) || (date.getTime() < $scope.newMin) )
                     return true;
                  return false;  
              }else{
                return false;  
              }
            }
              
            // }
           // return false;
                 
        }
        $scope.dselect = function(date) {
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
          showUncheckAll :false,
          closeOnBlur:true,
          closeOnSelect:true
        };
        $scope.account=[];
        $scope.accountEvents = {
                             onItemSelect: function(item) {
                                  FlashService.clearMessage();
                                  $scope.sermodel= [];
                                  $scope.items.length=0;
                                  $scope.resmodel.length=0;
                                  $scope.resource=0;
                                  $scope.IsVisible=$scope.calmodel=$scope.calrangemodel=item.id;
                                  UserService.getAccountServices(item.id).then(function (response){
                                    $scope.serdata = response.data.service_id ;
                                  });
                                  //UserService.getFilteredResources(item.id).then(function (response){
                                  UserService.getallFilteredResources(item.id).then(function (response){
                                    $scope.example13data = response.data ;
                                    UserService.getModeledResource(item.id).then(function (response){
                                       // UserService.getMappedResource(item.id).then(function (response){
                                      $scope.example13model = response.data;
                                      if($scope.example13model){
                                        $scope.addresmodel=$scope.showreshere=1;
                                        $scope.calrangemodel=0;
                                      }
                                    });
                                  UserService.getMappedResource(item.id).then(function (response){
                                    $scope.items = response.data ;
                                  });
                                  });
                                  UserService.getAccount(item.id).then(function (response){
                                    $scope.account = response.data ;
                                    $scope.newMax = $scope.account.end_date;
                                    $scope.newMin = $scope.account.start_date;
                                    
                                    $rootScope.$broadcast('refreshDatepickers');
                                    $scope.IsVisible = 0; 
                                  });

                                  $scope.eventSources = [fetchEvents];
                                  function fetchEvents(start, end, timezone, callback) {
                                    var aid = "";
                                    aid=$scope.accountmodel.id;
                                    var newEvents = [];
                                    UserService.getAccountResource(aid).then(function(response) {
                                      angular.forEach(response.data, function (obj) {
                                       newEvents.push({
                                        title: obj.title,
                                        start: new Date(Number(obj.start)+19800),
                                        allDay: true,
                                      });
                                     });
                                        angular.copy(newEvents, $scope.events);
                                        callback($scope.events);
                                      });  
                                    }
                                   $('#mycalendar').fullCalendar('refetchEvents') ;
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
                                                $rootScope.$broadcast('refreshDatepickers');
                                              });
                                            },
                     };
                     $scope.serEvents = {
                             onItemSelect: function(item) {

                              var data = {"account_id":$scope.accountmodel.id,"service_id":item.id}
                                              UserService.getServiceDates(data).then(function (response){
                                                var mindate = new Date(response.data[0].start_date).getTime();
                                                var maxdate = new Date(response.data[0].end_date).getTime();
                                                $scope.newMax = maxdate ;//+ 19800000;
                                                $scope.newMin = mindate ;//+ 19800000;
                                                $scope.showaccountdates = 1;
                                                // console.log(response.data[0].start_date);
                                                // console.log(d);
                                                // d=d+19800000;
                                              // $scope.disdate=response.data.dis;
                                              // angular.forEach(response.data.ena, function(value) {
                                              //         $scope.selectedDates.push(parseInt(value.start)-19800000);
                                              // }); 
                                                // $rootScope.$broadcast('refreshDatepickers');
                                              });
                                            },
                     };
                     
        $scope.resourceEvents = {
                             onItemSelect: function(item) {
                                                            $scope.addresmodel=$scope.showreshere=1;
                                                            $scope.calrangemodel=0;
                                                           },
                              onItemDeselect: function(item) {
                                                            var rs=$filter('filter')($scope.resmodel, {id: item.id});
                                                            if(rs[0]){
                                                            for (var i = $scope.resmodel.length - 1; i >= 0; i--) {
                                                                  if ($scope.resmodel[i].id==item.id) {
                                                                      $scope.resmodel.splice(i, 1);
                                                                  }
                                                              }                                                
                                                            }
                                                           },
                                                            onDeselectAll: function() {
                                                              $scope.resmodel.length=0;
                                                            },
                                };
        $scope.accountmodel = [];
        $scope.sermodel = [];
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
        $scope.sersettings = {
          smartButtonMaxItems: 1,
          scrollableHeight: '200px',
          scrollable: true,
          enableSearch: true,
          displayProp:'service_code',
          idProp:'id',
          externalIdProp:'',
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
              if(myEl.hasClass("btn-default")){
                myEl.removeClass('btn-default');
                myEl.addClass('btn-primary');
              }else{
                myEl.removeClass('btn-primary');
                myEl.addClass('btn-default');
              }
              FlashService.clearMessage();
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
            $scope.remresdate = function (value,service_id) {
              for (var key in $scope.items) {
                if(($scope.items[key].resource_id == value) && $scope.items[key].service_id == service_id){
                   $scope.items.splice(key, 1);
                }
              }
            }
            var ser = 0;
            $scope.showservice = function(value){
              if(ser == value){
                return 0;
              }else{
                ser=value;
                return 1;
              }
            }
            var resids=[];
            $scope.add = function(resource,singleres,date) {
              var text= 'div.single ul li button' ;
              var myEl = angular.element( document.querySelectorAll( text ) ); 
              if(myEl.hasClass("btn-primary")){
                myEl.removeClass('btn-primary');
                myEl.addClass('btn-default');
              }

              $scope.tempitems=angular.copy($scope.items);
              angular.forEach($scope.resmodel, function(value) {
              if((resids.indexOf(value.id) == -1)){
                resids.push(value.id);
              }
              var deferred = $q.defer();
               var filtered = $filter('filter')($scope.items, { resource_id: value.id, service_id: $scope.sermodel.id});
               var user = filtered.length ? filtered[0] : null;
               deferred.resolve(user);
              mydata.resource_id=value.id;
              mydata.account_id=$scope.accountmodel.id;
              var newdate=[];
              angular.forEach(date, function(value) {
          var d = new Date(value);
          var day=d.getDay();
          if(!(day==0 || day==6)){
           newdate.push(value+19800000);
          }
              });
              mydata.name=value.employee_name;
              mydata.service_id=$scope.sermodel.id;
              mydata.service_code=$scope.sermodel.service_code;
              mydata.maxDate= Math.max.apply(Math, date);
              mydata.minDate= Math.min.apply(Math, date);
              mydata.Dates=newdate;
              mydata.percentage_loaded=$scope.singleperSelect;
              var index = $scope.mynewdata.indexOf(mydata);
              $scope.mynewdata.splice(index, 1);
              var flag;
              var key = $scope.sermodel.id;
              if(filtered.length==0){
             $scope.items.push(angular.copy(mydata));
              }else{
                flag=1;
                for (var key in $scope.items) {
                if(($scope.items[key].resource_id == value.id) && ($scope.items[key].service_id == $scope.sermodel.id) ){
                  flag=0;
                  $scope.items[key].account_id=angular.copy($scope.accountmodel.id);
                  $scope.items[key].name=angular.copy(value.employee_name);
                  $scope.items[key].Dates=angular.copy(newdate);
                  $scope.items[key].service_id=angular.copy($scope.sermodel.id);
                  $scope.items[key].service_code=angular.copy($scope.sermodel.service_code);
                  $scope.items[key].percentage_loaded=angular.copy($scope.singleperSelect);
                  $scope.items[key].maxDate=angular.copy(Math.max.apply(Math, date));
                  $scope.items[key].minDate=angular.copy(Math.min.apply(Math, date));
                }
              }
              if(flag){
                   $scope.items.push(angular.copy(mydata));
                }
              }
              });
        var mynewres = {};
        var newstr= '';
        angular.forEach($scope.resmodel, function(value) {
          var resflag=0;
          var newresflag =0;
          var sumstr="";
                var datestring='';
                for (var key in $scope.items) {
                  if($scope.items[key].resource_id == value.id){
                      sumstr=(value.employee_name + " is occupied on the following dates - ");
                      angular.forEach($scope.items[key].Dates, function(val) {
                        var keys=val;
                        if(mynewres[keys]){
                        mynewres[keys]=mynewres[keys]+Number($scope.items[key].percentage_loaded);
                        }else{
                          mynewres[keys]=Number($scope.items[key].percentage_loaded);                      
                        }
                        
                          
                        if(mynewres[keys] > 100){
                          resflag=1;
                          // var datestring='';
                          var d = new Date(Number(keys));
                          datestring=datestring+((d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear())+ ",");
                          // newstr=newstr+(" "+sumstr+datestring)+"<br>";
                          newresflag=0;

                        }else{
                          newresflag=1;
                        }
                      });    
        if(resflag){
          //$scope.items=angular.copy($scope.tempitems);
          var fi=$filter('filter')($scope.items, {service_id: $scope.sermodel.id});
                                                            if(fi[0]){
                                                            for (var i = $scope.items.length - 1; i >= 0; i--) {
                                                                  if (($scope.items[i].service_id==$scope.sermodel.id) && ($scope.items[i].resource_id==value.id)) {
                                                                      $scope.myitem=angular.copy($scope.tempitems[i]);
                                                                      $scope.items.splice(i, 1);
                                                                      if($scope.myitem){
                                                                        $scope.items.splice(i, 0,$scope.myitem);
                                                                      }
                                                                  }
                                                              }                                                
                                                            }
                                                            
                         // $scope.items.splice(key, 1);

        }
                  }
                }
                if(datestring){
                newstr=newstr+(" "+sumstr+datestring)+"<br>";
                }
                // newstr=newstr+"<br>";
               mynewres = {};
               });
        if(newstr){
                FlashService.Error(newstr, true);  
        }
        var finalres={};
        var servces={};
        angular.forEach(resids, function(value) {
           var newtempres={};
           var newser=[];
          for (var key in $scope.items) {
                if(($scope.items[key].resource_id == value)){
                  newser.push($scope.items[key].service_id);
                  // for (var newkey in $scope.items[key].Dates){
                     angular.forEach($scope.items[key].Dates, function(val) {
                    if(newtempres[val]){
                      newtempres[val] = newtempres[val] + Number($scope.items[key].percentage_loaded);
                    }else{
                      newtempres[val] = Number($scope.items[key].percentage_loaded);  
                    }
                  });
                  
                }
              }
              var nkey= value;
              finalres[nkey] = newtempres;
              servces[nkey] = newser;
        });
        var data = {"resources":finalres,"account_id":$scope.accountmodel.id,"service_ids":servces}
        $scope.resmodel.length = 0;
              var res = {};
               var newstr='';
               

              // UserService.validateNewResDetails($scope.items).then(function (response){
                  UserService.validateNewResDetails(data).then(function (response){
                                                            var errres=[];
                                                            angular.forEach(response.data, function(value) {
                                                              if(value.success==0){
                                                                for (var key in $scope.items) {
                                                                  if(($scope.items[key].resource_id == value.resource_id) && ($scope.items[key].service_id == value.service_id)){
                                                                    if($scope.tempitems[key]){
                                                                      if($scope.tempitems[key].saved){
                                                                      var newflag=1;
                                                                    }
                                                                  }
                                                                    $scope.newitem=angular.copy($scope.tempitems[key]);
                                                                    var newitem=$scope.items.splice(key, 1);
                                                                    if(newflag){
                                                                          $scope.items.splice(key, 0,$scope.newitem);
                                                                    }
                                                                  }
                                                                }
                                                                var sumstr="";
                                                                sumstr=(value.name + " is occupied on the following dates - ");
                                                                
                                                                 var datestring='';
                                                                 value.dates.sort();
                                                                angular.forEach(value.dates,function(nvalue) {
                                                                  var d = new Date(Number(nvalue));
                                                                datestring=datestring+((d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear())+ ",");
                                                            });
                                                                if(errres.indexOf(value.resource_id) == -1){
                                                                newstr=newstr+(" "+sumstr+datestring)+"<br>";
                                                                errres.push(value.resource_id);
                                                                }
                                                              }
                                                            });
                                                                  if(newstr){
                                                                  FlashService.Error(newstr, true);  
                                                                  }
                                                                  
                                                            var mydata={};
              });
        $scope.selectedDates.length=0;
        $location.hash('top');

                  // call $anchorScroll()
                  $anchorScroll();

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
                                                              FlashService.Success("People have been mapped to the project", true); 
                                                             });
                // set the location.hash to the id of
            // the element you wish to scroll to.
                  $location.hash('top');

                  // call $anchorScroll()
                  $anchorScroll();
            // $state.go("project", {}, {reload: true});
            }

            }
            

            function ProjectDirective() {
            return {
              replace: true,
              templateUrl: "overlay.html"
            };
            }


        })();



