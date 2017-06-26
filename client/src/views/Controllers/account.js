app.controller("accountCtrl", function($scope,$http,$window,$rootScope,$location) {

  $.ajax({
    url: "/getUserDetail",
    tyle: "GET",
    "contentType": "application/json",
    success: (data) => {

    $scope.username = data.username
    $scope.bio = data.bio
    $scope.favoriteCars = data.favoriteCars

    },
    async: false
  })



});