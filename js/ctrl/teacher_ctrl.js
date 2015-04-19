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
  $routeProvider.when('/',              {templateUrl: 'teacher.html', controller:'teacherController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'teacher_detail.html',controller:'detailController', reloadOnSearch: false});   
  $routeProvider.when('/msg',        {templateUrl: 'teacher_msg.html',controller:'msgController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){
	$scope.activityId = $routeParams.id;
	$http.get('/edu/f/edu/teacher/get?id='+$routeParams.id).
	  success(function(data, status, headers, config) {
	    $scope.teacher = data;
	    
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

app.controller('msgController', function($rootScope, $scope,$http){
	$scope.title="";
	$scope.content="";
	
	$scope.postMsg = function(){
		if($scope.title==""){
			alert("请输入标题");
			return;
		}
			
		if($scope.content==""){
			alert("请输入内容");
			return;
		}
		
		//提交请求
		$http.get('/edu/f/edu/teacher').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available
	    $scope.teachers = data;	    
	    setTimeout(function(){

	    	filterMajor($scope.majors[0].id)
	    },100);
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
			
	};
	
});

app.controller('teacherController', function($rootScope, $scope,$http){
  
	//教师列表
	$http.get('/edu/f/edu/teacher').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available
	    $scope.teachers = data;	    
	    setTimeout(function(){

	    	filterMajor($scope.majors[0].id)
	    },100);
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
  
  $scope.userAgent = navigator.userAgent;
	//专业列表
	$http.get('/edu/f/edu/teacher/majorList').
	  success(function(data, status, headers, config) {
	    $scope.majors = data;
	    var c ="";
	    for(i=0;i<data.length;i++){
	    	c+="<li><a onClick=\"filterMajor('"+data[i].id+"')\">"+data[i].name+"</a></li>";
	    	if(i!=data.length-1)c+="<li class='divider'></li>";
	    }
	    $("#major").html(c);
	    
	    $("#majorShow").html(data[0].name);	    
	    
  }).
  error(function(data, status, headers, config) {	
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };      
  
});

function filterMajor(id){	
    //更新列表
    $("[major]").parent().hide();
	$("[major='"+id+"']").parent().show();
}

