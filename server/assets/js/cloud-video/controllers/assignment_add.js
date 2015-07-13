angular.module('cover').controller('AssignmentAddCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg ) {
  $scope.step=1;
  $scope.assignment={};
  $scope.assignment.code="213123";
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;
  $scope.create=true;
  $scope.choosedAnyTextbook=function(textbooks){
    return 0;
  };
  //datepicker begin

  $scope.clear = function () {
    $scope.dt = null;
  };

  //datepicker begin
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;

  $scope.clear = function () {
    $scope.dt = null;
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
  //datepicker end
  $scope.createAssignment = function() {
    console.log($scope.assignment);

    /*Restangular.all('assignments').post($scope.assignment).then(function (assignment) {
      $state.go('courseManage.assignmentDetails',{assignment:assignment.$id});
    });*/
  };
});