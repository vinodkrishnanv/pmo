(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResourcesController', ResourcesController);
	ResourcesController.$inject = ['$scope'];
	function ResourcesController($scope) {
        $scope.message = 'Look! I am a Resource page.';
    }
    

})();