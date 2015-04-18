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
  $routeProvider.when('/',              {templateUrl: 'school.html', controller:'schoolController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'activity_detail.html',controller:'detailController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){
	$scope.activityId = $routeParams.id;

	$http.get('/edu/f/edu/activity/get?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.activity = data;
	    
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

app.controller('schoolController', function($rootScope, $scope,$http){
  $scope.userAgent = navigator.userAgent;

	$http.get('/edu/f/edu/school').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available

	    $scope.activitys = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
