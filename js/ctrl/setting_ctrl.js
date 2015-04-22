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


app.controller('settingController', function($rootScope, $scope,$http){

	//$http.get('/edu/f/edu/activity/get?id=').
	//  success(function(data, status, headers, config) {
	//
	//
  //}).
  //error(function(data, status, headers, config) {
	//
  //});
  
  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});
