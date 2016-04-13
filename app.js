(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngGrid','ngSanitize','ui.grid', 'ui.grid.edit','ui.grid.resizeColumns','ui.bootstrap', 'schemaForm','angularjs-dropdown-multiselect','gm.datepickerMultiSelect','demo-calendar','ui.router','ui.calendar','ui.select2'])
        .config(config)
        .run(run)
        ;
		//var scotchApp = angular.module('app', ['ngRoute', 'ngCookies']);

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
    
    function config($urlRouterProvider, $locationProvider,$stateProvider) {
       $stateProvider
            .state('login', {
            url: "/login",
            templateUrl: 'login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm'

            })
            .state('home', {
                    url: "/",
                    controller: 'HomeController',
                    templateUrl: 'home/home.view.html',
                    controllerAs: 'vm'
                })

            .state('register', {
                url: "/register",
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            // route for the about page
            .state('account', {
                url: "/account",
                templateUrl : 'accounts/account.html',
                controller  : 'AccountController',
				controllerAs: 'vm',
                onEnter: ["$state", function($state) {
     /* $(document).on("keyup", function(e) {
        if(e.keyCode == 27) {
          $(document).off("keyup");
          $state.go("account");
        }
      });*/

      $(document).on("click", ".btn-danger", function() {
        $state.go("account");
      });

      
    }],
            })
    //.state('parent', {url: '/act', abstract: true, template: '<ui-view/>'} )
            .state('account.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "accounts/account.add.html"
                      }
                    },
                controller  : 'AccountController',
                controllerAs: 'vm'
                })
            .state('account.edit', {
                url: '/edit/:id',
                views:{
                      "modal": {
                        templateUrl: "accounts/account.add.html",
                        controller  : 'AccountEditController',
                        controllerAs: 'vm'

                      }
                    },
                    
                // controller  : 'AccountController',
                })
            

            // route for the contact page
            .state('resources', {
                url: "/resources",
                templateUrl : 'resources/resources.html',
                controller  : 'ResourcesController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
      $(document).on("click", ".btn-danger", function() {
        $state.go("resources");
      });

      
    }],
            })
            .state('resources.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "resources/resources.add.html",
                        controller  : 'ResourcesController',
                        controllerAs: 'vm'

                      }
                    },
                
                })
            .state('resources.edit', {
                url: '/edit/:id',
                views:{
                      "modal": {
                        templateUrl: "resources/resources.add.html",
                        controller  : 'ResourcesEditController',
                        controllerAs: 'vm'

                      }
                    },
                    
                // controller  : 'AccountController',
                })
            
            .state('project', {
                url: "/project",
                templateUrl : 'project/project.html',
                controller  : 'ProjectController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
      $(document).on("click", ".btn-danger", function() {
        $state.go("project");
      });
      }],
            })
            .state('project.calendar', {
                url: '/calendar',
                views:{
                      "modal": {
                        templateUrl: "project/project.calendar.html",
                        controller  : 'ProjectController',
                        controllerAs: 'vm'

                      }
                    },
                    
                // controller  : 'AccountController',
                })
            .state('units', {
                url: "/units",
                templateUrl : 'ounit/unit.html',
                controller  : 'UnitController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
                  $(document).on("click", ".btn-danger", function() {
                    $state.go("units");
                  });

                  
                }],
            })
            .state('units.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "ounit/unit.add.html",
                        controller  : 'UnitController',
                        controllerAs: 'vm'

                      }
                    },
                
                })
            .state('units.edit', {
                url: '/edit/:id',
                views:{
                      "modal": {
                        templateUrl: "ounit/unit.add.html",
                        controller  : 'UnitController',
                        controllerAs: 'vm'

                      }
                    },
                    
                // controller  : 'AccountController',
                })
            .state('roles', {
                url: "/roles",
                templateUrl : 'heirarchy/heirarchy.html',
                controller  : 'HeirarchyController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
                  $(document).on("click", ".btn-danger", function() {
                    $state.go("roles");
                  });

                  
                }],
            })
            .state('roles.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "heirarchy/roles.add.html",
                        controller  : 'HeirarchyController',
                        controllerAs: 'vm'

                      }
                    },
                
                })
            .state('skill', {
                url: "/skill",
                templateUrl : 'skills/skills.html',
                controller  : 'SkillController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
                  $(document).on("click", ".btn-danger", function() {
                    $state.go("skill");
                  });

                  
                }],
            })
            .state('skill.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "skills/skills.add.html",
                        controller  : 'SkillController',
                        controllerAs: 'vm'

                      }
                    },
                
                })
            .state('services', {
                url: "/services",
                templateUrl : 'services/services.html',
                controller  : 'ServicesController',
                controllerAs: 'vm',
                onEnter: ["$state", function($state) {
                  $(document).on("click", ".btn-danger", function() {
                    $state.go("services");
                  });

                  
                }],
            })
            .state('services.add', {
                url: '/add',
                views:{
                      "modal": {
                        templateUrl: "services/services.add.html",
                        controller  : 'ServicesController',
                        controllerAs: 'vm'

                      }
                    },
                
                }); 
            $urlRouterProvider.otherwise('/login');

           
    }
	

    /*scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });*/
/*provider.$inject = ['$stateProvider'];
function provider($stateProvider) {
    "use strict";
    var provider = this;
    this.$get = function() {
      return provider;
    };
    this.state = function(stateName, options) {
      var modalInstance;
      $stateProvider.state(stateName, {
        url: options.url,
        onEnter: function($modal, $state) {
          modalInstance = $modal.open(options);
          modalInstance.result["finally"](function() {
            modalInstance = null;
            if ($state.$current.name === stateName) {
              $state.go("^");
            }
          });
        },
        onExit: function() {
          if (modalInstance) {
            modalInstance.close();
          }
        }
      });
    };
  }*/
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
   /* modalStateProvider.state("menu", {
        template: "I am a Dialog!",
        controller: function ($scope) {
          $scope.dismiss = function () {
            $scope.$dismiss();
          };
        }
  });*/

})();