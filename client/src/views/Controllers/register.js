app.controller("registerCtrl", function($scope,$http,$rootScope,$window,$location) {
  $scope.register = function(user)
  {
    console.log(user);
    //TODO verify that passwords are the same and then invocate the post
    if(user.password === user.password2){
    $http.post('/register', user).then(function successCallback(user) {
      if (user.data === null) {
        //render out that this is already in the system, I'm going to use a temporary window alert for this now. We need to make this better
        $window.alert("USER ALREADY EXISTS DUDE!!!!!, PICK ANOTHER DAMN NAME")
      } else {
      $rootScope.currentUser = user;
      //alert a successful login
      $window.alert("SUCCESS, REDIRECTING TO ACCOUNT PAGE!!!!!")
      $location.url("/account");
      console.log(user)
      }

      // console.log(user);
    }, function errorCallBack(response) {
      console.log(response);
    })
  } else {
    $window.alert("PASSWORDS DOT NOT MATCH!!!!!!!");
    }
  }
});