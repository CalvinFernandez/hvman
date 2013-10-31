angular.module('assert', [])
  .factory('assertService', function ($rootScope) {

    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.alerts = [];
    });

    $rootScope.closeAlert = function() {
      $rootScope.alerts = [];
    }

    $rootScope.alerts = [];

    var assert = function(test, message) {
      if (!test) {
        $rootScope.alerts.push(message);
        return true;
      }
      return false;
    };

    return assert;   
  })
  .directive('assert', function() {
    return {
      template: "<div ng-repeat='alert in alerts' class='ng-cloak margin-top'>" +
                  "<div class='row alert alert-danger'>" +
                    "<button type='button' ng-click='closeAlert()' class='close'>&times</button>" +
                    "{{alert}}" + 
                  "</div>" +
                "</div>",

      restrict: 'E'
    }
  });
