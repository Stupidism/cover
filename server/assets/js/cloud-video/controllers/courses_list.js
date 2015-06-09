angular.module('cover').controller('CoursesListCtrl', function ($scope, $http) {
  $scope.courses = [{
    name: 'CAID-2D',
    teacher: '王华杰',
    time: '2015-2-10~2015-6-20',
    student_number: 25,
    textbook: '《产品设计效果图》'
  }, {
    name: 'CAID-2D',
    teacher: '王华杰',
    time: '2015-2-10~2015-6-20',
    student_number: 25,
    textbook: '《产品设计效果图》'
  }];
});

