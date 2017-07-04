app.controller("accountCtrl", function($scope,$http,$window,$rootScope,$location) {
    var currentUser = $rootScope.currentUser
    $scope.username = currentUser.username

  $.ajax({
    url: "/getUserDetail",
    type: "POST",
    "contentType": "application/json",
    data: JSON.stringify({
        username: $scope.username
    }),
    success: (data) => {
        console.log(data)
        $scope.bio = data.bio
        $scope.location = data.location

        var favCarsFilter = data.favoriteCars.map(function(car) {
            return car.name
        })

        var favCarsArr = []

        favCarsFilter.forEach(function(car) {
            var carDetailFiltered = []
            car.split(' ').forEach(function(carDetail) {
                if (carDetail !== "undefined") {
                    carDetailFiltered.push(carDetail)
                }
            })
            carDetailFiltered = carDetailFiltered.join(' ')
            if (carDetailFiltered.length>0) {
                favCarsArr.push(carDetailFiltered)
            }
        })
        $scope.favoriteCars = favCarsArr

    },
    error: (err) => {
        console.log("err")
    },
    async: false
  })



});