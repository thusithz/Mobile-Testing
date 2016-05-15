// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
   [
    'ionic',
    'ui.bootstrap',
    'ui.router',
    'ionic-material',
    'ionMdInput',
    'satellizer',
    'ionic-toast',
     'ui.mask'
    ])
.run(function($ionicPlatform,$rootScope, $state, Auth ,$auth) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        event.preventDefault();
        $state.go('anon.login');
      }

    });
})
.config(function($stateProvider, $urlRouterProvider, AccessLevels) {

  $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginController'
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'templates/auth/register.html',
        controller: 'RegisterController'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.profile', {
        url: '/profile',
        templateUrl: 'templates/user/profile.html',
        controller: 'ProfileController'
      })
      .state('user.users', {
        url: '/users',
        templateUrl: 'templates/user/users.html',
        controller: 'UsersController'
      });

    $urlRouterProvider.otherwise('/');

});


