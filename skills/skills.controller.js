(function () {
    'use strict';

    angular
        .module('app')
        .controller('SkillController', SkillController)
        .controller('RowEditCtrl', RowEditCtrl)
        .service('RowEditor', RowEditor);
	SkillController.$inject = ['$rootScope','$timeout','$scope','$log','$http','UserService', '$location', 'FlashService','RowEditor'];
	function SkillController($rootScope,$timeout,$scope,$log,$http,UserService, $location,FlashService,RowEditor) {

        var vm = this;
        var jsonstring="";
        vm.saveskill = saveskill;
        var rowIndexTemp = 0;
        $rootScope.availableSkillOptions = [
      {id: 'Technical', skill_type: 'Technical'},
      {id: 'Marketing', skill_type: 'Marketing'}
    ];

        /*$scope.data = {
                          repeatSelect: null,
                          statusSelect: null,
                          managerSelect: null,
                          availableSkillOptions: $rootScope.availableSkillOptions,
                         };*/
        $timeout(function () {
        UserService.getSkills()
                         .then(function (response) {
                          $scope.data = {
                          repeatSelect: null,
                          statusSelect: null,
                          managerSelect: null,
                          availableSkillOptions: $rootScope.availableSkillOptions,
                         };
                         });
                       },3000);
    $scope.clickHandler = RowEditor.editRow;
		$scope.eventDetails = eventDetails;
    $scope.message = 'Look! I am a Resource page.';
        
    $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }

     function saveskill() {
            vm.dataLoading = true;
            UserService.saveSkill(vm.skill)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Save successful', true);
                        vm.dataLoading = false;
                        UserService.getSkills()
                          .then(function (response) {
                             vm.gridOptions.data = response.data;
                           });
                    } else {
                        FlashService.Error(response.data.error.skill_name[0]);
                        vm.dataLoading = false;
                    }
                });
        }

    function eventDetails(event){
       $scope.selected = event;
       $scope.query = event;
      
    }

    $scope.example13model = [];
$scope.example13data = [
    {id: 1, label: "David"},
    {id: 2, label: "Jhon"},
    {id: 3, label: "Lisa"},
    {id: 4, label: "Nicole"},
    {id: 5, label: "Danny"}];

$scope.example13settings = {
	scrollableHeight: '200px',
    scrollable: true,
	enableSearch: true,
    
};

vm.gridOptions = {

    columnDefs: [
    { field: 'id',  cellTemplate:'<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.clickHandler(grid,row)"><i class="fa fa-edit"></i></button></div>', width: 60 },
    { name: 'skill_name' },
      { name: 'skill_type' },
      { name: 'skill_code' },
    ]

  };
  UserService.getSkills()
     .then(function (response) {
      vm.gridOptions.data = response.data;
     });
    }


RowEditor.$inject = ['$rootScope', '$modal','UserService'];

function RowEditor($rootScope, $modal,UserService) {

  var service = {};

  service.editRow = editRow;

  

  function editRow(grid, row) {
    $modal.open({

      templateUrl: 'skills/edit-skill-modal.html',

      controller: ['$modalInstance', '$rootScope', 'grid', 'row','UserService', RowEditCtrl],

      controllerAs: 'vm',

      resolve: {

        grid: function () { return grid; },

        row: function () { return row; }

      }

    });

  }

  

  return service;

}
function RowEditCtrl($modalInstance, $rootScope, grid, row ,UserService) {

  var vm = this;
  vm.entity = angular.copy(row.entity);
  vm.items = $rootScope.availableHeirarchyOptions;
  vm.save = save;
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
    UserService.editAccount(row.entity);

  }

}


     
    
})();

