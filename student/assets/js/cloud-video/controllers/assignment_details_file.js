angular.module('student').controller('AssignmentDetailsFileCtrl', function ($scope, Restangular, $stateParams, $state) {
  var homeworkRest = Restangular.one('homeworks', $stateParams.home);
  $scope.homework = homeworkRest.get().$object;
})
