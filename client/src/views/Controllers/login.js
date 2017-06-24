app.controller("loginCtrl", function($scope,$http) {
  $scope.login = function(user)
  {
    console.log(user);
    $http.post('/login', user).then(function successCallback(res) {
      console.log(res);
    }, function errorCallBack(response) {
      console.log(response);
    })
  };
});