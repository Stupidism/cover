angular.module('cover').controller('ProblemDetailsCtrl', function ($scope, Restangular, $stateParams) {
  $scope.problem = Restangular.one('problems', $stateParams.problem).get().$object;
})
