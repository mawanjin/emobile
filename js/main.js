// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 


var mApp = angular.module('phonecat', [
  'ngRoute',
  'mobile-angular-ui',
  'phonecatControllers',
  'phonecatServices',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

mApp.config(function($routeProvider) {
  $routeProvider.when('/phones',          {templateUrl: 'phone-list.html',controller: 'PhoneListCtrl', reloadOnSearch: false}).
  when('/phones/:phoneId', {templateUrl: 'phone-detail.html',controller: 'PhoneDetailCtrl'}).
  otherwise({redirectTo: '/phones'});
});


var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
   'ngCookies',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures',
  'ngCookies'
]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/home',              {templateUrl: 'home.html', controller:'HomeController', reloadOnSearch: false});
  $routeProvider.when('/personal',              {templateUrl: 'personal.html', controller:'personalController', reloadOnSearch: false});
  $routeProvider.when('/setting',              {templateUrl: 'setting.html', controller:'settingController', reloadOnSearch: false});
});

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem, attrs){
        var dismiss = false;

        $drag.bind(elem, {
          constraint: {
            minX: 0, 
            minY: 0, 
            maxY: 0 
          },
          move: function(c) {
            if( c.left >= c.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(c, undo, reset) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() { 
                scope.$apply(function() {
                  dismissFn(scope);  
                });
              }, 400);
            } else {
              reset();
            }
          }
        });
      };
    }
  };
});


app.controller('HomeController', function($rootScope, $scope,$http,$location,$routeParams,$cookieStore){

  $("#tab_index img").attr('src','imgs/index_selected.png');
  $("#tab_personal img").attr('src','imgs/mine.png');
  $("#tab_setting img").attr('src','imgs/setting.png');

  $("#tab_personal").on('click',function(){
    $("#tab_personal img").attr('src','imgs/mine_selected.png');
    $("#tab_index img").attr('src','imgs/index.png');
    $("#tab_setting img").attr('src','imgs/setting.png');
  });

  $("#tab_setting").on('click',function(){
    $("#tab_setting img").attr('src','imgs/setting_selected.png');
    $("#tab_personal img").attr('src','imgs/mine.png');
    $("#tab_index img").attr('src','imgs/index.png');
  });


  //图片点击效果,及跳转事件
  //个人中心

  $("#home_menu_personal").on('touchstart',function(){
    $("#home_menu_personal").css('background-image','url("imgs/menu_personal_pressed.png")');
  });

  $("#home_menu_personal").on('touchend',function(){
    $("#home_menu_personal").css('background-image','url("imgs/menu_personal.png")');
  });

  $("#home_menu_personal").on('click',function(){
    window.location.href="#/personal";
  });


  //主题活动
  $("#home_menu_activity").on('touchstart',function(){
    $("#home_menu_activity").css('background-image','url("imgs/menu_activity_pressed.png")');
  });

  $("#home_menu_activity").on('touchend',function(){
    $("#home_menu_activity").css('background-image','url("imgs/menu_activity.png")');
  });

  $("#home_menu_activity").on('click',function(){
    window.location.href="activity_main.html";
  });

  //海外之家
  $("#home_menu_aboard").on('touchstart',function(){
    $("#home_menu_aboard").css('background-image','url("imgs/menu_aboard_pressed.png")');
  });

  $("#home_menu_aboard").on('touchend',function(){
    $("#home_menu_aboard").css('background-image','url("imgs/menu_aboard.png")');
  });
  $("#home_menu_aboard").on('click',function(){
    window.location.href="abroad_main.html";
  });
  //名师指导
  $("#home_menu_teacher").on('touchstart',function(){
    $("#home_menu_teacher").css('background-image','url("imgs/menu_teacher_pressed.png")');
  });

  $("#home_menu_teacher").on('touchend',function(){
    $("#home_menu_teacher").css('background-image','url("imgs/menu_teacher.png")');
  });
  $("#home_menu_teacher").on('click',function(){
    window.location.href="teacher_main.html";
  });

  //重要提示
  $("#home_menu_emergency").on('touchstart',function(){
    $("#home_menu_emergency").css('background-image','url("imgs/menu_emergency_pressed.png")');
  });

  $("#home_menu_emergency").on('touchend',function(){
    $("#home_menu_emergency").css('background-image','url("imgs/menu_emergency.png")');
  });
  $("#home_menu_emergency").on('click',function(){
    window.location.href="emergency_main.html";
  });
  //名校推荐
  $("#home_menu_school").on('touchstart',function(){
    $("#home_menu_school").css('background-image','url("imgs/menu_school_pressed.png")');
  });

  $("#home_menu_school").on('touchend',function(){
    $("#home_menu_school").css('background-image','url("imgs/menu_school.png")');
  });
  $("#home_menu_school").on('click',function(){
    window.location.href="country_main.html";
  });
  //生活便利
  $("#home_menu_convenience").on('touchstart',function(){
    $("#home_menu_convenience").css('background-image','url("imgs/menu_convenience_pressed.png")');
  });

  $("#home_menu_convenience").on('touchend',function(){
    $("#home_menu_convenience").css('background-image','url("imgs/menu_convenience.png")');
  });
  $("#home_menu_convenience").on('click',function(){
    window.location.href="convenience_main.html";
  });

  //gps
  $("#home_menu_gps").on('touchstart',function(){
    $("#home_menu_gps").css('background-image','url("imgs/menu_gps_pressed.png")');
  });

  $("#home_menu_gps").on('touchend',function(){
    $("#home_menu_gps").css('background-image','url("imgs/menu_gps.png")');
  });

  $("#home_menu_gps").on('click',function(){
    window.location.href="gps_main.html";
  });

  //联系我们
  $("#home_menu_contact").on('touchstart',function(){
    $("#home_menu_contact").css('background-image','url("imgs/menu_contact_us_pressed.png")');
  });

  $("#home_menu_contact").on('touchend',function(){
    $("#home_menu_contact").css('background-image','url("imgs/menu_contact_us.png")');
  });

  $("#home_menu_contact").on('click',function(){
    window.location.href="suggestion_main.html";
  });

});

