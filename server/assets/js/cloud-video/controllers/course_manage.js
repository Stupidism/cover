angular.module('cover').controller('CourseManageCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.fetchCourse = Restangular.one('courses', $stateParams.course).get();
  $scope.fetchCourse.then(function (course) {
    $scope.course = course;
    console.log(course);
  });
});
