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

app.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'reply.html', controller: 'replyController', reloadOnSearch: false});
    $routeProvider.when('/detail/:id', {
        templateUrl: 'reply_detail.html',
        controller: 'detailController',
        reloadOnSearch: false
    });
    $routeProvider.when('/msg',        {templateUrl: 'reply_msg.html',controller:'msgController', reloadOnSearch: false});
});

app.controller('detailController', function ($rootScope, $scope, $http, $routeParams) {

    for(var i=0;i<$rootScope.replies.length;i++){
        if($rootScope.replies[i].id == $routeParams.id){
            $scope.reply = $rootScope.replies[i];
            if($scope.reply.reply==''||$scope.reply.reply == undefined)$scope.reply.reply='暂无回复';
            break;
        }
    }

    $scope.deliberatelyTrustDangerousSnippet = function () {
        return $sce.trustAsHtml($scope.snippet);
    };

    $scope.back = function () {
        window.history.go(-1);
    };

});

app.controller('replyController', function ($rootScope, $scope, $http) {
    Cookies.json = true;
    $scope.user = Cookies.get("user");

    $http.get('/edu/f/edu/question?uid='+$scope.user.id).
        success(function (data, status, headers, config) {
            $rootScope.replies = data.questions;

        }).
        error(function (data, status, headers, config) {
            alert('读取数据失败');
        });

    $scope.back = function () {
        window.history.go(-1);
    };

});


app.controller('msgController', function($rootScope, $scope,$http,$location,$routeParams){
    Cookies.json = true;
    $scope.user = Cookies.get("user");

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
        $http.get('/edu/f/edu/question/save?euser.id='+$scope.user.id+'&msg='+$scope.content+'&title='+$scope.title).
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
    $scope.back = function(){
        window.history.go(-1);
    };


});
