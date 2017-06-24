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
    templateUrl: '/src/views/account.html'
  })

  $locationProvider.html5Mode(true)
});


