angular.module('angularApp').directive('stopPropagation', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.on("click keyup", function(e) {
        e.stopPropagation();
      });
    }
  }
});
