angular.module('cover').controller('CoursesListCtrl', function ($scope, $http, $modal) {

  $scope.courses = [{
    "id": 1,
    "version": null,
    "isDeleted": false,
    "createTime": "2015-06-15 14:50:59",
    "code": "0",
    "name": "CAID-2D",
    "description": "课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程",
    "type": "1",
    "startTime": 1434351084000,
    "endTime": 1434783076000,
    "assignmentRatio": 0,
    "testRatio": 0,
    "examRatio": 0,
  },{
    "id": 2,
    "version": null,
    "isDeleted": false,
    "createTime": "2015-06-15 14:50:59",
    "code": "0",
    "name": "CAID-3D建模",
    "description": "课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程",
    "type": "3",
    "startTime": 1434351084000,
    "endTime": 1434783076000,
    "assignmentRatio": 0,
    "testRatio": 0,
    "examRatio": 0,
  }];
  if($scope.courses.length>0){
    $scope.courses[0].open=true;
  }

  $scope.oneAtATime=true;
  $scope.openAll=function(){
    console.info("openALl");
    $scope.oneAtATime=false;
    $scope.courses.map(function(course){course.open=true;})
  }

  $scope.editCourse = function (course,$event,create) {
    $event.stopPropagation();
    var create=create||false;
    if(create){
      courese={
        id:$scope.maxId
      };
    }
    $modal.open({
      animation:true,
      size:'lg',
      backdrop :create?true:false,
      templateUrl: 'assets/partials/course_edit.html',
      controller: 'CourseEditCtrl',
      resolve: {
        oldCourse: function () {
          return course;
        },
        create: function(){
          return create;
        },
      },
    }).result.then(function (res) {
      console.info(res.done);
      if(res.done==='created'){
        $scope.maxId++;
        $scope.courses.push(course);
      }else if(!create&&res.done==='dismissed'){
        for (var i = 0; i < $scope.courses.length; i++) {
          if ($scope.courses[i].id === res.course.id){
            $scope.courses[i]=res.course;
            return;
          }
        }
      }
    });
  };


  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});
