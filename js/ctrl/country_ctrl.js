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
  $routeProvider.when('/',              {templateUrl: 'country.html', controller:'countryController', reloadOnSearch: false});  
  $routeProvider.when('/school/:id/:country',        {templateUrl: 'school.html',controller:'schoolController', reloadOnSearch: false});   
    $routeProvider.when('/detail/:id/:name',        {templateUrl: 'school_detail.html',controller:'detailController', reloadOnSearch: false});   
});


app.controller('schoolController', function($rootScope, $scope,$http,$routeParams){
	$scope.activityId = $routeParams.id;
	$scope.country = $routeParams.country;
	$http.get('/edu/f/edu/school/getByCountryId?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.schools = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });    
  
  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  

	  
  $scope.selectgrade = function(type){
    	if(type==0){
    		$("#grade").html("中小学");
    		//更新列表
	    	$("[grade='0']").show();
	    	$("[grade='1']").hide();
    	}else if(type==1){
	    	$("#grade").html("大学");
	    	//更新列表
	    	$("[grade='0']").hide();
	    	$("[grade='1']").show();	    	
    	}
    	
    	
    	
    };
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});


app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

	$scope.activityId = $routeParams.id;
	$http.get('/edu/f/edu/school/get?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.school = data;
	    
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

app.controller('countryController', function($rootScope, $scope,$http){
  $scope.userAgent = navigator.userAgent;

	$http.get('/edu/f/edu/country').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available
	    $scope.countrys = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
