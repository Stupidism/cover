angular.module('student').controller('SubjectListCtrl', function ($scope, Restangular, $stateParams, $state) {
  $scope.subjects = [];
  $scope.tableConfig = {
  	itemPerPage: 10,
  };
  $scope.fetchCourse.then(function () {
    Restangular.one('courses', $scope.course.id).all('subjects').getList()
      .then(function (subjects) {
        $scope.subjects = subjects;
      });
  });

});
