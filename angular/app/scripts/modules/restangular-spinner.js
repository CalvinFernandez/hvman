angular.module('restangularSpinner', ['restangular'])
  .run(function($rootScope, Restangular) {

    $rootScope.restangularSpinners = [];

    $rootScope.registerRestangularSpinner = function(data) {
      $rootScope.restangularSpinners.push(data);
      return $rootScope.restangularSpinners.length - 1;
    }

    $rootScope.unregisterRestangularSpinner = function(idx) {
      /*
       * Sets the index of the spinner to empty removing it from the 
       * array will mess up indices of other spinners
       */
      if ($rootScope.restangularSpinners[idx]) {
        $rootScope.restangularSpinners[idx] = '';
      }
    }

    var fireSpinners = function(operation, what, url, method) {
      var len = $rootScope.restangularSpinners.length;            
      for (var i = 0; i < len; i ++) {
        var candidate = $rootScope.restangularSpinners[i];
        if (candidate && candidate.matches(operation, what, url)) {
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
        var activeHideInnerHtml = $attrs.spinnerActiveHideInnerHtml || false;
        var activeInnerHtml; // Don't initialize here because run time might change inner html;

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
          if (activeElement)  {
            var elem = $(activeElement);
            elem.removeClass('spinning');
            if (activeHideInnerHtml) {
              elem.html(activeInnerHtml);
            } 
          } 

          successElement && $(successElement).removeClass('spinning');
          errorElement   && $(errorElement).removeClass('spinning'); 
        }

        var active = function() {
          allOff();
          if (activeElement) {
            var elem = $(activeElement);
            elem.addClass('spinning');
            if (activeHideInnerHtml) {
              activeInnerHtml = elem.html();
              elem.html('');
            }
          }
        }

        var success = function() {
          allOff();
          successElement && $(successElement).addClass('spinning');
        }

        var error = function() {
          allOff();
          errorElement && $(errorElement).addClass('spinning');
        }
        
        var spinnerIndex = $scope.$root.registerRestangularSpinner(
          {
            'matches':  match,
            'active':   active,
            'success':  success, 
            'error':    error
        })

        /*
         * remove self from registered spinners
         */
        $scope.$on('$destroy', function() {
          $scope.$root.unregisterRestangularSpinner(spinnerIndex);    
        });
      }
    }
  });
