angular.module('student').controller('AssignmentDetailsCtrl', function ($scope, Restangular, $stateParams,$modal) {
  Restangular.one('assignments', $stateParams['assign']).all('homeworks').getList()
    .then(function (homeworks) {
      $scope.homeworks = homeworks;
      console.log($scope.homeworks);
    });
    $scope.Scoreadd = function (homework,create) {
    	$scope.homeworkid = homework.$id;
	    $modal.open({
	      animation:true,
	      size:'lg',
	      backdrop: create ? true : false,
	      templateUrl: 'assets/partials/score_add.html',
	      controller: 'ScoreAddCtrl',
	      resolve: {
	        homework: function () {
	          return homework;
	        },
	        create: function(){
	          return create;
	        },
	      },
	    })
	};
})
