app.controller("loginCtrl", function($scope,$http,$window,$rootScope,$location) {
  $scope.login = function(user)
  {
    // console.log(user);
    $http.post('/login', user)
    .then( (res) => { //if this is a valid user
      $rootScope.currentUser = user; //This is the OVERALL rootscope!!!!
      console.log('this is the rootscope', $rootScope); //whatever this is supposed to show this isn't working
      $window.alert("THIS IS WORKING");
      $location.url("/account"); //this changes the location to /account
     })
    .catch( (response) => {
            $window.alert(`"${response.data}" cannot log in, try again`);
    })
  };
});