angular.module('angularApp').
  directive('redactor', function($parse) {

    return {
      template: '<textarea id="redactor_content"></textarea>',
      restrict: 'E',
      scope: true,

      link: function($scope, $element, $attrs) {
        $(document).ready(function() {
          $scope.redactor = $("#redactor_content").redactor({
            focus: true,
            buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', 'underline', 'fontcolor', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'alignment', '|', 'image', 'link', 'horizontalrule', '|', '|', 'mySave'],
            buttonsCustom: {
              mySave: {
                title: 'Save Button',
                callback: function(buttonName, buttonDOM, buttonObject) {
                  if (!$scope.save) {
                    throw new Error("Redactor requires that you define a save function inside of the parent scope.");  
                  } else {
                    $scope.save();
                  }
                }
              }
            }
          });

          var content = $scope.$eval($attrs.content) || "";
          var contentSetter = $parse($attrs.content);
          contentSetter($scope);

          $element.on('click keyup', function(event) {
            var content = $scope.redactor.getCode();
            contentSetter.assign($scope, content); 
          });
          

          $scope.$watch($attrs.content, function(newValue, oldValue) {
            if (newValue !== oldValue) {
              $scope.redactor.setCode(newValue);
            }  
          });

          $scope.redactor.setCode(content);
        });
      }
    }
  });
