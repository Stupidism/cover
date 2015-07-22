angular.module('student').controller('CourseIndexCtrl', function ($scope, $http, $modal, Restangular, $stateParams) {
  $scope.courseEnum={
    1:'公共基础课',
    2:'专业核心课',
    3:'实训课',
    8:'模板课',
  }
});
