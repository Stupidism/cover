angular.module('cover').controller('QuestionDetailsCtrl', function ($scope, Restangular, $stateParams,$state) {
  Restangular.one('questions', $stateParams['question']).all('answers').getList()
    .then(function (answers) {
      $scope.answers = answers;
    });
  $scope.question = Restangular.one('questions', $stateParams.question).get().$object;
  $scope.submit = function (newanswer) {
  $scope.newanswer = {
  	  $type: 'answer',
  	  content: newanswer.content,
  	  recommend: false,
      $relationships: {
        question: {data: $scope.question.$asLink()},
        user : {data: $scope.currentUser.$asLink()}
      }
  }

  console.log($scope.newanswer);
  Restangular.all('answers').post($scope.newanswer).then(function (newanswer) {
      $state.go('courseManage.questions', {course: $scope.question.$relationships.course.data.id}, {reload: true});
    });
  };
})
