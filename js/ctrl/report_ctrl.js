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
  $routeProvider.when('/',              {templateUrl: 'report.html', controller:'reportController', reloadOnSearch: false});
  $routeProvider.when('/list/:id',        {templateUrl: 'report_list.html',controller:'listController', reloadOnSearch: false});
  $routeProvider.when('/detail/:id',        {templateUrl: 'report_detail.html',controller:'detailController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

    for(var i=0;i<$rootScope.reports.length;i++){
      if($rootScope.reports[i].id==$routeParams.id){
        $scope.report = $rootScope.reports[i];
        break;
      }

    }

  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('listController', function($rootScope, $scope,$http,$routeParams){

	$http.get('/edu/f/edu/report/list?type='+$routeParams.id).
	  success(function(data, status, headers, config) {
          $rootScope.reports = data;

  }).
  error(function(data, status, headers, config) {


  });

  $scope.deliberatelyTrustDangerousSnippet = function() {
	return $sce.trustAsHtml($scope.snippet);
  };

  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('reportController', function($rootScope, $scope,$http){

  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
