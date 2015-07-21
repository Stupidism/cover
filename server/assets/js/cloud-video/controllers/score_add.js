angular.module('cover').controller('ScoreAddCtrl', function ($scope, $state,homework,$modalInstance,Restangular) {
  $scope.homeworkid = homework.$id;
  var homeworkRest = Restangular.one('homeworks', $scope.homeworkid);
  $scope.fetchhomework = homeworkRest.get().$object;
  $scope.editHomework = $scope.fetchhomework;
  $scope.submit = function (homework) {
    homework.patch(homework).then(function (c) {
      $state.go('courseManage.assignmentDetails', {assign: homework.$relationships.assignment.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
	//console.log($scope.editHomework);
  };
});
