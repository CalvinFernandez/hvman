'use strict';

angular.module('angularApp')
  .controller('ComposeCtrl', function($scope, authService, Session, assertService) {

    $scope.save = function(data) {
      console.log(data);  
    }

  }); 
