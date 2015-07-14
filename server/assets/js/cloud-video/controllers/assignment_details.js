angular.module('cover').controller('AssignmentDetailsCtrl', function ($scope, Restangular, $stateParams) {
  Restangular.one('assignments', $stateParams['assign']).all('homeworks').getList()
    .then(function (homeworks) {
      $scope.homeworks = homeworks;
      console.log($scope.homeworks);
    });
})
