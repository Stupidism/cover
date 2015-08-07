angular.module('sbAdminApp')
.controller('teacherManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "教师管理 - 详细管理";
  $scope.login().then(function (){
    $scope.school = $scope.currentUser.$related.school;

    Restangular.all('schools/' + $scope.school.$id.toString() + '/majors').getList().then(function(majors) {
      $scope.majors = majors;
      $scope.major = $scope.majors[0];
      console.log($scope.major);
      $scope.teachers = Restangular.all('majors/' + $scope.major.$id + '/teachers').getList().$object;
    });

    $scope.user = {};

    $scope.updateMajor = function() {
      if ($scope.major) {
        $scope.teachers = Restangular.all('majors/' + $scope.major.$id + '/teachers').getList().$object;
      } else {
        $scope.teachers = Restangular.all('schools/' + $scope.school.$id.toString() + '/teachers').getList().$object;
      }
    };

    $scope.update = function() {
      $scope.user = $scope.selected.value[0];
      console.log($scope.user);
    };

    $scope.submitForm = function(teacher) {
      if (teacher.$id != null) {
        Restangular.one('teachers', teacher.$id).patch(teacher).then(function() {
          alert("修改成功");
        });
      }
    };
    $scope.submitPassword = function (newpassword) {
      if($scope.user.$id){
        $scope.newteacher = {
          $type: "teacher",
          password: newpassword.content
        };
        Restangular.one('teachers', $scope.user.$id).patch($scope.newteacher).then(function() {
          alert("修改成功");
          $state.reload();
        });
      }
    }
    $scope.assign = function() {
      if ($scope.user.$id != null) {
        $modal.open({
          templateUrl: 'views/teacher/teacher_course.html',
          controller: 'teacherCourseCtrl',
          backdrop: 'static',
          keyboard: false,
          resolve: {
            school: function() {
              return $scope.school;
            },
            teacher: function() {
              return $scope.user;
            },
            currentUser: function() {
              return $scope.currentUser;
            }
          }
        })
      }
    };

    $scope.teacherremove = function() {
      if ($scope.user.$id != null) {
        var id = $scope.user.$id;
        var path = 'teachers/' + id;
        Restangular.one(path).remove().then(function() {
          alert("删除成功");
          $state.reload();
        });
      }
    };
  })
});
