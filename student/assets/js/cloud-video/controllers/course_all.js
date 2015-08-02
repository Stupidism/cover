angular.module('student').controller('CourseAllCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg, $state,$modal) {
  //modal begin
  $scope.page = 1;
  //
  function StringToDate(){
    var i = 0;
    while (i < $scope.courselists.length) {
      $scope.courselists[i].startTime = new Date($scope.courselists[i].startTime);
      $scope.courselists[i].endTime = new Date($scope.courselists[i].endTime);
      $scope.courselists[i].enrollStarttime = new Date($scope.courselists[i].enrollStarttime);
      $scope.courselists[i].enrollEndtime = new Date($scope.courselists[i].enrollEndtime);
      i = i + 1;
    }
    i = 0;
  }

  $scope.login().then(function () {
    console.log($scope.currentUser);
    $scope.schoolid = $scope.currentUser.$related.school.$id;
    //angular.copy($scope.currentUser.$related.courses, $scope.courses);
    Restangular.all('schools').all($scope.schoolid).all('courses').getList({
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
  $scope.courseEnum={
    1:'公共基础课',
    2:'专业核心课',
    3:'实训课',
    8:'模板课',
  }
})