app.factory('SessionService', ['$http', function($http) {
  var _this = this;
  this.currentUser = '';     

  var getCurrentUser = function(options) {
    if (options && options.refresh) {
      $http.get('currentUser').success(function(data) {
        _this.currentUser = data;   
        return _this.currentUser;
      }).
      error(function(data, status) {
        console.log(status);
      });
    } else {
      return _this.currentUser;   
    }
  } 

  return { 
    getCurrentUser: getCurrentUser,
  }
}]);
