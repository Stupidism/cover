angular.module('cover').controller('AssignmentDetailsCtrl', function ($scope, Restangular, $stateParams) {
  $scope.assignments = Restangular.one('assignments', $stateParams.assign).get().$object;
})
