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
    controller: 'accountCtrl'
  })

  $locationProvider.html5Mode(true)
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
  var deferred = $q.defer()

  $http.get('loggedin').success(function(user)
  {
    $rootScope.errorMessage = null;
    // User is Authenticated
    if (user !== '0')
    {
      $rootScope.currentUser = user;
      deferred.resolve();
    }
    // User is Not Authenticated
    else
    {
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
}

