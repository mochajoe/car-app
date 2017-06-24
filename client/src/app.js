var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/src/views/searchBar.html',
    controller: 'searchBarCtrl'
  })
  .when('/login', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/register', {
    templateUrl: '/src/views/register.html',
    controller: 'registerCtrl'
  })
  .when('/searchBar', {
    templateUrl: '/src/views/searchBar.html',
    controller: 'searchBarCtrl'
  })
  .when('/account', {
    templateUrl: '/src/views/account.html',
    resolve : {
      //we can go here if the following dependancies are resolved, that is what resolve is
      logincheck: checkLoggedin

    }
  })
  .when('/logout', {
    templateUrl: '/src/views/logout.html',
    controller: 'logoutCtrl'
  })

  $locationProvider.html5Mode(true)
});

app.controller("appCtrl", function($scope) {
  var images = ["/images/tesla.jpeg", "/images/bmw.jpeg", "/images/porche.jpeg", "/images/rover.jpeg", "/images/bg5.jpeg", "/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg", "/images/5.jpg", "/images/6.jpg", "/images/7.jpeg", "/images/8.jpeg", "/images/9.jpeg", "/images/10.jpg", "/images/11.jpeg"]

  var index = Math.floor(Math.random()*images.length)

  $scope.image = images[index];
})

// need to write a function to checkLogged in


var checkLoggedin = ($http,$rootScope,$location) => {
  $http.get('/loggedin')
    .then( (user)=> {
      if(user.data !== '0') {
        $rootScope.currentUser = user.data;
        console.log($rootScope.currentUser );
      }

      else {
        $rootScope.errorMEssage = "You need to log in";
        $location.url('/login')
      }
    })
  }