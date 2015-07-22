angular.module('student').controller('MicroCourseCtrl', function ($scope, Restangular) {
  $scope.fetchCourse.then(function (course) {
  	if (course.$related.microcourse != null){ 
    	$scope.microcourse = Restangular.one('microcourses', course.$related.microcourse.$id).get().$object;
    }
  })
})
