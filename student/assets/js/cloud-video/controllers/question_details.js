angular.module('student').controller('QuestionDetailsCtrl', function ($scope, $sce, Restangular, $stateParams,$state) {
  Restangular.one('questions', $stateParams['question']).all('answers').getList()
    .then(function (answers) {
      $scope.answers = answers;
    });
  $scope.question = Restangular.one('questions', $stateParams.question).get().$object;
  $scope.submit = function (newanswer) {
    $scope.newanswer = {
    	$type: 'answer',
    	content: $scope.value,
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

  $scope.answerEnum = {
    false: "否",
    true: "是"
  }

  $scope.quote = function (answercontent) {
    var scope = angular.element("#t1").scope();
    console.log(scope);
    if (scope.value)
      scope.value = "<blockquote>"+answercontent+"</blockquote>"+scope.value
    else
      scope.value = "<blockquote>"+answercontent+"</blockquote>";
  }

  $scope.renderHtml = function(html_code)
  {
    return $sce.trustAsHtml(html_code);
  };
})
