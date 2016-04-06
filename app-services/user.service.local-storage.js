(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$timeout', '$filter', '$q'];
    function UserService($http,$timeout, $filter, $q) {

        var service = {};
        var hostName='localhost';
        service.saveAccount = saveAccount;
        service.saveUnit = saveUnit;
        service.editUnit = editUnit;
        service.editResource = editResource;
        service.getAccounts = getAccounts;
        service.getAccount=getAccount;
        service.getUnits = getUnits;
        service.getHeirarchies = getHeirarchies;
        service.saveHeirarchies = saveHeirarchies;
        service.editAccount = editAccount;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.saveResource = saveResource;
        service.getResources = getResources;
        service.getResource = getResource;
        service.saveSkill = saveSkill;
        service.saveService= saveService;
        service.getSkills = getSkills;
        service.getManagers = getManagers;
        service.getServices = getServices;
        service.getAllServices = getAllServices;
        service.getFilteredResources = getFilteredResources;
        service.saveAccountDetails = saveAccountDetails;
        service.getAccountResource = getAccountResource;
        service.getResourceDates = getResourceDates;
        service.getFreeResourceDates = getFreeResourceDates;
        service.getMappedResource=getMappedResource;
        service.getallFilteredResources=getallFilteredResources;
        service.validateResDetails=validateResDetails;
        service.getResourceAccountDates=getResourceAccountDates;
        return service;

        function handleSuccess(res) {
            console.log(res);
            return function () {
                return { success: true ,message: res};
            };
        }

        function handleError(error) {
            console.log(error);
            return function () {
                return { success: false, message: error };
            };
        }


        function GetByUsername(username) {
            
            var user={"username":username};
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/user/search.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  user
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function Create(user) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/users.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  user
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveUnit(unit) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/organisational_units.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  unit
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editUnit(unit) {
            var req = {
                method: 'PUT',
                url: unit.url,
                headers : { 'Content-Type': 'application/json' } ,
                data:  unit
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editResource(resource) {
            console.log(resource);
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/resources/' + resource.id + '.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  resource
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveHeirarchies(unit) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/heirarchies.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  unit
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getFreeResourceDates(date) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/freeresources.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  date
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getResourceAccountDates(data) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/disenresourcedates.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  data
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function getUnits() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/organisational_units.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getServices(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/service_units/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getManagers() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/managers.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getHeirarchies() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/heirarchies.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccounts() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/accounts.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccount(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/accounts/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getResources() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/resources.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getFilteredResources(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/filtered-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getallFilteredResources(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/allfiltered-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function getSkills() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/skills.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAllServices() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/services.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        

        function saveAccountDetails(account) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/account-details.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  account
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function validateResDetails(res) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resource-occupied.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  res
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }

        function saveAccount(account) {
            //console.log(account);
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/accounts.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  account
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveResource(resource) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resources.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  resource
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getResourceDates(resource) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resources-dates.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  {'resources': resource}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getAccountResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/account-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getMappedResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/mapped-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        
        function saveSkill(skill) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/skills.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  skill
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function saveService(service) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/services.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  service
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        
        

        function editAccount(account) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                GetByAccountname(account.accountName)
                    .then(function (duplicateUser) {
                        var accounts = getAccounts();
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Accountname "' + account.accountName + '" is already present' });


                        } else {
                            

                            // assign id
                            var lastUser = accounts[accounts.length - 1] || { id: 0 };
                            account.id = lastUser.id + 1;

                            // save to local storage
                            accounts.push(account);
                            setAccounts(accounts);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }


        function setAccounts(accounts) {
            localStorage.accounts = JSON.stringify(accounts);
        }
        function setResources(resources) {
            localStorage.resources = JSON.stringify(resources);
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();