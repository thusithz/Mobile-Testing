angular.module('starter')
  .controller('ProfileController', function($scope ,ProfileService ,$auth,ionicToast) {

    ProfileService.getUser()
      .success(function (user) {
        $scope.user = user;
      }).error(function (err) {
        ionicToast.show(err.userMessage, 'top', false, 2000);
      });

    $scope.update=function(user) {
      ProfileService.editUser(user)
        .success(function (user) {
          console.log(user);
          $scope.user = user;
          ionicToast.show('Updated', 'top', false, 2000);
        }).error(function (error) {
          ionicToast.show(error.userMessage, 'top', false, 2000);
        });
    }
  });
