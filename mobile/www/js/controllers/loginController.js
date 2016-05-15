angular.module('starter')
  .controller('LoginController', function($scope, $state, Auth) {
    $scope.errors = [];

    $scope.login = function(user) {
      $scope.errors = [];
      Auth.login(user).success(function(result) {
        $state.go('user.messages');
      }).error(function(err) {
        $scope.errors.push(err);
      });
    }
  });