app.controller("loginCtrl", function($scope,$http,$window,$rootScope,$location) {
  $scope.login = function(user)
  {
    // console.log(user);
    $http.post('/login', user).then( (res) => { //if this is a valid user
      $rootScope.currentUser = user; //This is the OVERALL rootscope!!!!
      console.log($rootScope); //whatever this is supposed to show this isn't working
      $location.url("/account"); //this changes the location to /account
    },  (data) => {
      $window.alert("Error that is not a valid Account, please try again");
      //the data element is not showing.
    })
  };
});