angular.module('sbAdminApp')
.controller('teacherCourseCtrl',
function ($scope, $http, $state, $timeout, $modalInstance, Restangular, school, teacher, currentUser) {
    $scope.closeModal = function() {
      $modalInstance.close();
    };

    $scope.school = school;
    $scope.teacher = teacher;
    $scope.coursesExisted = Restangular.all('teachers/' + $scope.teacher.$id.toString() + '/courses').getList().$object;
    $scope.coursesAll = {}
    if ($scope.teacher.$relationships.major != null){
      var majorid = $scope.teacher.$relationships.major.data.id;
      $scope.coursesAll = Restangular.all('majors/' + majorid + '/courses').getList().$object;
    }
    $scope.updateExisted = function() {
      $scope.courseExisted = $scope.selectedcourseExisted.value[0];
    };

    $scope.delCourse = function() {
      if($scope.courseExisted){
        var reqDEL = {
          method: 'DELETE',
          url: '/api/teachers/' + $scope.teacher.$id.toString() + '/links/courses',
          headers: {
            'Access-Token': currentUser.$token,
          },
          data: {
            "data": [{
              type: "course",
              id: $scope.courseExisted.$id
            }]
          }
        };
        console.log(reqDEL);
        $http(reqDEL)
          .then(function() {
            alert("删除指定课程成功");
            $scope.coursesExisted = Restangular.all('teachers/' + $scope.teacher.$id.toString() + '/courses').getList().$object;
          });
        }
    };

    $scope.updateAll = function() {
      $scope.courseAll = $scope.selectedcourseAll.value[0];
    };

    $scope.addCourse = function() {
      if($scope.courseAll){
        var reqAdd = {
          method: 'POST',
          url: '/api/teachers/' + $scope.teacher.$id.toString() + '/links/courses',
          headers: {
            'Access-Token': currentUser.$token,
          },
          data: {
            "data": [{
              type: "course",
              id: $scope.courseAll.$id
            }]
          }
        };
        console.log(reqAdd);
        $http(reqAdd)
          .then(function() {
            alert("添加指定课程成功");
            $scope.coursesExisted = Restangular.all('teachers/' + $scope.teacher.$id.toString() + '/courses').getList().$object;
          });
      }
    };
});
