(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngGrid','ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm','angularjs-dropdown-multiselect','gm.datepickerMultiSelect'])
        .config(config)
        .run(run);
		//var scotchApp = angular.module('app', ['ngRoute', 'ngCookies']);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            // route for the about page
            .when('/account', {
                templateUrl : 'pages/account.html',
                controller  : 'AccountController',
				controllerAs: 'vm'
            })

            // route for the contact page
            .when('/resources', {
                templateUrl : 'pages/resources.html',
                controller  : 'ResourcesController',
                controllerAs: 'vm'
            })
            .when('/project', {
                templateUrl : 'pages/project.html',
                controller  : 'ProjectController',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }
	

    /*scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });*/
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();