// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);


app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'customization.html', controller:'customizationController', reloadOnSearch: false});
  $routeProvider.when('/msg',              {templateUrl: 'customization_msg.html', controller:'msgController', reloadOnSearch: false});
});

app.controller('customizationController', function($rootScope, $scope,$http,$routeParams,$location){

	$http.get('/edu/f/edu/customization').
	  success(function(data, status, headers, config) {
            $scope.customizations = data;


  }).
  error(function(data, status, headers, config) {

  });

  $scope.back = function(){
    	window.history.go(-1);
    };
});

app.controller('msgController', function($rootScope, $scope,$http,$location){

    Cookies.json = true;
    $scope.user = Cookies.get("user");
    $scope.postMsg = function(){

        if($scope.content==undefined||$scope.content.trim()==''){
            alert("内容不能为空");
            return;
        }

        $http.get('/edu/f/edu/question/save?euser.id='+$scope.user.id+'&msg='+$scope.content+'&title='+$scope.title).
            success(function(data, status, headers, config) {
                if(data==true){
                    alert("提交成功");
                    window.history.back();
                }else{
                    alert("提交失败");
                }
            }).
            error(function(data, status, headers, config) {
                alert("网络异常");
            });
    };

  $scope.back = function(){
    	window.history.go(-1);
    };

});



