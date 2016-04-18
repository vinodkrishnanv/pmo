(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope','$location', 'AuthenticationService', 'FlashService'];
    function LoginController($rootScope,$location, AuthenticationService, FlashService) {
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
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error("No User Present");
                    vm.dataLoading = false;
                }
                $rootScope.shownav=true;
            });
        };
    }

})();
