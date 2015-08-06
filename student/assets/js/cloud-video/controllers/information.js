angular.module('student').controller('InformationCtrl', function ($scope, $http, $modal, Restangular, $stateParams,$state) {
  $scope.login().then(function () {
    var studentid = $scope.currentUser.$id;
     Restangular.one('students',studentid).get().then(function(user){
        $scope.editUser = user;
     });
  });
  $scope.genderEnum={
    1:'男',
    2:'女',
  }
  $scope.submit = function (user) {
    user.patch(user).then(function (newuser) {
      $state.reload();
    });
  };
});