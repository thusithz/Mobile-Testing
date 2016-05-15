
angular.module('starter')

  .controller('RegisterController', function($scope, $state, Auth) {
    $scope.register = function(user) {
      Auth.register(user).then(function() {
        $state.go('anon.home');
      });
    }
  });