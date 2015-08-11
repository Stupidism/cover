angular.module('student').controller('CourseAllCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg, $state,$modal) {
  //modal begin
  $scope.page = 1;
  $scope.courses = [];
  $scope.tableConfig = {
    itemsPerPage: 10,
  }
  //
  function StringToDate(){
    var i = 0;
    while (i < $scope.courses.length) {
      $scope.courses[i].startTime = new Date($scope.courses[i].startTime);
      $scope.courses[i].endTime = new Date($scope.courses[i].endTime);
      $scope.courses[i].enrollStarttime = new Date($scope.courses[i].enrollStarttime);
      $scope.courses[i].enrollEndtime = new Date($scope.courses[i].enrollEndtime);
      i = i + 1;
    }
    i = 0;
  }

  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  slides.push({image:'assets/images/kittys/1.jpg',text:'nihao'});
  slides.push({image:'assets/images/kittys/2.jpg',text:'miao'});
  slides.push({image:'assets/images/kittys/970.jpg',text:'miao'});

  $scope.login().then(function () {
    console.log($scope.currentUser);
    $scope.schoolid = $scope.currentUser.$related.school.$id;
    //angular.copy($scope.currentUser.$related.courses, $scope.courses);
    Restangular.all('schools').all($scope.schoolid).all('courses').getList({
    	size:15,
    	page:$scope.page
    }).then(function (courses) {
      $scope.courses = courses;
      $scope.totalpage = $scope.courses.$totalpage;
      $scope.courses.sort(function (a, b) { return b.$id - a.$id; });
    });
  });

  $scope.oneAtATime=true;
  $scope.openAll=function(){
    $scope.oneAtATime=false;
    $scope.courses.map(function(course){course.open=true;})
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