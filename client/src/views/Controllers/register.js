app.controller("registerCtrl", function($scope,$http) {
  $scope.register = function(user)
  {
    console.log(user);
    $http.post('/register', user).then(function successCallback(res) {
      console.log(res);
    }, function errorCallBack(response) {
      console.log(response);
    })
  };
});