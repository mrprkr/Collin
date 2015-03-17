var app = angular.module('tom_tab', ['ngRoute','templatescache', 'firebase']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'home.html',
        controller: 'main-controller'
      })
  
      .when('/login', {
        templateUrl: "login.html",
        controller: 'auth-controller'
      })

      .otherwise({
      	redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
}])

app.controller('auth-controller', function($scope, $firebase, $firebaseAuth){



});

app.controller('main-controller', function($scope){



});