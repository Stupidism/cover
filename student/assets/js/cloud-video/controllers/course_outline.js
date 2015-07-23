angular.module('student').controller('CourseOutlineCtrl', function ($scope, Restangular, $state, JsonApiOrg) {
  $scope.courseoutline = $scope.course.$related.courseoutline;
});
