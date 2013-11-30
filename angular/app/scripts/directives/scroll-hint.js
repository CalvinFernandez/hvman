angular.module('angularApp').directive('scrollHint', function() {
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
    interval: 0
  }

  return {
    restrict: 'A',
    template: "<div class='hv-position-hint'>" + 
                "<div class='hv-position-mask'></div>" +
                "<div class='hv-position-content'>" +
                  "<p ng-bind-html-unsafe='content'></p>" +
                "</div>" +
              "</div>",

    link: function($scope, $element, $attrs) {
      $scope.content = $scope.$eval($attrs.content) || ""; 
      $scope.$watch($attrs.content, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.content = newVal;
        }
      });

      var id = getId();
      var dragLock = false;

      var $container = $(".hv-position-hint");
      var $mask = $(".hv-position-mask");

      var $window = $(window);
      var lastClientY = 0;

      $window
        .on('mousedown', function(event) {
          var className = event.target.className;
          if (className === "hv-position-mask" 
              || className === "hv-position-hint") { 
            
            lastClientY = event.clientY;

            dragLock = true;  
          }
        })
        .on('mouseup', function() {
          dragLock = false;
        })
        .on('mousemove', function(event) {
          if (dragLock) {
            var diff = event.clientY - lastClientY; 

            if ((($window.height() +  $window.scrollTop()) < 
              ($(document).height())) || diff < 0) {

              lastClientY = event.clientY;

              var documentHeight = $(document).height();

              var height = $container.height();
              var top    = $container.position().top;
               
              var maskTop = $mask.position().top;
              var newMaskTop = maskTop + diff;

              newMaskTop = newMaskTop < 0 ? 0 : newMaskTop;
              newMaskTop = newMaskTop > height ? height : newMaskTop;
              $mask.css("top", newMaskTop + 'px')

              var ratio = height / documentHeight;  
              $window.scrollTop(newMaskTop / ratio);
              
            }
            event.stopPropagation();
            event.preventDefault();
          }
        });


      var moveMask = function() {

        var $window = $(window);
        var $mask = $(".hv-position-mask");

        var documentHeight = $(document).height();
        var documentScrollTop = $window.scrollTop();

        var screenHeight = $window.height();

        var hintHeight = $('.hv-position-hint').height();

        var screenRatio = hintHeight / documentHeight;

        var scaledMaskHeight = screenRatio * screenHeight;
        var scaledMaskTop =    screenRatio * documentScrollTop;
        
        if (scaledMaskHeight !== $mask.height()) {
          var maskHeight = $mask.height(scaledMaskHeight);
        }
         
        $mask.css("top", scaledMaskTop + 'px')
      }

      var onCheck = function() {
        if (dragLock) {
          return;
        }

        setTimeout(moveMask, opts.interval);
      }

      register({'id': id, 'fn': onCheck})

      function destroy() {
        unregister(id);   
      }

      $scope.$on('$destroy', destroy);
   }
  }
});
