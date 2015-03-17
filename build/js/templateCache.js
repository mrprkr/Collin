angular.module("templatescache", []).run(["$templateCache", function($templateCache) {$templateCache.put("foo.html","<h2>Foo</h2>");
$templateCache.put("home.html","<h1>home</h1>");
$templateCache.put("login.html","<h4>login</h4>");}]);