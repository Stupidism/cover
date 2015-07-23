angular.module('cover').controller('AssignmentListCtrl', function ($scope, $http, $modal, Restangular, $q, JsonApiOrg) {
  $scope.fetchCourse.then(function () {
	  Restangular.one('courses', $scope.course.id).all('assignments').getList()
	    .then(function (assignments) {
	      $scope.assignments = assignments;
	    });
  });
});