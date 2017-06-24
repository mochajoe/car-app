app.controller("RegisterCtrl", function($scope,$http) {
  $scope.login = function(user)
  {
    console.log(user);
    $http.post('/register', user).then(function successCallback(res) {
      console.log(res);
    }, function errorCallBack(response) {
      console.log(response);
    })
  };
});