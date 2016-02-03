﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$timeout', '$filter', '$q'];
    function UserService($http,$timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByAccountname = GetByAccountname; 
        service.EditByAccountname = EditByAccountname;
        service.saveAccount = saveAccount;
        service.saveUnit = saveUnit;
        service.editUnit = editUnit;
        service.getAccounts = getAccounts;
        service.getUnits = getUnits;
        service.getHeirarchies = getHeirarchies;
        service.saveHeirarchies = saveHeirarchies;
        service.editAccount = editAccount;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetByResourceName = GetByResourceName; 
        service.saveResource = saveResource;
        service.getResources = getResources;

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

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        /*function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }*/
        function GetByUsername(username) {
            
            var user={"username":username};
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/user/search.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  user
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function Create(user) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/users.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  user
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveUnit(unit) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/organisational_units.json',
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
        function saveHeirarchies(unit) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/heirarchies.json',
                headers : { 'Content-Type': 'application/json' } ,
                data:  unit
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function GetByResourceName(resourcename) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getResources(), { employeeName: resourcename });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function GetByAccountname(accountname) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getAccounts(), { accountName: accountname });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function EditByAccountname(accountname) {
            var filtered = $filter('filter')(getAccounts(), { accountName: accountname });
            var user = filtered.length ? filtered[0] : null;
            return user;
        }
        function getUnits() {
            var req = {
                method: 'GET',
                url: 'http://localhost:3000/organisational_units.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getHeirarchies() {
            var req = {
                method: 'GET',
                url: 'http://localhost:3000/heirarchies.json',
                headers : { 'Content-Type': 'application/json' } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccounts() {
            if(!localStorage.accounts){
                localStorage.accounts = JSON.stringify([]);
            }

            return JSON.parse(localStorage.accounts);
        }
        function getResources() {
            if(!localStorage.resources){
                localStorage.resources = JSON.stringify([]);
            }

            return JSON.parse(localStorage.resources);
        }

        function saveAccount(account) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                GetByAccountname(account.accountName)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Accountname "' + account.accountName + '" is already present' });
                        } else {
                            var accounts = getAccounts();

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
        function saveResource(resource) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                GetByResourceName(resource.employeeName)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Resource "' + resource.employeeName + '" is already present' });
                        } else {
                            var resources = getResources();

                            // assign id
                            var lastUser = resources[resources.length - 1] || { id: 0 };
                            resource.id = lastUser.id + 1;

                            // save to local storage
                            resources.push(resource);
                            setResources(resources);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
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