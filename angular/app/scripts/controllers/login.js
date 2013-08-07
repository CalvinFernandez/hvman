'use strict';

angular.module('angularApp')
  .controller('LoginCtrl', function ($scope, $http, authService) {
    $scope.email = '';
    $scope.password = '';

    $scope.submit = function() {
      $http({ url: '/api/users/sign_in', method: 'POST', 
        data: 
          { user: 
            { password: $scope.password, 
              email: $scope.email 
            }
          }
        }).success(function(data) { 
          authService.loginConfirmed(data);
        });  
    }
  });
