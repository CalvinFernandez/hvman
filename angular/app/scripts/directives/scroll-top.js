angular.module('angularApp').directive('scrolledTag', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });
    }
  }
});
