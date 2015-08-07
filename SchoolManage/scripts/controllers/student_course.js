angular.module('sbAdminApp')
.controller('studentCourseCtrl',
function ($scope, $http, $state, $timeout, $modalInstance, Restangular, school, student, currentUser) {
    $scope.closeModal = function(){
      $modalInstance.close();
    };

    $scope.school = school;
    $scope.student = student;

    // get course begin
    
    $scope.getcourse = function(){
      Restangular.all('students/'+$scope.student.$id.toString()+'/courses').getList().then(function(existcourses){
        $scope.coursesExisted = existcourses;
        console.log($scope.coursesExisted);
        Restangular.all('schools/'+$scope.school.$id+'/courses').getList().then(function(courses){
          $scope.allcourses = courses;
          $scope.coursesAll = [];
          $scope.coursesidAll = [];
          $scope.existidAll = [];
          $scope.coursesExisted.forEach(function(course) {
            $scope.existidAll.push(course.$id);
          });
          $scope.allcourses.forEach(function(course) {
            var flag = false;
            $scope.existidAll.forEach(function(courseid) {
              if(course.$id == courseid){
                flag = true;
              }
            });
            if(flag == false){
              $scope.coursesAll.push(course);
            }
          });
        });
      });
    };
    $scope.getcourse();
    //console.log($scope.majors);
    //console.log($scope.major);
    $scope.clazz = {};
    $scope.updateExisted = function() {
      $scope.courseExisted = $scope.selectedcourseExisted.value[0];
    };

    $scope.delCourse = function () {
      if($scope.courseExisted != null){
        var reqDEL = {
        method: 'DELETE',
        url: '/api/students/'+$scope.student.$id.toString()+'/links/courses',
        headers: {
         'Access-Token': currentUser.$token,
        },
        data: {
            "data":[
              {
                type:"course",
                id: $scope.courseExisted.$id
              }
            ]
          }
        };
        console.log(reqDEL);
        $http(reqDEL)
          .then(function () {
              alert("删除指定课程成功");
              $scope.getcourse();
            });
        }
    };

    $scope.updateAll = function() {
      $scope.courseAll = $scope.selectedcourseAll.value[0];
      if($scope.courseAll != null){
        $scope.clazzs  = $scope.courseAll.$related.clazzs;
      }
    };

    $scope.updateClazz = function() {
      $scope.clazzAll = $scope.selectedclazzAll.value[0];
    };

    $scope.addCourse = function () {
      if($scope.clazzAll != null){
        var reqAdd = {
        method: 'POST',
        url: '/api/students/'+$scope.student.$id.toString()+'/links/clazz',
        headers: {
         'Access-Token': currentUser.$token,
        },
        data: {
            "data":
              {
                type:"clazz",
                id: $scope.clazzAll.$id,
                meta:{password:$scope.clazzAll.enrollPwd}
              }
          }
        };
        console.log(reqAdd);
        $http(reqAdd)
          .then(function () {
              alert("添加指定课程成功");
              $scope.getcourse();
              $scope.clazzs = [];
            });
        }
    };


});
