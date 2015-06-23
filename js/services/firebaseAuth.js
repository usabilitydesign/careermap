(function(angular) {
   "use strict";
   var appServices = angular.module('fireauthsrve', ['utils', 'firebase', 'firebase.utils']);

   /**
    * A service that authenticates against Fireabase using simple login
    */
   appServices.factory('authManager', ['firebaseRef', '$firebaseAuth', 'authScopeUtil', 'authProviders', '$rootScope', function(firebaseRef, $firebaseAuth, authScopeUtil, authProviders, $rootScope) {
      var auth = $firebaseAuth(firebaseRef());
      
      var providers = {};
      angular.forEach(authProviders, function(p) {
         providers[p.id] = angular.extend({preferred: false}, p);
      });

      // provide some convenience wrappers on $firebaseAuth so it's easy to extend behavior and isolate upgrades
      var inst = {
         login: function(providerId) {
            auth.$login(providerId, { rememberMe: true, scope: 'email'});
         },

         logout: function() {
            $rootScope.$broadcast('authManager:beforeLogout', auth);
            auth.$logout();
         },

         getProviders: function() {
            return providers;
         },

         setPreferred: function(newProvider) {
            angular.forEach(providers, function(p, k) {p.preferred = (k === newProvider)});
         },

         addToScope: function($scope) {
            authScopeUtil($scope);
            $scope.login = inst.login;
            $scope.logout = inst.logout;
            $scope.providers = providers;
            console.log($scope.providers)
         }
      };

      return inst;
   }]);

   /**
    * A simple utility to monitor changes to authentication and set some values in scope for use in bindings/directives/etc
    */
   appServices.factory('authScopeUtil', ['$log', 'updateScope', 'localStorage', '$location', function($log, updateScope, localStorage, $location) {
      return function($scope) {
         $scope.auth = {
            authenticated: false,
            user: null,
            name: null,
            provider: localStorage.get('authProvider')
         };
         console.log("$scope.auth",$scope.auth);

         $scope.$on('$firebaseAuth:login', _loggedIn);
         $scope.$on('$firebaseAuth:error', function(err) {
            $log.error(err);
            _loggedOut();
         });
         $scope.$on('$firebaseAuth:logout', _loggedOut);

         function parseName(user) {
            return user.id;
         }

         function _loggedIn(evt, user) {
            localStorage.set('authProvider', user.provider);
            $scope.auth = {
               authenticated: true,
               user: user.id,
               name: parseName(user),
               provider: user.provider
            };
            updateScope($scope, 'auth', $scope.auth, function() {
               if( !($location.path()||'').match('/hearth') ) {
                  $location.path('/hearth');
               }
            });
         }

         function _loggedOut() {
            $scope.auth = {
               authenticated: false,
               user: null,
               name: null,
               provider: $scope.auth && $scope.auth.provider
            };
            updateScope($scope, 'auth', $scope.auth, function() {
               $location.search('feed', null);
               $location.path('/demo');
            });
         }
      }
   }]);

   appServices.factory('disposeOnLogout', ['$rootScope', function($rootScope) {
      var disposables = [];

      $rootScope.$on('authManager:beforeLogout', function() {
         angular.forEach(disposables, function(fn) {
            fn();
         });
         disposables = [];
      });

      return function(fnOrRef, event, callback) {
         var fn;
         if( arguments.length === 3 ) {
            fn = function() {
               fnOrRef.off(event, callback);
            }
         }
         else if( angular.isObject(fnOrRef) && fnOrRef.hasOwnProperty('$off') ) {
            fn = function() {
               fnOrRef.$off();
            }
         }
         else {
            fn = fnOrRef;
         }
         disposables.push(fn);
         return fnOrRef;
      }
   }]);
})(angular);