app.controller('personalController', function($rootScope, $scope){

  $("#tab_personal img").attr('src','imgs/mine_selected.png');
  $("#tab_index img").attr('src','imgs/index.png');
  $("#tab_setting img").attr('src','imgs/setting.png');

  //图片点击效果,及跳转事件
  //就读学校
  $("#home_menu_schoolNews").on('touchstart',function(){
    $("#home_menu_schoolNews").css('background-image','url("imgs/myschool_pressed.png")');
  });

  $("#home_menu_schoolNews").on('touchend',function(){
    $("#home_menu_schoolNews").css('background-image','url("imgs/myschool.png")');
  });

  $("#home_menu_schoolNews").on('click',function(){
    window.location.href="schoolNews_main.html";
  });

  //监护人
  $("#home_menu_guardian").on('touchstart',function(){
    $("#home_menu_guardian").css('background-image','url("imgs/guardian_pressed.png")');
  });

  $("#home_menu_guardian").on('touchend',function(){
    $("#home_menu_guardian").css('background-image','url("imgs/guardian.png")');
  });

  $("#home_menu_guardian").on('click',function(){
    window.location.href="guardian_main.html";
  });

  //日常报告
  $("#home_menu_report").on('touchstart',function(){
    $("#home_menu_report").css('background-image','url("imgs/report_pressed.png")');
  });

  $("#home_menu_report").on('touchend',function(){
    $("#home_menu_report").css('background-image','url("imgs/report.png")');
  });

  $("#home_menu_report").on('click',function(){
    window.location.href="report_main.html";
  });

  //私人定制
  $("#home_menu_customization").on('touchstart',function(){
    $("#home_menu_customization").css('background-image','url("imgs/customization_pressed.png")');
  });

  $("#home_menu_customization").on('touchend',function(){
    $("#home_menu_customization").css('background-image','url("imgs/customization.png")');
  });

  $("#home_menu_customization").on('click',function(){
    window.location.href="customization_main.html";
  });

  //知心姐姐
  $("#home_menu_sister").on('touchstart',function(){
    $("#home_menu_sister").css('background-image','url("imgs/sister_pressed.png")');
  });

  $("#home_menu_sister").on('touchend',function(){
    $("#home_menu_sister").css('background-image','url("imgs/sister.png")');
  });

  $("#home_menu_sister").on('click',function(){
    window.location.href="sister_main.html";
  });

  //咨询回复
  $("#home_menu_reply").on('touchstart',function(){
    $("#home_menu_reply").css('background-image','url("imgs/reply_pressed.png")');
  });

  $("#home_menu_reply").on('touchend',function(){
    $("#home_menu_reply").css('background-image','url("imgs/reply.png")');
  });

  $("#home_menu_reply").on('click',function(){
    window.location.href="sister_main.html";
  });

});


