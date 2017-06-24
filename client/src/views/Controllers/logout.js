app.controller('logoutCtrl', function($rootScope,$scope,$http,$location,$timeout){
 $scope.logout = function()
  {
    $http.post("/logout")
    .then(function(){
      $rootScope.currentUser = null;
      $location.url("/");
    });
  }
  $timeout($scope.logout(), 50000000);
});