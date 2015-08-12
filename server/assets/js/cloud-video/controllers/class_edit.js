angular.module('cover')
.controller('ClazzEditCtrl',
function ($scope, $http, $state, $modalInstance, clazz, $timeout, Restangular) {
  $scope.editclazz=clazz;
  $scope.submit = function (clazz) {
  var path = 'clazzs/'+clazz.$id; 
  Restangular.all(path).patch(clazz).then(function (clazz) {
      $state.go('courseManage.classes', {course: clazz.$relationships.course.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
  };
});