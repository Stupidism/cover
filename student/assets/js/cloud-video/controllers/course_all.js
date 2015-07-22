angular.module('student').controller('CourseAllCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg, $state) {
  //modal begin
  $scope.page = 1;
  $scope.login().then(function () {
    //angular.copy($scope.currentUser.$related.courses, $scope.courses);
    $scope.courselists=Restangular.all('courses').getList({
    	size:15,
    	page:$scope.page
    }).$object;
    $scope.totalpage = $scope.courselists.$totalpage;
    $scope.courselists.sort(function (a, b) { return b.$id - a.$id; });
    if($scope.courselists.length>0){
      $scope.courselists[0].open=true;
    }
  });

  $scope.oneAtATime=true;
  $scope.openAll=function(){
    $scope.oneAtATime=false;
    $scope.courselists.map(function(course){course.open=true;})
  }
  $scope.prepage = function(){
  	if($scope.page > 1){
  		$scope.page--;
	  	$scope.courselists=Restangular.all('courses').getList({
	    	size:15,
	    	page:$scope.page
	    }).$object;
	}
  }
  $scope.nextpage = function(){
  	$scope.page++; 
  	Restangular.all('courses').getList({
    	size:15,
    	page:$scope.page
    }).then(function(courses){
    	$scope.newcourselists = courses;
	    if($scope.newcourselists.length!=0){
	    	$scope.courselists = $scope.newcourselists;
	    }
	    else{
	    	$scope.page--;
	    }
  	});
  }
  $scope.enrollclass = function (courseid) {
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