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
  $routeProvider.when('/',              {templateUrl: 'suggestion.html', controller:'suggestionController', reloadOnSearch: false});
  $routeProvider.when('/msg/:type',        {templateUrl: 'suggestion_msg.html',controller:'msgController', reloadOnSearch: false});
});

app.controller('suggestionController', function($rootScope, $scope){
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});

app.controller('msgController', function($rootScope, $scope,$http,$routeParams){


    $scope.back = function(){
            window.history.go(-1);
    };

    $scope.postMsg = function(){
        if($scope.title == undefined){
            alert('请输入标题');
            return;
        }else if($scope.content == undefined){
            alert('请输入标题');
            return;
        }

        //提交
        $http.get('/edu/f/edu/suggestion/save?type='+$routeParams.type+'&title='+$scope.title+'&msg='+$scope.content).
            success(function(data, status, headers, config) {
                if(data==true){
                    alert('提交成功');
                    window.history.go(-1);
                }else{
                    alert('提交失败');
                }

            }).
            error(function(data, status, headers, config) {
                alert('提交失败');
            });
    };

});
