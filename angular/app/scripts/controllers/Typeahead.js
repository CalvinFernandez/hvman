'use strict';

angular.module('angularApp')
  .controller('TypeaheadCtrl', function ($scope, $http, $location) {
    var input = '';

    $http({ url: '/api/tags/', method: 'GET'}).success(function(tags) {
      $scope.results = tags;
    });

    $scope.submit = function() {
      if ($scope.typeSelected) {
        $location.path('/' + input);
      }
    }

    $scope.$watch('typeSelected', function(newValue, oldValue) {
      input = newValue;
    });

  });
