angular.module('cover').controller('CoursesListCtrl', function ($scope, $http, $modal, Restangular) {
  $scope.courses = Restangular.all('courses').getList().$object;
  Restangular.one('courses', 1).get().then(console.log.bind(console));

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
