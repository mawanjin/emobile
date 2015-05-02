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
app.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'teacher.html', controller: 'teacherController', reloadOnSearch: false});
    $routeProvider.when('/detail/:id', {
        templateUrl: 'teacher_detail.html',
        controller: 'detailController',
        reloadOnSearch: false
    });
    $routeProvider.when('/msg', {templateUrl: 'teacher_msg.html', controller: 'msgController', reloadOnSearch: false});
    $routeProvider.when('/login', {templateUrl: 'login.html', controller: 'detailController', reloadOnSearch: false});
    $routeProvider.when('/register',        {templateUrl: 'register.html',controller:'detailController', reloadOnSearch: false});
});

app.controller('detailController', function ($rootScope, $scope, $http, $routeParams) {
    Cookies.json = true;
    $scope.activityId = $routeParams.id;
    $http.get('/edu/f/edu/teacher/get?id=' + $routeParams.id).
        success(function (data, status, headers, config) {
            $scope.teacher = data;
            if (data.gendar == 1) {
                $("#imgGendar").attr('src', 'imgs/icon_male.png');
                $("#teacherIcon").attr('src', 'imgs/nan.png');
            }

        }).
        error(function (data, status, headers, config) {


        });

    $scope.deliberatelyTrustDangerousSnippet = function () {
        return $sce.trustAsHtml($scope.snippet);
    };

    $scope.back = function () {
        window.history.go(-1);
    };

    $scope.msg = function () {
        //判断是否登录
        if (Cookies.get("login") == true) {//进行报名操作
            $scope.user = Cookies.get("user");
            window.location.href = "#/msg";
        } else {//去登录
            window.location.href = "#/login";
        }
    };

    Cookies.json = true;
    $scope.login = function () {

        if ($scope.loginName == undefined || $scope.loginName == "") {
            alert("请输入用户名");
            return
        }

        if ($scope.password == undefined || $scope.password == "") {
            alert("请输入密码");
            return
        }


        $http.get('/edu/f/edu/account/login?loginName=' + $scope.loginName + '&password=' + $scope.password).
            success(function (data, status, headers, config) {
                $scope.login_rs = data;
                if ($scope.login_rs.rs == true) {
                    //存储用户信息
                    Cookies.set('login', true, {path: '/'});
                    Cookies.set('guardian', $scope.login_rs.guardian, {path: '/'});
                    Cookies.set('user', $scope.login_rs.euser, {path: '/'});
                    window.history.back();

                } else {
                    alert("用户名或密码错误");
                    Cookies.put("login", false);
                }

            }).
            error(function (data, status, headers, config) {
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
});

app.controller('msgController', function ($rootScope, $scope, $http) {
    Cookies.json = true;
    $scope.user = Cookies.get("user");
    $scope.title = "";
    $scope.content = "";

    $scope.postMsg = function () {
        if ($scope.title == "") {
            alert("请输入标题");
            return;
        }

        if ($scope.content == "") {
            alert("请输入内容");
            return;
        }

        //提交请求
        $http.get('/edu/f/edu/question/save?euser.id=' + $scope.user.id + '&msg=' + $scope.content + '&title=' + $scope.title).
            success(function (data, status, headers, config) {
                alert('提交成功');
                window.history.go(-1);
            }).
            error(function (data, status, headers, config) {
                alert('提交失败');
            });

    };

});

app.controller('teacherController', function ($rootScope, $scope, $http) {

    //教师列表
    $http.get('/edu/f/edu/teacher').
        success(function (data, status, headers, config) {
            $scope.teachers = data;
            setTimeout(function () {

                filterMajor($scope.majors[0].id)
            }, 100);
        }).
        error(function (data, status, headers, config) {

        });

    $scope.userAgent = navigator.userAgent;
    //专业列表
    $http.get('/edu/f/edu/teacher/majorList').
        success(function (data, status, headers, config) {
            $scope.majors = data;
            var c = "";
            for (i = 0; i < data.length; i++) {
                c += "<li><a onClick=\"filterMajor('" + data[i].id + "','" + data[i].name + "')\">" + data[i].name + "</a></li>";
                if (i != data.length - 1)c += "<li class='divider'></li>";
            }
            $("#major").html(c);
            $("#majorShow").html(data[0].name);

        }).
        error(function (data, status, headers, config) {
        });

    $scope.back = function () {
        window.history.go(-1);
    };

});

function filterMajor(id, name) {
    //更新列表
    $("[major]").parent().hide();
    $("[major='" + id + "']").parent().show();
    $("#majorShow").html(name);
}

