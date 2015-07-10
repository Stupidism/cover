angular.module('cover').controller('QuestionDetailsCtrl', function ($scope, Restangular, $stateParams) {
  Restangular.one('questions', $stateParams['question']).all('answers').getList()
    .then(function (answers) {
      $scope.answers = answers;
    });
})
