angular.module('cover').controller('CourseManageCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.course = Restangular.one('courses', $stateParams.id).get().$object;
});
