'use strict';
 
// Declare app level module which depends on filters, and services
angular.module('careermap.config', [])
 
app.config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
      .when('/',                        { templateUrl: 'views/default.html' })
      .when('/signin',                  { templateUrl: 'views/signin.html' })
      .when('/signup',                  { templateUrl: 'views/signup.html' })
      .when('/user',                  { templateUrl: 'views/user.html' })
      .when('/lily',                  { templateUrl: 'views/lily.html' })
      .otherwise(                       { redirectTo: '/' });
    }])
  
  // establish authentication
  

 