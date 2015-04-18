// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

app.filter('trustHtml', function ($sce) {

        return function (input) {
            return $sce.trustAsHtml(input);
        }

    });

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'convenience.html', controller:'ConvenienceController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'convenience_detail.html',controller:'detailController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){
	$scope.activityId = $routeParams.id;

	$http.get('/edu/f/edu/convenience/get?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.convenience = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });    
  
  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('ConvenienceController', function($rootScope, $scope,$http){
  $scope.userAgent = navigator.userAgent;

	$http.get('/edu/f/edu/convenience').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available			
	    $scope.conveniences = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
