'use strict';

angular.module('angularApp')
  .controller('LogoutCtrl', function ($scope, Session, $location) {
    Session.logOut();
    $location.path('/'); 
  });
