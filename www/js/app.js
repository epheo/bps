// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'bps.controllers', 'bps.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.record', {
    url: '/record',
    views: {
      'menuContent': {
        templateUrl: 'templates/record.html',
        controller: 'RecordCtrl'
      }
    }
  })

  .state('app.statistics', {
    url: '/statistics',
    views: {
      'menuContent': {
        templateUrl: 'templates/statistics.html'
      }
    }
  })
    .state('app.analyse', {
      url: '/activities',
      views: {
        'menuContent': {
          templateUrl: 'templates/analyse.html',
          controller: 'AnalyseCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/activities/:activityId',
    views: {
      'menuContent': {
        templateUrl: 'templates/activity.html',
        controller: 'ActivityCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/activities');
});