app.controller('settingController', function($rootScope, $scope,$cookieStore,$location){

  $("#tab_personal img").attr('src','imgs/mine.png');
  $("#tab_index img").attr('src','imgs/index.png');
  $("#tab_setting img").attr('src','imgs/setting_selected.png');

  //图片点击效果,及跳转事件
  //个人中心

  $("#home_menu_personal").on('mousedown',function(){
    $("#home_menu_personal img").attr('src','imgs/menu_personal_pressed.png');

  });

  $("#home_menu_first").on('mouseup',function(){
    $("#home_menu_first").attr('src','imgs/menu_personal.png');
  });
  //主题活动
  $("#home_menu_activity").on('mousedown',function(){
    $("#home_menu_activity").attr('src','imgs/menu_activity_pressed.png');
  });

  $("#home_menu_activity").on('mouseup',function(){
    $("#home_menu_activity").attr('src','imgs/menu_activity.png');
  });
  //海外之家
  $("#home_menu_aboard").on('mousedown',function(){
    $("#home_menu_aboard").attr('src','imgs/menu_aboard_pressed.png');
  });

  $("#home_menu_aboard").on('mouseup',function(){
    $("#home_menu_aboard").attr('src','imgs/menu_aboard.png');
  });
  //名题指导
  $("#home_menu_teacher").on('mousedown',function(){
    $("#home_menu_teacher").attr('src','imgs/menu_teacher_pressed.png');
  });

  $("#home_menu_teacher").on('mouseup',function(){
    $("#home_menu_teacher").attr('src','imgs/menu_teacher.png');
  });
  //重要提示
  $("#home_menu_emergency").on('mousedown',function(){
    $("#home_menu_emergency").attr('src','imgs/menu_emergency_pressed.png');
  });

  $("#home_menu_emergency").on('mouseup',function(){
    $("#home_menu_emergency").attr('src','imgs/menu_emergency.png');
  });
  //名校推荐
  $("#home_menu_school").on('mousedown',function(){
    $("#home_menu_school").attr('src','imgs/menu_school_pressed.png');
  });

  $("#home_menu_school").on('mouseup',function(){
    $("#home_menu_school").attr('src','imgs/menu_school.png');
  });
  //生活便利
  $("#home_menu_convenience").on('mousedown',function(){
    $("#home_menu_convenience").attr('src','imgs/menu_convenience_pressed.png');
  });

  $("#home_menu_convenience").on('mouseup',function(){
    $("#home_menu_convenience").attr('src','imgs/menu_convenience.png');
  });
  //gps
  $("#home_menu_gps").on('mousedown',function(){
    $("#home_menu_gps").attr('src','imgs/menu_gps_pressed.png');
  });

  $("#home_menu_gps").on('mouseup',function(){
    $("#home_menu_gps").attr('src','imgs/menu_gps.png');
  });
  //联系我们
  $("#home_menu_contact").on('mousedown',function(){
    $("#home_menu_contact").attr('src','imgs/menu_contact_us_pressed.png');
  });

  $("#home_menu_contact").on('mouseup',function(){
    $("#home_menu_contact").attr('src','imgs/menu_contact_us.png');
  });


  $scope.logout = function(){
    Cookies.remove('login',{ path: '/' });
    $location.path("/home");
  };


});

app.controller('ActivityController', function($rootScope, $scope,$http){
  $scope.userAgent = navigator.userAgent;
var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

	$http.get('json/activity.json').
	  success(function(data, status, headers, config) {
    	// this callback will be called asynchronously
	    // when the response is available

	    $scope.activitys = data;
	    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	
  });
});

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope,$http){

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  // 
  // 'Scroll' screen
  // 
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  }

  // 
  // Right Sidebar
  // 
  $scope.chatUsers = [
    { name: 'Carlos  Flowers', online: true },
    { name: 'Byron Taylor', online: true },
    { name: 'Jana  Terry', online: true },
    { name: 'Darryl  Stone', online: true },
    { name: 'Fannie  Carlson', online: true },
    { name: 'Holly Nguyen', online: true },
    { name: 'Bill  Chavez', online: true },
    { name: 'Veronica  Maxwell', online: true },
    { name: 'Jessica Webster', online: true },
    { name: 'Jackie  Barton', online: true },
    { name: 'Crystal Drake', online: false },
    { name: 'Milton  Dean', online: false },
    { name: 'Joann Johnston', online: false },
    { name: 'Cora  Vaughn', online: false },
    { name: 'Nina  Briggs', online: false },
    { name: 'Casey Turner', online: false },
    { name: 'Jimmie  Wilson', online: false },
    { name: 'Nathaniel Steele', online: false },
    { name: 'Aubrey  Cole', online: false },
    { name: 'Donnie  Summers', online: false },
    { name: 'Kate  Myers', online: false },
    { name: 'Priscilla Hawkins', online: false },
    { name: 'Joe Barker', online: false },
    { name: 'Lee Norman', online: false },
    { name: 'Ebony Rice', online: false }
  ];

  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;
  $scope.email = 'me@example.com';
  
  $scope.login = function() {
    alert('You submitted the login form');
  };

  // 
  // 'Drag' screen
  // 
  $scope.notices = [];
  
  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };
});