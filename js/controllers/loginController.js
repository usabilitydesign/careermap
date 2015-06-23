angular.module('careermap.controllers.loginController', ['utils'] ).controller("loginController", ["$scope", 'authManager',
  function($scope, authManager) {
    
    $scope.$watch('auth.provider', setPreferred);
    setPreferred($scope.auth.provider);

    $scope.filteredProviders = function() {
       return _.filter($scope.providers, function(v,k) {
          return k !== $scope.auth.provider;
       });
    };

    $scope.colorMe = function(id) {
       var c;
       switch(id) {
          case 'facebook':
             c = 'btn-primary';
             break;
          case 'github':
             c = 'btn-inverse';
             break;
          case 'twitter':
             c = 'btn-info';
             break;
          default:
             c = '';
       }
       return !$scope.preferred || $scope.preferred.id === id? c : '';
    };

    function setPreferred(provider) {
      console.log(provider)
       $scope.preferred = provider? angular.extend({}, $scope.providers[provider]) : null;
       authManager.setPreferred(provider);
    }
    
  }
]);

 