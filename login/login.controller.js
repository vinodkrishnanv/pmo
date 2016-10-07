(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope','$cookieStore','$location', 'AuthenticationService', 'FlashService'];
    function LoginController($rootScope,$cookieStore,$location, AuthenticationService, FlashService) {
        var vm = this;
        $rootScope.shownav=false;
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.user.id) {
                    AuthenticationService.SetCredentials(response.user.id,vm.username, vm.password,response.access_token);
                    $location.path('/home');
                    $rootScope.accesstoken=response.access_token;
                    if(response.user.role=="root"){
                       $cookieStore.put("rootAccess",1) ;
                    }
                } else {
                    FlashService.Error("No User Present");
                    vm.dataLoading = false;
                }
                $rootScope.shownav=true;
            });
        };
    }

})();
