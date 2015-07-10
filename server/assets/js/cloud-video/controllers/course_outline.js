angular.module('cover').controller('CourseOutlineCtrl', function ($scope, $state) {
  $scope.fetchCourse.then(function (course) {
    $scope.editCourse = course.clone();
  });

});
