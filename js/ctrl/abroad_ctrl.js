// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
  'ngCookies',
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
  $routeProvider.when('/',              {templateUrl: 'abroad.html', controller:'abroadController', reloadOnSearch: false});
  $routeProvider.when('/detail/:id',        {templateUrl: 'abroad_detail.html',controller:'detailController', reloadOnSearch: false});
  $routeProvider.when('/login',        {templateUrl: 'login.html',controller:'detailController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams,$cookieStore,$location){

    $scope.$watch('$viewContentLoaded', function() {
        $(".modal").hide();
    });

    $scope.closeEnrollDialog = function(){
        $(".modal").hide();
    };

	$scope.abroadId = $routeParams.id;
    if($cookieStore.get("login")==true){
      $scope.user = $cookieStore.get("user");
    }

    //网络请求数据
    var url = "/edu/f/edu/abroad/get?abroadhome="+$routeParams.id;
    if($scope.user != undefined){
        url = url +'&uid='+$scope.user.id;
    }
	$http.get(url).
	  success(function(data, status, headers, config) {
	    $scope.abroad = data;
        if($scope.abroad.enrolled==true){
          $("#enrollContainer").html("已报名");
          $("#enrollContainer").unbind();
        }
      }).
        error(function(data, status, headers, config) {
    });

  $scope.enroll = function(){

    if($cookieStore.get("login")==true){//进行报名操作
      $scope.user = $cookieStore.get("user");

      $http.get('/edu/f/edu/abroad/enroll/save?userId='+$scope.user.id+'&abroadId='+$scope.abroadId).
          success(function(data, status, headers, config) {
            $scope.enroll_result = data;

            if($scope.enroll_result==true){
              //将我要报名的文字变成已报名
                $(".modal").show();
              $("#enrollContainer").html("已报名");
              $("#enrollContainer").unbind();
            }else{
              alert("注册失败");
            }

          }).
          error(function(data, status, headers, config) {
            alert("注册失败")
          });

    }else{//去登录
      $location.path("/login")
    }

  };

  $scope.login = function(){

    if($scope.loginName==undefined || $scope.loginName==""){
      alert("请输入用户名");
      return
    }

    if($scope.password==undefined || $scope.password==""){
      alert("请输入密码");
      return
    }

      $http.get('/edu/f/edu/account/login?loginName='+$scope.loginName+'&password='+$scope.password).
          success(function(data, status, headers, config) {
            $scope.login_rs = data;
            if($scope.login_rs.rs==true){
              //存储用户信息
              $cookieStore.put("login",true);
              $cookieStore.put("user",$scope.login_rs.euser);
              window.history.back();

            }else{
              alert("用户名或密码错误");
              $cookieStore.put("login",false);
            }

          }).
          error(function(data, status, headers, config) {
            alert("登录失败")
          });
  };
  
  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('abroadController', function($rootScope, $scope,$http){
  $scope.userAgent = navigator.userAgent;

	$http.get('/edu/f/edu/abroad').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available

	    $scope.abroads = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
