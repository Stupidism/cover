angular.module('cover').controller('QuestionsListCtrl', function ($scope, $http, $modal, Restangular, $q, JsonApiOrg) {
  $scope.fetchCourse.then(function () {
    Restangular.one('courses', $scope.course.id).all('questions').getList()
      .then(function (questions) {
        $scope.questions = questions;
      });
    });
  $scope.question = [];
  $scope.newQuestion = function (course,$event,create) {
    $event.stopPropagation();
    question = {
      $type: 'question',
      $relationships: {
        course: {data: $scope.course.$asLink()},
        user : {data: $scope.currentUser.$asLink()}
      },
    };
    question.viewCount = 0;
    
    $modal.open({
      animation:true,
      size:'lg',
      backdrop: create ? true : false,
      templateUrl: 'assets/partials/question_new.html',
      controller: 'QuestionNewCtrl',
      resolve: {
        question: function () {
          return question;
        },
        create: function(){
          return create;
        },
      },
    });
  };
});
