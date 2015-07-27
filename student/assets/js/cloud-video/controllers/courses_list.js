angular.module('student').controller('CoursesListCtrl', function ($scope, $http, $modal, Restangular, $q, JsonApiOrg,$state) {
  //$scope.courses = [];
  $scope.login().then(function () {
    var id = $scope.currentUser.$id;
    Restangular.one('students', id).all('courses').getList()
    .then(function (courses) {
      $scope.courses = courses;
      $scope.courses.sort(function (a, b) { return b.$id - a.$id; });
      if($scope.courses.length>0){
        $scope.courses[0].open=true;
      }
    });
  });
  $scope.oneAtATime=true;
  $scope.openAll=function(){
    $scope.oneAtATime=false;
    $scope.courses.map(function(course){course.open=true;})
  }



  $scope.quitCourse = function (course) {
    var courseid = course.$id;
    var studentid = $scope.currentUser.$id;
    console.log($scope.currentUser.$token);
    var req = {
    method: 'DELETE',
    url: '/api/students/'+studentid+'/links/courses',
    headers: {
     'Access-Token': $scope.currentUser.$token,
    },
    data: {         
        "data":[
          {
            type:"course",
            id: courseid
          }
        ] 
      }
    }
    $http(req)
      .then(function () {
          $state.reload();
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
  $scope.courseEnum={
    1:'公共基础课',
    2:'专业核心课',
    3:'实训课',
    8:'模板课',
  }
});
