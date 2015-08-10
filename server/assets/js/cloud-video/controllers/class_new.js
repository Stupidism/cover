angular.module('cover')
.controller('ClazzNewCtrl',
function ($scope, $http, $state, $modalInstance, clazz, create, $timeout, Restangular) {
  $scope.clazz=clazz;
  $scope.create=create;
  $scope.submit = function (clazz) {
  console.log($scope.clazz);
  Restangular.all('clazzs').post($scope.clazz).then(function (clazz) {
      $state.go('courseManage.classes', {course: $scope.clazz.$relationships.course.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
  };
});
