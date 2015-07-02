angular.module('cover').controller('CoursesListCtrl', function ($scope, $http, $modal, Restangular) {
  $scope.courses = Restangular.all('courses').getList().$object;

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
    course = course ? angular.copy(course) : {};
    create = !!create;
    $modal.open({
      animation:true,
      size:'lg',
      backdrop: create ? true : false,
      templateUrl: 'assets/partials/course_edit.html',
      controller: 'CourseEditCtrl',
      resolve: {
        course: function () {
          return course;
        },
        create: function(){
          return create;
        },
      },
    }).result.then(function (editedCourse) {
      if (create) {
        $scope.courses.push(course);
      } else {
        $scope.courses.forEach(function (course) {
          if (course.id === editedCourse.id) {
            angular.copy(editedCourse, course);
          }
        });
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
