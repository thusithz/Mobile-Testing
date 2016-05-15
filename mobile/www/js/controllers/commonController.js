
angular.module('starter')
  .controller('CommonController', function($scope, $state, Auth ,$auth) {

    if($auth.getPayload())
      $scope.log=true;
    else
      $scope.log=false;

    $scope.register = function(user) {
      Auth.register(user).then(function() {
        $state.go('user.profile');
      });
    };

    $scope.logout=function(){
      Auth.logout();
      $state.go('anon.login');
    }
  });
