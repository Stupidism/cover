angular.module('student').controller('InformationCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.user = $scope.currentUser;
  $scope.genderEnum={
    1:'男',
    2:'女',
  }
});