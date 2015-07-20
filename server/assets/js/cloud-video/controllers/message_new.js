angular.module('cover')
.controller('MessageNewCtrl',
function ($scope, $http, $state, $modalInstance, message, create, $timeout, Restangular) {
  $scope.message=message;
  $scope.create=create;
  $scope.submit = function (message) {
  console.log($scope.message);
  Restangular.all('messages').post($scope.message).then(function (message) {
      $state.go('courseManage.messages', {course: $scope.message.$relationships.course.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
  };
});
