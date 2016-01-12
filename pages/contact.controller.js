(function () {
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);
	ContactController.$inject = ['$scope'];
	function ContactController($scope) {
        $scope.message = 'Look! I am a Contact page.';
    }
    

})();