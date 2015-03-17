angular.module("templatescache", []).run(["$templateCache", function($templateCache) {$templateCache.put("home.html","<nav>\n	<button ng-click=\"logout()\">Logout</button>\n</nav>\n\n<div class=\"home-container\">\n	<h1>Home View</h1>\n	<ol>\n		<li ng-repeat=\"cost in costs\">{{cost.name}} | {{cost.desc}} | {{cost.cost}} | <a href=\"\" ng-click=\"remove(this.cost)\">remove</a></li>\n	</ol>\n\n</div>\n\n\n<style>\n	body {\n		background-color: #222;\n	}\n</style>");
$templateCache.put("login.html","\n<div class=\"login-container\">\n	<h1>Collin</h1>\n	<form class=\"login-form\">\n		<h4>Please log in</h4>\n		<input type=\"text\" ng-model=\"email\" placeholder=\"email\">\n		<input type=\"password\" ng-model=\"password\" placeholder=\"password\">\n		<button ng-click=\"login(email, password)\">\n			<span ng-if=\"!authenticating\">Login</span>\n			<span ng-if=\"authenticating\">loading...</span>\n		</button>\n	</form>\n</div>\n\n<style>\n	body {\n		\n	}\n</style>");}]);