
angular.module('starter')

  .controller('RegisterController', function($scope, $state, Auth,ionicToast) {
    $scope.register = function(user) {
      Auth.register(user).then(function() {
        ionicToast.show('Congratulation !! ', 'top', false, 2000);
        $state.go('user.profile');
      });
    }
  });
