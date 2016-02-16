// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','zhihudailycontroller','dataservice'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
    console.log("config");
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/sidemenu.html',
            controller: 'NavCtrl'
        })
        .state('app.storylist', {
            url: '/storylist',
            views: {
                'menuContent': {
                    templateUrl: 'templates/storylist.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('app.singlestory', {
            url: '/singlestory/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/singlestory.html',
                    controller:'StoryCtrl'
                }
            }
        })
        .state('app.themedetail',{
            url: '/themedetail/:id',
            views:{
                'menuContent':{
                    templateUrl: 'templates/themedetail.html',
                    controller: 'ThemeCtrl'
                }
            }
        });
        
        
       $urlRouterProvider.otherwise('/app/storylist');
})
