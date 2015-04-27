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
  $routeProvider.when('/',              {templateUrl: 'customization.html', controller:'customizationController', reloadOnSearch: false});
  $routeProvider.when('/msg',              {templateUrl: 'customization_msg.html', controller:'msgController', reloadOnSearch: false});
    $routeProvider.when('/login',        {templateUrl: 'login.html',controller:'msgController', reloadOnSearch: false});
});

app.controller('customizationController', function($rootScope, $scope,$http,$routeParams){

	$http.get('/edu/f/edu/customization').
	  success(function(data, status, headers, config) {
            $scope.customizations = data;


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

app.controller('msgController', function($rootScope, $scope,$http,$location){
    Cookies.json = true;
    if(Cookies.get("login")==true){//进行报名操作
        $scope.user = Cookies.get("user");

    }else{
        $location.path("/login")
    }

    $scope.submitMsg = function(){

        if($scope.content==undefined||$scope.content.trim()==''){
            alert("内容不能为空");
            return;
        }

        $http.get('/edu/f/edu/customization/msg?uid='+$scope.user.id+'&msg='+$scope.content).
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
                    Cookies.set('login', true, { path: '/'});
                    //$cookieStore.put("login",true);
                    //$cookieStore.put("user",$scope.login_rs.euser);
                    Cookies.set('guardian', $scope.login_rs.guardian, { path: '/'});
                    Cookies.set('user', $scope.login_rs.euser, { path: '/'});
                    window.history.back();

                }else{
                    alert("用户名或密码错误");
                    Cookies.put("login",false);
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



