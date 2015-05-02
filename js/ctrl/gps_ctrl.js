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
    $routeProvider.when('/', {templateUrl: 'gps.html', controller: 'gpsController', reloadOnSearch: false});
    $routeProvider.when('/login', {templateUrl: 'login.html', controller: 'loginController', reloadOnSearch: false});
});

app.controller('gpsController', function ($rootScope, $scope, $http,$location) {

    //定位当前位置
    Cookies.json = true;
    if (Cookies.get("login") == true) {//进行报名操作
        $scope.user = Cookies.get("user");

        $http.get('/edu/f/edu/gps?uid='+$scope.user.id).
            success(function (data, status, headers, config) {
                $scope.gpses = data;

            }).
            error(function (data, status, headers, config) {

            });
    }else{
        $location.path("/login")
    }

    $scope.back = function () {
        window.history.go(-1);
    };

    //定位
    $http.get('/edu/f/edu/gps/locate?uid='+$scope.user.id).
        success(function (data, status, headers, config) {
            $scope.gpsNow = data;
        }).
        error(function (data, status, headers, config) {
        });


    $scope.relocateGps = function(){
        $("#relocateContainer").html('定位中...');
        var url = '/edu/f/edu/gps/locate?uid='+$scope.user.id;

        $http.get(url).
            success(function (data, status, headers, config) {
                $scope.gpsNow = data;
                $("#relocateContainer").html('重新定位');
                alert('定位成功');
            }).
            error(function (data, status, headers, config) {
                $("#relocateContainer").html('重新定位');
                alert('定位失败');
            });
    };

});

app.controller('loginController', function ($rootScope, $scope, $http) {
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
                    //$cookieStore.put("login",true);
                    //$cookieStore.put("user",$scope.login_rs.euser);
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
});