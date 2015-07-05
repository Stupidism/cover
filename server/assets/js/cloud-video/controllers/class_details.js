angular.module('cover').controller('ClassDetailsCtrl', function ($scope, Restangular, $stateParams) {
  Restangular.one('clazzs', $stateParams['class']).all('students').getList()
    .then(function (students) {
      $scope.students = students;
    });
});
