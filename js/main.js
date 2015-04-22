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
  
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', controller:'HomeController', reloadOnSearch: false});
  $routeProvider.when('/personal',              {templateUrl: 'personal.html', controller:'personalController', reloadOnSearch: false});
  $routeProvider.when('/setting',              {templateUrl: 'setting.html', controller:'personalController', reloadOnSearch: false});
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


app.controller('HomeController', function($rootScope, $scope,$location){

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

  $('#owl-demo').owlCarousel({
    items: 1,
    autoPlay: true
  });

  //图片点击效果,及跳转事件
  //个人中心

  $("#home_menu_first").on('mousedown',function(){
    $("#home_menu_first").attr('src','imgs/menu_personal_pressed.png');
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





});

app.controller('personalController', function($rootScope, $scope){
  $('#owl-demo').owlCarousel({
    items: 1,
    autoPlay: true
  });

  //图片点击效果,及跳转事件
  //个人中心

  $("#home_menu_first").on('mousedown',function(){
    $("#home_menu_first").attr('src','imgs/menu_personal_pressed.png');
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