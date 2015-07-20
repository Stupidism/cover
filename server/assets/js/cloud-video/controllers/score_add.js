angular.module('cover').controller('ScoreAddCtrl', function ($scope, $state,homework) {
  /*$scope.fetchhomework.then(function (homework) {
    $scope.editHomework = homework.clone();
  });*/
  $scope.editHomework = homework.clone();
  $scope.submit = function (homework) {
    homework.patch(homework).then(function (c) {
      $state.go('courseManage.assignmentDetails', {assign: homework.$relationship.assignment.data.id}, {reload: true});
    });
	//console.log($scope.editHomework);
  };
});
