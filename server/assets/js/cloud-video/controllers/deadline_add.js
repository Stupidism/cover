  angular.module('cover').controller('DeadlineAddCtrl',
function ($scope, $state,assignment,$modalInstance,Restangular) {
  //datepicker begin
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function($event,options) {
    $event.preventDefault();
    $event.stopPropagation();

    options.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd hh:mm:ss', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.$dismiss = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.deadline = {
    $type: 'deadline',
  };
  $scope.submit = function (deadline) {
    var id = assignment.$id;
    Restangular.all('assignments').all(id).all('deadlines').post(deadline).then(function (c) {
      $state.reload();
      $modalInstance.dismiss('cancel');
    });
  };
})