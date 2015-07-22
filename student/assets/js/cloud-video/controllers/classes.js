angular.module('student').controller('ClassesCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.fetchCourse.then(function (course) {
    $scope.classes = course.$related.clazzs;
  });
});
