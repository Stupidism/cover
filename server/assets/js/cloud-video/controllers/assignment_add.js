angular.module('cover').controller('AssignmentAddCtrl',
function ($scope,$state,$http,$timeout, Restangular,JsonApiOrg ) {
  $scope.step=1;
  $scope.assignment={};
  //$scope.assignment.code="213123";
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
  $scope.dismiss = function(){
    console.log(123);
    $state.go('courseManage.assignments',{course: $scope.course.$id});
  }
  $scope.createAssignment = function() {
    $scope.newassignment = {
      $type: "assignment",
      code: "213213",
      startTime: $scope.assignment.startTime,
      name: $scope.assignment.name,
      totalScore: $scope.assignment.totalScore,
      description: $scope.assignment.description,
      $relationships: {
        course: {data: $scope.course.$asLink()},
      }
    }
    var deadline = JsonApiOrg.serializeResource({
      $type: 'deadline',
      time: $scope.assignment.deadtime,
      $relationships: {
        assignment: {meta: {ref: 'primary'}}
      }
    });
    $scope.deadline = [];
    $scope.deadline.push(deadline);
    $scope.newassignment.$root = {included: $scope.deadline};
    Restangular.all('assignments').post($scope.newassignment).then(function (assignment) {
      $scope.assignment = assignment;
      console.log($scope.assignment);
    });
  };
  $scope.fileUploaded = function (data) {
    var assignmentRest = Restangular.one('assignments', $scope.assignment.$id);
    //$scope.subject = subjectRest.get().$object;
    assignmentRest.all('links').all('resources').post([data.$asLink()]).then(
      function () {
        $state.go('courseManage.assignments',{course: $scope.assignment.$relationships.course.data.id});
      });
  };
  $scope.$dismiss = function () {
    $state.go('courseManage.assignments',{course: $scope.course.$id},{reload: true});
  };
});