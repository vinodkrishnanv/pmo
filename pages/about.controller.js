(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);
	AboutController.$inject = ['$scope'];
	function AboutController($scope) {
        $scope.message = 'Look! I am an about page.';
    }
    

})();