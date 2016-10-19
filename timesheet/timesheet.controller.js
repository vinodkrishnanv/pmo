(function () {
    'use strict';

    angular
        .module('app')
        .controller('TimeSheetController', TimeSheetController);

    TimeSheetController.$inject = ['$filter','$rootScope','$cookieStore','$scope','$state','$http','UserService','$location'];
    function TimeSheetController($filter,$rootScope,$cookieStore,$scope,$state,$http,UserService,$location) {
        var vm = this;
        var initital = 0;
        var weekFullStart = moment().clone().startOf('week');
        $scope.week_full=[weekFullStart.day(0).format(fullWeekFormat),weekFullStart.day(1).format(fullWeekFormat),weekFullStart.day(2).format(fullWeekFormat),weekFullStart.day(3).format(fullWeekFormat),weekFullStart.day(4).format(fullWeekFormat),weekFullStart.day(5).format(fullWeekFormat),weekFullStart.day(6).format(fullWeekFormat)];
        vm.savetimesheet = savetimesheet;
        vm.getpiedata = getpiedata;
        $scope.userData=[];
        
        // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        // $scope.doughdata = [0, 0, 0];
        $scope.colors = [ '#fdb45c', '#00ADF9', '#f7464a', '#46BFBD', '#32cd32', '#28022f', '#feca9a'];
        $scope.weeknames = [ ".fc-sun",".fc-mon",".fc-tue", ".fc-wed", ".fc-thu", ".fc-fri", ".fc-sat"];
        $('#timecalendar').fullCalendar('next');
        var currentDate,
          next,
          count,
          countPrev,
          weekStart,
          weekEnd,
          monthFormat='MMM',
          yearFormat='YYYY',
          shortWeekFormat = 'ddd D',
          fullWeekFormat='YYYY-MM-DD',
          weekYear='YYYY-WW';
          $scope.dateArray=[];
          $scope.projectHours={};
          $scope.master = [{}];
          
          var cur='now';
          $scope.fromDB=[{}];
          $scope.exists=0;
          $scope.userinDB=0;
          $scope.days=[0,1,2,3,4,5,6];
          $scope.test="test.....";
         $scope.options = [{id: 1, name: 'Opened','disabled': false}, {id: 2, name: 'In progress','disabled': false}, {id: 3, name: 'Completed','disabled': false}, {id: 4, name: 'Closed','disabled': true}];
         $scope.projects =[]; 
         currentDate  = moment();
    var c_time=0;
      $('.fc-button-prev').click(function(){
         alert('prev is clicked, do something');
      });

      $('.fc-button-next').click(function(){
         alert('nextis clicked, do something');
      });
      $rootScope.bgClass = function() {
        var splits=$location.url().toString().split("/");
        var urllast=splits[splits.length - 1];
        if(urllast == "timesheet"){
        return 'bod-bac';
        }else{
        return 'oth-bac';  
        }
      };
      $scope.eventRender = function( event, element, view ) {
        $compile(element)($scope);
      };
      $scope.buttonEvent = function( event) {
        $('#timecalendar').fullCalendar(event);
        savetimesheet();
      };
      
   var name = $rootScope.globals.currentUser.username;
   var uid = $rootScope.globals.currentUser.userId;
   var resource_id = $rootScope.globals.currentUser.resource_id;
   $rootScope.currentUser={
   "Name":name,
    "user_id":uid,
     "resource_id":resource_id 
   };
   $rootScope.shownav=true;
	$rootScope.rootAccess =  $cookieStore.get("rootAccess");
  $rootScope.pmAccess =  $cookieStore.get("pmAccess");
  var prevstart = '';
  UserService.getAllResourceProjects(resource_id)
     .then(function (response) {
      var data = response.data;
            $scope.projects = data;
            weekStart = currentDate.clone().startOf('week'),
            weekEnd = currentDate.clone().endOf('week');
            for(var j=0;j<$scope.projects.length;j++){
            for(var i=0;i<$scope.days.length;i++){
                  $scope.temp_arr=[];
                 if(weekStart.day(i).format('ddd')=='Sun' || weekStart.day(i).format('ddd')=='Sat'){
                   $scope.projects[j].bool[i]=true;
                   $scope.temp_arr[i]='';
                 }
                 else{
                   $scope.projects[j].bool[i]=false;
                   $scope.temp_arr[i]='';
                 }
            }
          }
          
          setCurrentDate(currentDate,0,currentDate.format(weekYear),"");
          getpiedata("week");
            
         });

     function getpiedata(filter) {
      var text= '#btn-pie-group button' ;
        var myEl = angular.element( document.querySelectorAll( text ) ); 
        myEl.removeClass('custactive');
      var wid=moment().format(weekYear);
      var date = moment().format(fullWeekFormat);
      if(filter=="today"){
        var newtext= '#btn-today' ;
        var mynewEl = angular.element( document.querySelector( newtext ) );
        mynewEl.addClass('custactive');
        var piepostData = {"rid":resource_id,"filter":"today","week_id":wid,"dates":[date]};
        
      }else if(filter=="week"){
        var newtext= '#btn-week' ;
        var mynewEl = angular.element( document.querySelector( newtext ) );
        mynewEl.addClass('custactive');
        var piepostData = {"rid":resource_id,"filter":"today","week_id":wid,"dates":$scope.week_full};
      }else{
        var newtext= '#btn-month' ;
        var mynewEl = angular.element( document.querySelector( newtext ) );
        mynewEl.addClass('custactive');
        var piepostData = {"rid":resource_id,"filter":"today","week_id":wid,"dates":$scope.month_full};
      }
      
      UserService.getResourcePieData(piepostData)
             .then(function (response) {
             $scope.labels = response.data.label;
             $scope.doughdata = response.data.doughdata;
             $scope.totalutil = response.data.totalutil;

             });
      }
   $scope.eventSources = [fetchEvents];

    function fetchEvents(start, end, timezone, callback) {
      
      var startdate=$('#timecalendar').fullCalendar('getView').start.format('x');
      var enddate = ($('#timecalendar').fullCalendar('getView').end.format('x'));
      var num = Number(enddate)/1000;
      var newnum = Number(startdate)/1000;
      var wkid=moment.unix(num).format(weekYear);
      var wid=moment().format(weekYear);
      var wday = moment().day();
      var myEl = angular.element( document.querySelector( $scope.weeknames[wday] ) );
      myEl.css('background-color','#ffff00');

      
       
      if(wkid == wid){

          // count=count;
          setCurrentDate(currentDate,0,wkid,newnum);
          // alert("sd");
      }else{
        // savetimesheet();
        if(prevstart > startdate){
          countPrev=0;
          count=count-1;
          cur='prev';
          $scope.PrevInd.push(count);
          setCurrentDate(currentDate.subtract(7,'days'),count,wkid,newnum);
        }else{
          count=count+1;
          cur='next';
          setCurrentDate(currentDate.add(7,'days'),count,wkid,newnum);
        }

        // savetimesheet();
      }
      initital++;

      prevstart = startdate;
     getpiedata("week");

    }
   // $('#timecalendar').fullCalendar.formatDate(calEvent.start, 'dd/MM/yyyy HH:mm');
   $scope.uiConfig = {
        calendar:{
          // height: 750,
          editable: false,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          eventBackgroundColor: "#000000",
          defaultView: "basicWeek",
          //eventRender: $scope.eventRender,


          columnFormat: {
		        month: 'MMMM yyyy',                            // September 2009
		        week: "ddd D ", // Sep 7 - 13 2009
		        day: 'dddd, MMM d, yyyy'                       // Tuesday, Sep 8, 2009
		    },
          dayRender: function( date, cell ) { 
			    var view = $('#timecalendar').fullCalendar('getView');
			    if (view.name == 'basicWeek') {
			        $('.fc-body').hide();
              $('.fc-prev-button').hide();
              $('.fc-next-button').hide();
              $('.fc-today-button').hide();
              if(cell.hasClass('fc-today')){
                cell.css("background-color", "red");
              }
               var pres = moment();
               if(pres === moment(date)){
                cell.css("background-color", "red");
               }
              // 
			    }
			},
          eventLimit: true, 
          weekends: true,
          views: {
            agenda: {
              eventLimit: 4 // adjust to 6 only for agendaWeek/agendaDay
            }
          }
        }
      };
   
    
    


    function setCurrentDate(aMoment,c,wkid,num){
      // var wkid=aMoment.format(weekYear);
     // var wid=moment().format(weekYear);
            var Data = { "week_id":wkid,"user":$rootScope.currentUser};
            UserService.getResourceTimeCard(Data)
                 .then(function (response) {
                  var resData = response.data;
                    for(var i=0;i<resData.length;i++){
                      if(resData[i].userid==uid){
                         $scope.exists=1;
                         $scope.userinDB=1;
                         $scope.fromDB=resData[i].timecard;
                            if(resData[i].timecard.length>1){
                                $scope.exists=2;
                            }
                      }
                    }
                    // setCurrentDate(moment(),0);
            
      count=c;
      currentDate = aMoment,
      weekStart = currentDate.clone().startOf('week'),
      weekEnd = currentDate.clone().endOf('week'),
      $scope.month=currentDate.format(monthFormat);
      $scope.year=currentDate.format(yearFormat);
      $scope.weekYear=wkid;
      $scope.today=[weekStart.day(0).format(shortWeekFormat),weekStart.day(1).format(shortWeekFormat),weekStart.day(2).format(shortWeekFormat),weekStart.day(3).format(shortWeekFormat),weekStart.day(4).format(shortWeekFormat),weekStart.day(5).format(shortWeekFormat),weekStart.day(6).format(shortWeekFormat)];
      $scope.today_full=[weekStart.day(0).format(fullWeekFormat),weekStart.day(1).format(fullWeekFormat),weekStart.day(2).format(fullWeekFormat),weekStart.day(3).format(fullWeekFormat),weekStart.day(4).format(fullWeekFormat),weekStart.day(5).format(fullWeekFormat),weekStart.day(6).format(fullWeekFormat)];
      var weekFullStart = moment().clone().startOf('week');
      $scope.week_full=[weekFullStart.day(0).format(fullWeekFormat),weekFullStart.day(1).format(fullWeekFormat),weekFullStart.day(2).format(fullWeekFormat),weekFullStart.day(3).format(fullWeekFormat),weekFullStart.day(4).format(fullWeekFormat),weekFullStart.day(5).format(fullWeekFormat),weekFullStart.day(6).format(fullWeekFormat)];
      $scope.temp_arr=[];
      $scope.month_full=[];
      if(num){
        var weekCurrStart = moment.unix(num).clone().startOf('week');
      }else{
        var weekCurrStart = weekStart;
      }
       
      $scope.curr_date= [weekCurrStart.day(0).format(fullWeekFormat),weekCurrStart.day(1).format(fullWeekFormat),weekCurrStart.day(2).format(fullWeekFormat),weekCurrStart.day(3).format(fullWeekFormat),weekCurrStart.day(4).format(fullWeekFormat),weekCurrStart.day(5).format(fullWeekFormat),weekCurrStart.day(6).format(fullWeekFormat)];
      var monthday = moment().startOf('month');
        var month = monthday.month();
        while(month === monthday.month()){
            $scope.month_full.push(monthday.format(fullWeekFormat));
            monthday = monthday.add(1,'days')
        }
      $scope.PrevInd=[];
      $scope.temp_obj={};
      var weekcount=0;
      $scope.userData=$scope.fromDB[0];
      var length = Object.keys($scope.userData).length;

            if(length){
              weekcount =1;
            }else{
              weekcount =0;
            }

      for(var j=0;j<$scope.projects.length;j++){
              $scope.projects[j].temp.length = 0;
            }
      for(var j=0;j<$scope.projects.length;j++){
         $scope.projects[j].InputValue.push($scope.temp_arr);
         $scope.projects[j].temp=$scope.projects[j].InputValue[count];
       if(weekcount>0){
               var arr = [];
          for (var key in $scope.userData) {
            var rs=$filter('filter')($scope.projects, {project_id: key});
            if(!rs.length){
              $scope.projects[j].temp=[0,0,0,0,0,0,0];
            }
            if ($scope.userData.hasOwnProperty(key)) {
              if(key == $scope.projects[j].project_id){
                 arr.length=0;
                for (var k in $scope.userData[key]) {
                  arr.push($scope.userData[key][k]);
                }
                $scope.projects[j].temp = angular.copy(arr);

              }
               
              
              arr.length=0;
            }
          }
        }
        else{
          $scope.projects[j].temp=[0,0,0,0,0,0,0];
        }         
     }
     });
    }

    $scope.nextWeek = function(){
    count=count+1;
    cur='next';
    setCurrentDate(currentDate.add(7,'days'),count);
    };

  

    $scope.prevWeek = function(){
      countPrev=0;
      count=count-1;
      cur='prev';

      $scope.PrevInd.push(count);
      setCurrentDate(currentDate.subtract(7,'days'),count);
    };

       function savetimesheet() {
         $scope.master=angular.copy($scope.projects);
         for(var j=0;j<$scope.projects.length;j++){
          for(var i=0;i<$scope.projects[j].temp.length;i++){
            if($scope.projects[j].temp==null && $scope.projects[j].temp==" "){
                        $scope.projects[j].temp=0;
            }
          }
            
          $scope.projects[j].dayHours.length = 0;
         $scope.projects[j].dayHours.push({'day':$scope.curr_date,'Hours':$scope.projects[j].temp});
          }

        
          var postData = { "Exists":$scope.exists,"WeekID":$scope.weekYear,"user":$rootScope.currentUser,"projects":$scope.projects,'Dates':$scope.curr_date};
         // var postData = { };
          UserService.saveTimeCard(postData)
           .then(function (response) {
            // console.log(response);
              // $state.go("timesheet", {}, {reload: true});
           });
          
      //    $http
      //   .post('/addTimecard',{ "Exists":$scope.exists,"WeekID":$scope.weekYear,"user":$rootScope.currentUser,"projects":$scope.projects,'Dates':$scope.today_full})
      //   .success(function(data){
      //     console.log('in posting..'+$scope.weekYear+'...exis'+$scope.exists+'....'+$scope.projects[0].temp);
      //       //what to do here? it's up to you and the data you write from server.
      //   })
      //   .error(function(data){
      //       console.log('Error: ' + data);
      //   });
       };
        

        
    }

})();