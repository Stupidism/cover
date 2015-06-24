angular.module('cover').controller('CoursesCtrl', function ($scope, $q, $state, $http) {
  $scope.state = $state;
  $scope.courseEnum={
    1:'公共基础课',
    2:'专业核心课',
    3:'实训课',
    8:'模板课',
  }
  $state.go('courses.list');
});
