angular.module('cover').controller('CoursesCtrl', function ($scope, $q, $state, $http) {
  $scope.state = $state;
  $state.go('courses.list');
});

