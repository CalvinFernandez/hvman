angular.module('angularApp').
  directive('redactor', function() {

    return {
      template: '<textarea id="redactor_content"></textarea>',
      restrict: 'E',
      link: function($scope, $element, $attrs) {
        $(document).ready(function() {
          $scope.redactor = $("#redactor_content").redactor({
            focus: true,
            buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', 'underline', 'fontcolor', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'alignment', '|', 'image', 'link', 'horizontalrule', '|', '|', 'mySave'],
            buttonsCustom: {
              mySave: {
                title: 'Save Button',
                callback: function(buttonName, buttonDOM, buttonObject) {
                  $scope.save();
                }
              }
            }
          });
        });
      },
      controller: function($scope) {
        $scope.save = function() {
          console.log($scope.redactor.getCode());
        } 
      }
    }
  });
