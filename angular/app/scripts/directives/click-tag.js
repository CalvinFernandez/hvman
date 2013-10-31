angular.module('angularApp').directive('clickTag', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var target = $element;

      if ($attrs.clickTag !== "") {
        target = $($attrs.clickTag);
      }

      $element.on('click', function() {
        target.toggleClass('click');
      });
    } 
  }
});
