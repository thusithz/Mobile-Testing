angular.module('starter')
  .controller('LoginController', function($scope,$state, Auth,ionicToast) {
    $scope.errors = [];

    $scope.login = function(user) {

      Auth.login(user).success(function(){
        ionicToast.show('Successfully login', 'top', false, 2000);
        $state.go('user.profile');
      }).error(function(err) {
        ionicToast.show(err.userMessage, 'top', false, 2000);
      });
    }
  });
