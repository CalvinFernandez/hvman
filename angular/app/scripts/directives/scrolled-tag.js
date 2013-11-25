angular.module('angularApp').directive('scrolledTag', function() {

  var cbs = [];
  var idCounter = 0;


  var register = function(cb) {
    cbs.push(cb)
  }

  var unregister = function(id) {
    for (var i = 0; i < cbs.length; i ++) {
      if (cbs[i].id === id) {
        cbs.splice(i, 1);  
      }
    }
  }

  var dispatch = function() {
    for (var i = 0; i < cbs.length; i ++) {
      cbs[i].fn.call();  
    }
  }

  var getId = function() {
    idCounter += 1; 
    return idCounter
  }

  $(window).scroll(dispatch).resize(dispatch);

  var opts = {
    interval: 250
  }

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {

      var $window = $(window);
      var checkLock = false; 
      var id = getId();

      var isScrolled = function() {
        checkLock = false;

        if ($window.scrollTop() < 200) {
          $element.removeClass('scrolled');
        } else {
          if (!$element.hasClass('scrolled')) {
            $element.addClass('scrolled');    
          }
        }
      }

      var onCheck = function() {
        if (checkLock) {
          return;
        }

        checkLock = true;
        setTimeout(isScrolled, opts.interval);
      }
        
      register({'id': id, 'fn': onCheck})

      function destroy() {
        unregister(id);   
      }

      $scope.$on('$destroy', destroy);
    } 
  }
});
