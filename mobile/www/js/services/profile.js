
(function() {
  angular.module('starter').service('ProfileService', [ 'SERVER_URL','$http', ProfileService]);

  function ProfileService(SERVER_URL,$http) {
    return {

      getUser: function(){
        return $http.get(SERVER_URL+ 'user');
      },
      editUser: function(user){
        return $http.put(SERVER_URL+ 'user',user);
      }
    };
  }
})();
