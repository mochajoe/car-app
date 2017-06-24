app.controller("accountCtrl", function($scope,$http,$window,$rootScope,$location) {
  $http.get('/getUsersFavorites/' + $rootScope.currentUser.username)
    .success(function(response){
        $scope.currentUserFavorites = response;
    });
});