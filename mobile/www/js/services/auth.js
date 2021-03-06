angular.module('starter')
  .factory('Auth', function($http, LocalService, AccessLevels , SERVER_URL ,$auth) {
    return {
      authorize: function(access) {
        if (access === AccessLevels.user) {
          return this.isAuthenticated();
        } else {
          return true;
        }
      },
      isAuthenticated: function() {
        return $auth.isAuthenticated();
      },
      login: function(credentials) {
        var login = $http.post(SERVER_URL+ 'login', credentials);
        login.success(function(result) {
          LocalService.set('satellizer_token', result.token );
          LocalService.set('user', result.user);
        });
        return login;
      },
      logout: function() {
        LocalService.unset('satellizer_token');
      },
      register: function(formData) {
        LocalService.unset('satellizer_token');
        var register = $http.post(SERVER_URL +'register', formData);
        register.success(function(result) {
          LocalService.set('satellizer_token', result.token );
          LocalService.set('user', result.user);
        });
        return register;
      }
    }
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var LocalService = $injector.get('LocalService');

    return {
      request: function(config) {
        var token;
        if (LocalService.get('auth_token')) {
          token = angular.fromJson(LocalService.get('auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('auth_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
