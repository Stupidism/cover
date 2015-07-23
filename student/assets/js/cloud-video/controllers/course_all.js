angular.module('student').controller('CourseAllCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg, $state,$modal) {
  //modal begin
  $scope.page = 1;
  $scope.login().then(function () {
    //angular.copy($scope.currentUser.$related.courses, $scope.courses);
    Restangular.all('courses').getList({
    	size:15,
    	page:$scope.page
    }).then(function (courses) {
      $scope.courselists = courses;
      $scope.totalpage = $scope.courselists.$totalpage;
      $scope.courselists.sort(function (a, b) { return b.$id - a.$id; });
      if($scope.courselists.length>0){
        $scope.courselists[0].open=true;
      }
    });
  });

  $scope.oneAtATime=true;
  $scope.openAll=function(){
    $scope.oneAtATime=false;
    $scope.courselists.map(function(course){course.open=true;})
  }
  $scope.prepage = function(){
  	if($scope.page > 1){
  		$scope.page--;
      Restangular.all('courses').getList({
        size:15,
        page:$scope.page
      }).then(function (courses) {
        $scope.courselists = courses;
        $scope.courselists.sort(function (a, b) { return b.$id - a.$id; });
        if($scope.courselists.length>0){
          $scope.courselists[0].open=true;
        }
      });
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
        $scope.courselists.sort(function (a, b) { return b.$id - a.$id; });
        if($scope.courselists.length>0){
          $scope.courselists[0].open=true;
        }
	    }
	    else{
	    	$scope.page--;
	    }
  	});
  }
  $scope.enrollclass = function (courseid) {
      Restangular.one('courses', courseid).all('clazzs').getList().then(function(clazz){
        $scope.clazz = clazz;
        $modal.open({
          animation:true,
          size:'lg',
          templateUrl: 'assets/partials/course_enroll.html',
          controller: 'CourseEnrollCtrl',
          resolve: {
            clazz: function () {
              return $scope.clazz;
            },
            user:function(){
              return $scope.currentUser;
            }
          },
        })
      });
  };
})