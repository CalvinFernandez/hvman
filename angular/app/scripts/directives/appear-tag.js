angular.module('angularApp').directive('appearTag', function() {

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

      var isAppear = function() {
        checkLock = false;

        if (!$element.is(':visible')) {
          return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
            top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) 
        {
          if (!$element.hasClass('appear')) {
            $element.addClass('appear');
          }
          $element.removeClass('disappear');
        } else {
          if (!$element.hasClass('disappear')) {
            $element.addClass('disappear')
          }
          $element.removeClass('appear');
        }
      }

      var onCheck = function() {
        if (checkLock) {
          return;
        }
        checkLock = true;
        setTimeout(isAppear, opts.interval);
      }
        
      register({'id': id, 'fn': onCheck})

      function destroy() {
        unregister(id);   
      }

      $scope.$on('$locationChangeStart', destroy);
    } 
  }
});
