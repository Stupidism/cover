angular.module('cover').controller('AssignmentListCtrl', function ($scope, $http, $modal, Restangular, $q, JsonApiOrg) {
  $scope.fetchCourse.then(function () {
	  Restangular.one('courses', $scope.course.id).all('assignments').getList()
	    .then(function (assignments) {
	      $scope.assignments = assignments;
	      $scope.assignments.forEach(function(assignment) {
      		$scope.deadlines = assignment.$related.deadlines;
      		var endtime = '0';
      		if($scope.deadlines != null){
	      		for(var i = 0; i < $scope.deadlines.length;i++){
	      			if($scope.deadlines[i].time != null){
		      			if($scope.deadlines[i].time > endtime)
		      				endtime = $scope.deadlines[i].time;
		      		}
	      		}
	      		if(endtime != '0'){
	      			assignment.endTime = endtime;
	      		}
	      		else{
	      			assignment.endTime = "新增";
	      		}
	      	}
	      	else{
	      		assignment.endTime = "新增";
	      	}
    	  });
	    });
  });
  $scope.Deadlineadd = function (assignment,create) {
	$scope.assignid = assignment.$id;
    $modal.open({
      animation:true,
      size:'lg',
      backdrop: create ? true : false,
      templateUrl: 'assets/partials/deadline_add.html',
      controller: 'DeadlineAddCtrl',
      resolve: {
        assignment: function () {
          return assignment;
        },
        create: function(){
          return create;
        },
      },
    })
  };
});
