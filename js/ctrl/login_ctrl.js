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
  $routeProvider.when('/',              {templateUrl: 'login.html', controller:'loginController', reloadOnSearch: false});  
  $routeProvider.when('/register',        {templateUrl: 'register.html',controller:'registerController', reloadOnSearch: false});   
});

app.controller('registerController', function($rootScope, $scope,$http,$routeParams){		
	 
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
		$http.post('/someUrl', {userName:$scope.userName,password:$scope.password}).
		success(function(data, status, headers, config) {
			
		  alert("注册成功");
		}).
		error(function(data, status, headers, config) {
			
		  alert("注册失败1");
		});  

	  	
	  }; 
	  
  $scope.back = function(){	  
    	window.history.go(-1);
    };

});

app.controller('loginController', function($rootScope, $scope,$http){	
	  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
