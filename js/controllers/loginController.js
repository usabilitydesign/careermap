angular.module('careermap.controllers.loginController', ['utils', 'firebase'] ).controller("loginController", ["$scope", '$firebaseAuth',
  function($scope, $firebaseAuth) {
    
    var ref = new Firebase("https://careermap.firebaseio.com");
    var auth = $firebaseAuth(ref);
    $scope.login = function() {
      ref.authWithPassword({
        email    : "leigh765@me.com",
        password : "paint123"
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });  
    };
    $scope.newAccount = function (userinfo) {
      console.log(userinfo)
      ref.createUser({
        email    : userinfo.email,
        password : userinfo.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    }

    
  }
]);

 