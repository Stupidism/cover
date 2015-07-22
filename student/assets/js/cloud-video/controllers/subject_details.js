angular.module('student').controller('SubjectDetailsCtrl', function ($scope, Restangular, $stateParams, $state) {
  var subjectRest = Restangular.one('subjects', $stateParams.subject);
  $scope.subject = subjectRest.get().$object;
  $scope.fileUploaded = function (data) {
    subjectRest.all('links').all('resources').post([data.$asLink()]).then(
      function () {
        $state.reload();
      });
  };
})
