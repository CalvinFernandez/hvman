'use strict';

angular.module('angularApp')
  .controller('LoginCtrl', function ($scope, authService, Session, assertService) {
    $scope.email = '';
    $scope.password = '';
    
    $scope.submit = function() {
      Session.logIn($scope.email, $scope.password).then(
        function(data) {
          authService.loginConfirmed(data);
        }, 
        function(data) {
          assertService(false, 'Your email or password is incorrect. Please retry.');
        });
    }
  });
