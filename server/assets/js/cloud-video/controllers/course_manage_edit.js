angular.module('cover').controller('CourseManageEditCtrl', function ($scope, $state) {
  $scope.fetchCourse.then(function (course) {
    $scope.editCourse = course.clone();
  });
  $scope.submit = function (course) {
    course.patch(course).then(function (c) {
      $state.go('courseManage.edit', {course: course.$id}, {reload: true});
    });
  };
});
