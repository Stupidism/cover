angular.module('cover').controller('CourseOutlineCtrl', function ($scope, $state) {
  $scope.fetchCourse.then(function (course) {
    $scope.course = course;
    $scope.editCourseOutline = course.$related.courseoutline;
  });

  $scope.submit = function (course) {
  };  
});
