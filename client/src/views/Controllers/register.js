app.controller("registerCtrl", function($scope,$http) {
  $scope.register = function(user)
  {
    console.log(user);
    //TODO verify that passwords are the same and then invocate the post
    if(user.password === user.password2){
    $http.post('/register', user).then(function successCallback(res) {
      console.log(res);
    }, function errorCallBack(response) {
      console.log(response);
    })
  };
    }
});