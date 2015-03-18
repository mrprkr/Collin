//GLOBAL
var app = angular.module('tom_tab', ['ngRoute','templatescache', 'firebase']);
var firebaseURL = "https://collin.firebaseio.com";

//RUNS
app.run(function($rootScope, $location){
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
});

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				templateUrl: 'home.html',
				controller: 'main-controller',
				resolve: {
			      "currentAuth": ["Auth", function(Auth) {
			        return Auth.$requireAuth();
			      }]
				}
			})
	
			.when('/login', {
				templateUrl: "login.html",
				controller: 'auth-controller'
			})

			.when('/temp', {
				templateUrl: "temp.html",
				controller: 'temp-controller'
			})

			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
}]);

//FACTORIES
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase(firebaseURL);
  return $firebaseAuth(ref);
}]);

app.controller('auth-controller', function($scope, $firebase, Auth, $timeout, $location){
	Auth.$onAuth(function(authData){
		if (authData) {
			console.log("User " + authData.uid + " is logged in with " + authData.provider);
			$scope.authData = authData;
		} else {
			console.log("User is logged out");
			$scope.authData = null;
		}
	})

	$scope.login = function(email, password){
		$scope.authenticating = true;
		Auth.$authWithPassword({email: email, password: password}).then(function(err, authData)
		{
			$location.path('/');
		}).catch(function(err) {
      		console.error("Authentication failed: ", err);
      		$scope.authenticating = false;
		  	$scope.$apply();
	    });
	}

	$scope.logout = function(){
		Auth.$unauth();
		$timeout(function(){
			$location.path('/');
		}, 300);
	};

});


app.controller('main-controller', function($scope, Auth, $timeout, $firebaseArray, $location){
	Auth.$onAuth(function(authData){
		if (authData) {
			$scope.authData = authData;
		}
	});

	$scope.logout = function(){
		Auth.$unauth();
		$location.path('/login');
	};

	var ref = new Firebase(firebaseURL).child('costs');
	$scope.costs = $firebaseArray(ref);

	$scope.newCost = function(){
		$scope.costs.$add({
			name: "My first Cost",
			desc: "Shopping",
			date: "timestamp here",
			payee: "Parker",
			cost: "$44.50",
			payer: "Tom",
			owing: "$22.00"
		});
	};

	$scope.remove = function(object){
		console.log("removing:", this);
		$scope.costs.$remove(object);
	}

	$scope.newExpense = {};
	$scope.newExpense.split = true;

	$scope.createNewExpense = function(){
		if($scope.newExpense.split === true){
			$scope.newExpense.owed = ($scope.newExpense.amount/2).toFixed(2);
		}
		else {
			$scope.newExpense.owed = $scope.newExpense.amount;
		}
		$scope.newExpense.author = $scope.authData.password.email;
		$scope.costs.$add($scope.newExpense);
		$scope.expenseForm = false;
		console.log("new expense created", $scope.newExpense);
	}

	$scope.yourBalance = function(){
		var owing;
		for (cost in $scope.costs){
			owing += $scope.costs[cost].owing;
		}
		return owing;

	}

});


app.controller('temp-controller', function($scope){

	// $scope.balance = {
	// 	parker : 41.00;
	// }

	var c = document.getElementById("experiment-canvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#ffffff";
	// ctx.fillRect(0,0,150,75);
	ctx.strokeStyle = "#fff";
	ctx.rect(0, 50, 150, 50);

	ctx.stroke();
})
































