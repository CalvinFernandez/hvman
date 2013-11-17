angular.module('restangularSpinner', ['restangular'])
  .run(function($rootScope, Restangular) {

    $rootScope.restangularSpinners = [];

    $rootScope.registerRestangularSpinner = function(data) {
      $rootScope.restangularSpinners.push(data);
    }     

    $rootScope.fireRestangularSpinners = function(operation, what, url) {
      var len = $rootScope.restangularSpinners.length;            
      for (var i = 0; i < len; i ++) {
        var candidate = $rootScope.restangularSpinners[i];
        if (candidate.matches(operation, what, url)) {
          candidate.fire();   
        }
      } 
    }

    var fireSpinners = function(operation, what, url, method) {
      var len = $rootScope.restangularSpinners.length;            
      for (var i = 0; i < len; i ++) {
        var candidate = $rootScope.restangularSpinners[i];
        if (candidate.matches(operation, what, url)) {
          if (method === 'active') {
            candidate.active();
          } else if (method === 'success') {
            candidate.success();
          } else {
            candidate.error();
          }
        }
      }
    }

    Restangular.setResponseInterceptor(function(data, operation, what, url, response, deferred) {
      fireSpinners(operation, what, url, 'success');
      return data;
    });      
    
    Restangular.setRequestInterceptor(function(element, operation, what, url) {

      fireSpinners(operation, what, url, 'active');
      return element;

    });

    Restangular.setErrorInterceptor(function(response, operation, what, url) {
      fireSpinners(operation, what, url, 'error');
    });
    
  })
  .directive('spinner', function($compile) {
    return  {
      restrict: 'A',
      scope: true,
      link: function($scope, $element, $attrs) {
        $element.css('display', 'none');
        var operations = $attrs.operation.split(' ');
        var what = $attrs.what;
        var url = $attrs.url;

        var activeElement = $attrs.spinnerActive;
        var successElement = $attrs.spinnerSuccess;
        var errorElement = $attrs.spinnerError;

        var match = function(o, w, u) {
          if (what === w) {
            for (var i = 0; i < operations.length; i ++) {
              if (operations[i] === o) {
                return true;
              }
            }
          }
          return false;
        }
        
        function allOff() {
          activeElement  && $(activeElement).removeClass('spinning');
          successElement && $(successElement).removeClass('spinning'); 
          successElement && $(errorElement).removeClass('spinning'); 
        }

        var active = function() {
          allOff();
          activeElement && $(activeElement).addClass('spinning');
        }

        var success = function() {
          allOff();
          successElement && $(successElement).addClass('spinning');
        }

        var error = function() {
          allOff();
          errorElement && $(errorElement).addClass('spinning');
        }
        
        $scope.$root.registerRestangularSpinner(
          {
            'matches':  match,
            'active':   active,
            'success':  success, 
            'error':    error
        })
      }
    }
  })

/*
  .directive('spinnerActive', function() {
    return {
      restrict: 'A',
      scope: false,

      link: function($scope, $element, $attrs) {
        $element.css('display', 'none');
      },

      controller: function($scope, $element, $attrs) {
        $scope.spinnerActiveOn = function() {
          $element.css('display', 'inline-block');
        }
        $scope.spinnerActiveOff = function() {
          $element.css('display', 'none');
        }
      } 
    }
  })
  .directive('spinnerSuccess', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.css('display', 'none');
      },
      controller: function($scope, $element, $attrs) {
        $scope.spinnerSuccessOn = function() {
          $element.css('display', 'inline-block');
        }
        $scope.spinnerSuccessOff = function() {
          $element.css('display', 'none');
        }
      }
    }
  })
  .directive('spinnerError', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.css('display', 'none');
      },
      controller: function($scope, $element, $attrs) {
        $scope.spinnerErrorOn = function() {
          $element.css('display', 'inline-block');
        }
        $scope.spinnerErrorOff = function() {
          $element.css('display', 'none');
        }
      }
    }
  });
  */
