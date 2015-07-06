angular.module('cover').controller('SubjectDetailsCtrl', function ($scope, Restangular, $stateParams) {
  $scope.subject = Restangular.one('subjects', $stateParams.subject).get().$object;
})
