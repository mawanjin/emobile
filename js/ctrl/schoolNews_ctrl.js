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
  $routeProvider.when('/',              {templateUrl: 'schoolNews.html', controller:'schoolNewsController', reloadOnSearch: false});
  $routeProvider.when('/detail/:id',        {templateUrl: 'schoolNews_detail.html',controller:'detailController', reloadOnSearch: false});
  $routeProvider.when('/login',        {templateUrl: 'login.html',controller:'schoolNewsController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){
	$http.get('/edu/f/edu/schoolNews/get?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.schoolNews = data;
	    
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

app.controller('schoolNewsController', function($rootScope, $scope,$http,$location){
  Cookies.json = true;
  if(Cookies.get("login")==true){
    $scope.user = Cookies.get("user");
    $scope.schoolName = $scope.user.school.name;
  }else{
    $location.path("/login")
  }

	$http.get('/edu/f/edu/schoolNews?schoolId='+$scope.user.school.id).
	  success(function(data, status, headers, config) {
	    $scope.schoolNewses = data;
	    
  }).
  error(function(data, status, headers, config) {

  });
  
  $scope.back = function(){
    	window.history.go(-1);
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
            Cookies.json = true;
            Cookies.set('login', true, { path: '/'});
            Cookies.set('user', $scope.login_rs.euser, { path: '/'});
            Cookies.set('guardian', $scope.login_rs.guardian, { path: '/'});
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
  
});
