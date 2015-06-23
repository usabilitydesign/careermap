'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('careermap',
  [ 'careermap.config'
  , 'careermap.controllers.dataController'
  , 'careermap.controllers.loginController'
  , 'careermap.controllers.profileController'
  , 'iso.directives'
  , 'firebase'
  , 'firebase.utils'
  , 'fireauthsrve'
  , 'utils'
  , 'firebase.routeSecurity'
  , 'ngRoute'

  ])
	


