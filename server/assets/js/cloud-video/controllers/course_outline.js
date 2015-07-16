angular.module('cover').controller('CourseOutlineCtrl', function ($scope, Restangular, $state) {
  $scope.fetchCourse.then(function (course) {
    if (course.$related.courseoutline) {
      $scope.outlineId = course.$related.courseoutline.$id;

      $scope.fetchOutline = Restangular.one('courseoutlines', $scope.outlineId).get();
      $scope.fetchOutline.then(function (courseoutline) {
        $scope.editOutline = courseoutline;
      });
    }
  }); 

  $scope.submit = function (courseoutline) {
    courseoutline.patch(courseoutline).then(function (c) {
      $state.go('courseManage.outline', {reload: true});
    });
  };
});
