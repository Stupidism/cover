angular.module('student').controller('CourseOutlineCtrl', function ($scope, Restangular, $state,$stateParams,JsonApiOrg) {
   $scope.fetchCourse = Restangular.one('courses', $stateParams.course).get();
   $scope.fetchCourse.then(function (course) {
     $scope.courseoutline = course.$related.courseoutline;
   });
});
