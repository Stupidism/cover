angular.module('student').controller('AssignmentFileCtrl', function ($scope, Restangular, $stateParams,$state) {
  var assignmentfileRest = Restangular.one('assignments', $stateParams['assign']);
  $scope.assignment = assignmentfileRest.get().$object;
  $scope.fileUploaded = function (data) {
    assignmentfileRest.all('links').all('resources').post([data.$asLink()]).then(
      function () {
        $state.reload();
      });
  };
})
