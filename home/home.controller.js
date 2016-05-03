  (function () {
    'use strict';

    angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','$timeout','$scope', '$rootScope','$compile','uiCalendarConfig'];
    function HomeController(UserService,$timeout,$scope, $rootScope,$compile,uiCalendarConfig) {
          //

          var date = new Date();
          $rootScope.shownav=true;
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();
          $scope.type = "free";
          $scope.changeTo = 'Hungarian';
          $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
              className: 'gcal-event',           // an option!
              currentTimezone: 'America/Chicago' // an option!
            };

            $scope.accountmodel = [];
            $scope.skillmodel = [];
            $scope.eventSources = [fetchEvents];

            function fetchEvents(start, end, timezone, callback) {
              var aid = "";
              if($scope.type=="account"){
                    if($scope.accountmodel.id) {
                       aid=$scope.accountmodel.id;
                    }
                    console.log($('#mycalendar').fullCalendar('getView').start.format('x'));
                    var newEvents = [];
                    UserService.getAccountResource(aid)
                    .then(function(response) {
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
              }else if($scope.type=="skill"){
                      var newSkillEvents=[];
                      var newSkEvents=[];
                      angular.forEach($scope.skillmodel, function (obj) {
                         newSkillEvents.push(obj.id);
                       });
                        UserService.getSkillDates(newSkillEvents.join()).then(function (response) {
                          angular.forEach(response.data, function (object) {
                             newSkEvents.push({
                              title: object.title,
                              start: new Date(Number(object.start)+19800),
                              allDay: true,
                            });
                     });
                        angular.copy(newSkEvents, $scope.events);
                        callback($scope.events);
              //$scope.accountdata = response.data;
                        });

              }
              else if($scope.type=="resource"){
                      var newResourceEvents=[];
                      var newResEvents=[];
                      angular.forEach($scope.resourcemodel, function (obj) {
                         newResourceEvents.push(obj.id);
                       });
                        UserService.getResourceDates(newResourceEvents.join()).then(function (response) {
                          angular.forEach(response.data, function (object) {
                             newResEvents.push({
                              title: object.title,
                              start: new Date(Number(object.start)+19800),
                              allDay: true,
                            });
                     });
                        angular.copy(newResEvents, $scope.events);
                        callback($scope.events);
              //$scope.accountdata = response.data;
                        });

              }else if($scope.type=="free"){
                var startdate=$('#mycalendar').fullCalendar('getView').start.format('x');
                var enddate = ($('#mycalendar').fullCalendar('getView').end.format('x'));
                var reqdate= {'startdate':startdate,'enddate':enddate};
                var newFreeEvents=[];
                UserService.getFreeResourceDates(reqdate).then(function (response) {
                          angular.forEach(response.data, function (object) {
                             newFreeEvents.push({
                              title: object.title,
                              start: new Date(Number(object.start)),
                              allDay: true,
                            });
                     });
                        angular.copy(newFreeEvents, $scope.events);
                        callback($scope.events);
              //$scope.accountdata = response.data;
                        });

              }
              
            
           }                        
           $scope.events = [

           ] ;
           $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
          };

          $scope.calEventsExt = {
           color: '#f00',
           textColor: 'yellow',
           events: [ 
           {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
           {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
           {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
           ]
         };
         $scope.alertOnEventClick = function( date, jsEvent, view){
          $scope.alertMessage = (date.title + ' was clicked ');
        };
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
         $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
       };
       $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
         $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
       };
       $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        console.log(sources);
        console.log(source);
        angular.forEach(sources,function(value, key){
          console.log(sources[key]);
          if(sources[key] === source){
            sources.splice(key,1);
            canAdd = 1;
          }
        });
        if(canAdd === 0){
          sources.push(source);
        }
        console.log(canAdd);
      };


      $scope.removeEventSource = function(source) {
        angular.forEach(source,function(value, key){
            source.splice(key,1);
        });
      };
      $scope.getRes = function() {

        
        var newResEvents=[];
        var newEvents=[];
         $('#mycalendar').fullCalendar('refetchEvents') ;
        angular.forEach($scope.resourcemodel, function (obj) {
                       newEvents.push(obj.id);
                     });
        console.log(newEvents.join());
        UserService.getResourceDates(newEvents.join()).then(function (response) {
          angular.forEach(response.data, function (object) {
                             newResEvents.push({
                              title: object.title,
                              start: new Date(Number(object.start)+19800),
                              allDay: true,
                            });
                     });
                        angular.copy(newResEvents, $scope.events);
           
          });
        

                          
              //$scope.accountdata = response.data;
      }
      $scope.getSki = function() {

        
        var newSkiEvents=[];
        var newSEvents=[];
         $('#mycalendar').fullCalendar('refetchEvents') ;
        angular.forEach($scope.skillmodel, function (obj) {
                       newSEvents.push(obj.id);
                     });
        UserService.getSkillDates(newSEvents.join()).then(function (response) {
          angular.forEach(response.data, function (object) {
                             newSkiEvents.push({
                              title: object.title,
                              start: new Date(Number(object.start)+19800),
                              allDay: true,
                            });
                     });
                        angular.copy(newSkiEvents, $scope.events);
                        $('#mycalendar').fullCalendar('refetchEvents') ;
           
          });
        

                          
              //$scope.accountdata = response.data;
      }

      // add custom event
      $scope.addEvent = function() {
        $scope.events.push({
          title: 'Open Sesame',
          start: new Date(y, m, 28),
          //end: new Date(y, m, 29),
          //className: ['openSesame']
        });
        /*$timeout(function () {
         UserService.getAccountResource(2)
                           .then(function (response) {
                           for(var i = 0; i < response.data.length; i++) {
                              var obj = response.data[i];
                              $scope.events.push({
                                  title: obj.title,
                                  start: new Date(Number(obj.start)),
                              });
                           }
                           });
  console.log($scope.events);
  },3000);*/

  };
      // remove event 
      $scope.remove = function(index) {
        $scope.events.splice(index,1);
      };
      $scope.removeAll = function() {
        $scope.events.splice(0,$scope.events.length);
      };
      // Change View 
      $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };
      // Change View 
      $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      };
       // Render Tooltip 
       $scope.eventRender = function( event, element, view ) {
        console.log(event); 
        //if(event.title=="Bittu"){
          if($scope.type=="free"){
         // var s="background-color:#9FF781;border-color:#9FF781";
          var s="background-color:#378006;border-color:#378006";
        }else{
          var s="background-color:#8B4513;border-color:#8B4513";
        }
        element.attr({'tooltip': event.title,
          'style':s,
         'tooltip-append-to-body': true,
          'eventColor': '#378006'});
        $compile(element)($scope);
      };
      // config object 
      $scope.uiConfig = {
        calendar:{
          height: 450,
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
          weekends: false,
          views: {
            agenda: {
              eventLimit: 2 // adjust to 6 only for agendaWeek/agendaDay
            }
          }
        }
      };

      $scope.changeLang = function() {
        if($scope.changeTo === 'Hungarian'){
          $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
          $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
          $scope.changeTo= 'English';
        } else {
          $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          $scope.changeTo = 'Hungarian';
        }
      };

      $scope.accountEvents = {
       onItemSelect: function(item) {
          //$scope.eventSources = [sampEvents];
          var newEvents=[];
          $('#mycalendar').fullCalendar('refetchEvents') ;
          UserService.getAccountResource(item.id)
                                                          .then(function(response) {
                                                            angular.forEach(response.data, function (obj) {
                                                             newEvents.push({
                                                              title: obj.title,
                                                              start: new Date(Number(obj.start)+19800),
                                                              allDay: true,
                                                            });
                                                           });
                                                              //console.log($scope.events);
                                                              // do some event processing ?
                                                              angular.copy(newEvents, $scope.events);

                                                             //callback($scope.events);
                                                           });


          //$scope.addRemoveEventSource($scope.eventSources,$scope.events);
         // $scope.eventSources = [fetchEvents];
        //function fetchEvents(start, end, timezone, callback) {
          /*var newEvents = [];
                                                          UserService.getAccountResource(item.id)
                                                          .then(function(response) {
                                                            angular.forEach(response.data, function (obj) {
                                                             newEvents.push({
                                                              title: obj.title,
                                                              start: new Date(Number(obj.start)),
                                                            });
                                                           });
                                                              //console.log($scope.events);
                                                              // do some event processing ?
                                                              angular.copy(newEvents, $scope.events);
                                                             //callback($scope.events);
                                                           });*/
  $scope.eventSources=[fetchEvents];
                                                          
  /*function fetchEvents(start, end, timezone, callback) {
                                                             $scope.events.length=0;
                                                             var newEvents = [];
                                                          UserService.getAccountResource(item.id)
                                                          .then(function(response) {
                                                            angular.forEach(response.data, function (obj) {
                                                             newEvents.push({
                                                              title: obj.title,
                                                              start: new Date(Number(obj.start)),
                                                            });
                                                           });
                                                              //console.log($scope.events);
                                                              // do some event processing ?
                                                              angular.copy(newEvents, $scope.events);
                                                             //callback($scope.events);
                                                           });
                                                            callback($scope.events);
                                                            }*/
                                                            //$scope.events=[];
                                                            
         // }
          
        
                                                        //function fetchEvents(start, end, timezone, callback) {
                                                          
                                                        //}  
                                                      },
                                                    };
      // event sources array
      //$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
      //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


  /* $scope.eventSources = [];
  $scope.uiConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
              dayClick: $scope.alertEventOnClick,
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize
            }
          };
          */













          //
          var vm = this;
          
          
          UserService.getAccounts().then(function (response) {
            $scope.accountdata = response.data;
          });
          UserService.getResources().then(function (response) {
            $scope.resourcedata = response.data;
          });
          UserService.getSkills().then(function (response) {
            $scope.skilldata = response.data;
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
            closeOnSelect:true,
            buttonClasses:"smbutton btn btn-default"

          };
          
          $scope.resourcemodel = [];
          $scope.resourcesettings = {
      scrollableHeight: '200px',
        scrollable: true,
      enableSearch: true,
      displayProp:'employee_name',
      idProp:'id',
      externalIdProp:'',
      closeOnBlur:true
        
    };
    $scope.skillmodel = [];
    $scope.skillsettings = {
      scrollableHeight: '200px',
        scrollable: true,
      enableSearch: true,
      displayProp:'skill_name',
      idProp:'id',
      externalIdProp:'',
      closeOnBlur:true
        
    };
    

          vm.user = null;
         // vm.allUsers = [];
          //vm.deleteUser = deleteUser;

          initController();

          function initController() {
            loadCurrentUser();
              //loadAllUsers();
            }

            function loadCurrentUser() {
              vm.username=$rootScope.globals.currentUser.username;
              /*UserService.GetByUsername($rootScope.globals.currentUser.username)
                  .then(function (user) {
                      vm.user = user;
                    });*/
  }

          /*function loadAllUsers() {
              UserService.GetAll()
                  .then(function (users) {
                      vm.allUsers = users;
                  });
  }*/

          /*function deleteUser(id) {
              UserService.Delete(id)
              .then(function () {
                  loadAllUsers();
              });
  }*/
  }

  })();