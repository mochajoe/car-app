app.controller("loginCtrl", function($scope,$http,$window,$rootScope,$location) {
  $scope.login = function(user)
  {
    console.log(user);
    $http.post('/login', user).then( (res) => {
      $rootScope.currentUser = user;
      console.log(res);
      $location.url("/account"); //account is the profile
    },  (data) => {
      $window.alert("Error that is not a valid Account, please try again");

    })
  };
});