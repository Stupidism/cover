angular.module('student')
.controller('QuestionNewCtrl',
function ($scope, $http, $state, $modalInstance, question, create, $timeout, Restangular) {
  $scope.question=question;
  $scope.create=create;
  $scope.submit = function (question) {
  console.log($scope.question);
  Restangular.all('questions').post($scope.question).then(function (question) {
      $state.go('courseManage.questions', {course: $scope.question.$relationships.course.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
  };
});
