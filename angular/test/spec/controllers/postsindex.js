'use strict';

describe('Controller: PostsindexCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var PostsindexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostsindexCtrl = $controller('PostsindexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
