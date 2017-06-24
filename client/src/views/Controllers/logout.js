app.controller('logoutCtrl', function($rootScope,$scope,$http,$location,$timeout){
 var logout = function()
  {
    $http.post("/logout")
    .then(function(){
      $rootScope.currentUser = null;
      $location.url("/");
    });
  }
  $timeout(logout, 700)
});