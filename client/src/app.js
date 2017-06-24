var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
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

  $locationProvider.html5Mode(true)
});

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