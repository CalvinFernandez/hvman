'use strict';

angular.module('angularApp')
  .controller('LogoutCtrl', function ($scope, $http, $location) {
    console.log("helloworld");

  $http({ url: '/api/users/sign_out', method: 'DELETE' }).success(function(data) { 
    $location.url('/');
    });  
  });
