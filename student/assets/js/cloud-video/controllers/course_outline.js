angular.module('student').controller('CourseOutlineCtrl', function ($scope, Restangular, $state, JsonApiOrg) {
  $scope.fetchCourse.then(function (course) {
    if (! course.$related.courseoutline) {
      $scope.newOutline = {
        $type: "courseoutline",
        belongSubject: null,
        courseDescription: course.description,
        description: "222",
        termSchedule: null,
        courseTime: null,
        weekSchedule: null,
        hour: null,
        credit: 0,
        courseType: 1,
        courseAim: null,
        courseFangzhen: null,
        courseJihua: null,
        $relationships:{
          course: {data: course.$asLink()}
        }
      }
      Restangular.all("courseoutlines").post($scope.newOutline).then(function () {
        console.log($scope.newOutline);
        location.reload();
      });
  }

  
  $scope.outlineId = course.$related.courseoutline.$id;

  $scope.fetchOutline = Restangular.one('courseoutlines', $scope.outlineId).get();
  $scope.fetchOutline.then(function (courseoutline) {
    $scope.editOutline = courseoutline;
    });
});  

  $scope.submit = function (courseoutline) {
    courseoutline.patch(courseoutline).then(function (c) {
      $state.go('courseManage.outline', {reload: true});
    });
  };
});
