angular.module('cover').controller('AssignmentDetailsCtrl', function ($scope, $modal,Restangular, $stateParams) {
  Restangular.one('assignments', $stateParams['assign']).all('homeworks').getList()
    .then(function (homeworks) {
      $scope.homeworks = homeworks;
      console.log($scope.homeworks);
    });
    $scope.Scoreadd = function (homework,$event,create) {
	    $event.stopPropagation();
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
	    }).result.then(function (editHomework) {
	      $scope.homeworks.forEach(function (homework) {
	        if (homework.$id === editHomework.$id) {
	          angular.copy(editHomework, homework);
	        }
	      });
	    });
	};
})
