angular.module('student').controller('InformationCtrl', function ($scope, $http, $modal, Restangular, $stateParams,$state) {
  $scope.login().then(function () {
  	$scope.editUser = $scope.currentUser.clone();
  });
  $scope.genderEnum={
    1:'男',
    2:'女',
  }
  $scope.submit = function (user) {
    user.patch(user).then(function (newuser) {
    });
  };
});