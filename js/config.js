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
  

  // your Firebase URL goes here
  .constant('FIREBASE_URL', 'https://careermap.firebaseio.com/')
  .constant('authProviders', [
      { id: 'twitter',  name: 'Twitter',  icon: 'icon-twitter'  },
      { id: 'facebook', name: 'Facebook', icon: 'icon-facebook' },
      { id: 'github',   name: 'GitHub',   icon: 'icon-github'   },
      { id: 'email',    name: 'Email',    icon: 'icon-envelope' }
   ])
  .constant('loginRedirectPath', '/login')