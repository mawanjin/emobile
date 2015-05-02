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
  $routeProvider.when('/register',        {templateUrl: 'register.html',controller:'detailController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams,$cookieStore,$location){
    Cookies.json = true;
    $scope.$watch('$viewContentLoaded', function() {
        $(".modal").hide();
    });

    $scope.closeEnrollDialog = function(){
        $(".modal").hide();
    };

	$scope.abroadId = $routeParams.id;

    if(Cookies.get("login")==true){
      $scope.user = Cookies.get("user");
    }else{
        $scope.user = undefined;
    }

    for(var i=0;i<$rootScope.abroads.length;i++){
        if($rootScope.abroads[i].id == $routeParams.id){
            $scope.abroad = $rootScope.abroads[i];
            if($scope.abroad.enrollable==0){
                $("#enrollContainer").hide();
            }else if($scope.abroad.enrolled==true){
                $("#enrollContainer").html("已报名");
                $("#enrollContainer").unbind();
            }
            break;
        }
    }

    //var url = "/edu/f/edu/abroad/get?abroadhome="+$routeParams.id;
    //if($scope.user != undefined){
    //    url = url +'&uid='+$scope.user.id;
    //}
    //$http.get(url).
	 // success(function(data, status, headers, config) {
	 //   $scope.abroad = data;
    //    if($scope.abroad.enrolled==true){
    //      $("#enrollContainer").html("已报名");
    //      $("#enrollContainer").unbind();
    //    }
    //  }).
    //    error(function(data, status, headers, config) {
    //});



  $scope.enroll = function(){

    if(Cookies.get("login")==true){//进行报名操作
      $scope.user = Cookies.get("user");

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

    $scope.register = function(){
        if($scope.userName == undefined||$scope.userName.trim()==""){
            alert("请输入用户名");
            return ;
        }
        if($scope.password == undefined||$scope.password.trim()==""){
            alert("请输入密码");
            return ;
        }
        if($scope.password2 == undefined||$scope.password2.trim()==""||$scope.password!=$scope.password2.trim()){
            alert("二次输入的密码不一致");
            return ;
        }
        //注册
        $http.post('/edu/f/edu/account/register?loginName='+$scope.userName+'&password='+$scope.password, {userName:$scope.userName,password:$scope.password}).
            success(function(data, status, headers, config) {
                if(data.rs==true){
                    alert("注册成功");
                    window.history.go(-1);
                }else{
                    alert(data.msg);
                }

            }).
            error(function(data, status, headers, config) {
                alert("注册失败");
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
            $rootScope.abroads = data;

	    
  }).
  error(function(data, status, headers, config) {

  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
