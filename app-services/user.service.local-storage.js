(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$cookieStore','$http','$timeout', '$filter', '$q'];
    function UserService($cookieStore,$http,$timeout, $filter, $q) {

        var service = {};
        var hostName='localhost';
        var globals=$cookieStore.get('globals');
        service.saveAccount = saveAccount;
        service.saveUnit = saveUnit;
        service.editUnit = editUnit;
        service.editResource = editResource;
        service.getAccounts = getAccounts;
        service.getAccount=getAccount;
        service.getUnits = getUnits;
        service.getUnit = getUnit;
        service.editUnit= editUnit;
        service.getHeirarchies = getHeirarchies;
        service.getHeirarchy = getHeirarchy;
        service.editHeirarchy = editHeirarchy;
        service.saveHeirarchies = saveHeirarchies;
        service.editAccount = editAccount;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.saveResource = saveResource;
        service.getResources = getResources;
        service.getResource = getResource;
        service.saveSkill = saveSkill;
        service.getSkill = getSkill;
        service.saveService= saveService;
        service.getSkills = getSkills;
        service.getManagers = getManagers;
        service.getServices = getServices;
        service.getService=getService;
        service.editService=editService;
        service.getAllServices = getAllServices;
        service.getFilteredResources = getFilteredResources;
        service.saveAccountDetails = saveAccountDetails;
        service.getAccountResource = getAccountResource;
        service.getResourceDates = getResourceDates;
        service.getFreeResourceDates = getFreeResourceDates;
        service.getMappedResource=getMappedResource;
        service.getModeledResource=getModeledResource;
        service.getallFilteredResources=getallFilteredResources;
        service.validateResDetails=validateResDetails;
        service.validateNewResDetails=validateNewResDetails;
        service.getResourceAccountDates=getResourceAccountDates;
        service.getSkillDates=getSkillDates;
        service.getAccountServices=getAccountServices;
        service.getNewDates=getNewDates;
        service.deleteAccount=deleteAccount;
        service.deleteResource=deleteResource;
        service.deleteRole=deleteRole;
        service.deleteSkill = deleteSkill;
        service.deleteService = deleteService;
        service.deleteUnit = deleteUnit;
        service.deleteDependency=deleteDependency;
        service.getServiceDates=getServiceDates;
        service.saveServiceProject=saveServiceProject;
        service.getAllServiceProjects=getAllServiceProjects;
        service.getProjects=getProjects;
        service.getProject=getProject;//get all projects 
        service.getFilteredProjects=getFilteredProjects;
        service.editServiceProject=editServiceProject;//get all projects associated with a service
        service.checkAvailability=checkAvailability;
		service.deleteProject=deleteProject;
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
        function deleteDependency(data) {
            
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/deletedependency.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  data
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getServiceDates(data) {
            
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/get-service-dates.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  data
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function Create(user) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/users.json',
                headers : { 'Content-Type': 'application/json'  } ,
                data:  user
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveUnit(unit) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/organisational_units.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  unit
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editUnit(unit) {
            var req = {
                method: 'PUT',
                url: unit.url,
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  unit
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editResource(resource) {
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/resources/' + resource.id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                // data:  {"resource":resource}
                data:  resource
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function deleteRole(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/roles/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
		function deleteProject(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/projects/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function deleteUnit(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/organisational_units/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function deleteSkill(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/skills/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function deleteService(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/services/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function deleteResource(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/resources/' + id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editServiceProject(ser) {
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/projects/' + ser.id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  ser
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editService(ser) {
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/services/' + ser.id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  ser
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function editUnit(unit) {
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/organisational_units/' + unit.id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  unit
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function editHeirarchy(role) {
            var req = {
                method: 'PUT',
                url: 'http://'+hostName+':3000/roles/' + role.id + '.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  role
                //{"id":unit.id,"unit_name":unit.unit_name}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function saveHeirarchies(unit) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/roles.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  unit
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getFreeResourceDates(date) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/freeresources.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  date
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getResourceAccountDates(data) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/disenresourcedates.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  data
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function getUnits() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/organisational_units.json',
                headers : { 'Content-Type': 'application/json',
                            "accessToken" : $cookieStore.get('globals').currentUser.accesstoken } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getServices(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/service_units/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getService(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/services/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getProject(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/projects/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccountServices(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/accounts-services/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getManagers() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/managers.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getHeirarchies() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/roles.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccounts() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/accounts.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAccount(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/accounts/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function deleteAccount(id) {
            var req = {
                method: 'DELETE',
                url: 'http://'+hostName+':3000/accounts/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getResources() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/resources.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getFilteredResources(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/filtered-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getallFilteredResources(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/allfiltered-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
        function getSkills() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/skills.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAllServices() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/services.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        

        function saveAccountDetails(account) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/account-details.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  account
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function validateResDetails(res) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resource-occupied.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  {'resources': res}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function validateNewResDetails(res) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resource-new-occupied.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                // data:  {'resources': res}
                data:   res
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        

        function saveAccount(account) {
            //console.log(account);
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/accounts.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  account
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function saveResource(resource) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resources.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  resource
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getResourceDates(resource) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/resources-dates.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  {'resources': resource}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getNewDates(arg) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/new-dates.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  arg
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getSkillDates(skill) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/skill-dates.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  {'skills': skill}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getUnit(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/organisational_units/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getHeirarchy(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/roles/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getSkill(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/skills/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getAccountResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/account-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getMappedResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/mapped-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function getModeledResource(id) {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/model-resources/'+id+'.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        
        function saveSkill(skill) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/skills.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  skill
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
            
        }
        function saveService(service) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/services.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
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
        function saveServiceProject(data) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/projects.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  {"project": data}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getAllServiceProjects() {
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/projects.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getProjects(){
            var req = {
                method: 'GET',
                url: 'http://'+hostName+':3000/projects.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function getFilteredProjects(data){
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/filtered-projects.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data : data
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        function checkAvailability(check,aid) {
            var req = {
                method: 'POST',
                url: 'http://'+hostName+':3000/check-availablity.json',
                headers : { 'Content-Type': 'application/json',
                "accessToken" : $cookieStore.get('globals').currentUser.accesstoken  } ,
                data:  {"check": check,"account_id":aid}
            }
            return $http(req).then(function(response){return response;},function(response){return response;});
        }
        
    }
})();