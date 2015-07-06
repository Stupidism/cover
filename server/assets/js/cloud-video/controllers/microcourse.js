angular.module('cover').controller('MicroCourseCtrl', function ($scope, Restangular) {
  $scope.fetchCourse.then(function (course) {
    $scope.microcourse = Restangular.one('microcourses', course.$related.microcourse.$id).get().$object;
  })
})
