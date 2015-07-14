angular.module('cover').controller('CourseOutlineCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.fetchOutline = Restangular.one('courses', $stateParams.course).customGET('courseoutline');

  $scope.fetchOutline.then(function (courseoutline) {
    $scope.editOutline = courseoutline;
    console.log($scope.editOutline);
  });

  $scope.submit = function (courseoutline) {
    courseoutline.patch(courseoutline).then(function (c) {
      $state.course.$related.courseoutline.go('courseManage.outline', {reload: true});
    });
  };
});
