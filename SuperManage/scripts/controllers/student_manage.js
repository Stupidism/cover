angular.module('superAdminApp')
.controller('studentManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "学生管理 - 详细管理";
  $scope.login().then(function (){
    Restangular.all('schools').getList().then(function(schools) {
      $scope.schools = schools;
      $scope.school = $scope.schools[0];
      Restangular.all('schools/' + $scope.school.$id.toString() + '/majors').getList().then(function(majors) {
        $scope.majors = majors;
        $scope.major = $scope.majors[0];
        $scope.students = Restangular.all('majors/' + $scope.major.$id + '/students').getList().$object;
      });
    });

    $scope.user = {};

    $scope.updateSchool = function() {
      console.log($scope.school);
      if ($scope.school) {
        Restangular.all('schools/' + $scope.school.$id + '/majors').getList().then(function(majors){
          $scope.majors = majors;
          $scope.major = $scope.majors[0];
          $scope.updateMajor();
        });
      } else {
        Restangular.all('majors').getList().then(function(majors){
          $scope.majors = majors;
          $scope.major = $scope.majors[0];
          $scope.updateMajor();
        });
      }
    };

    $scope.updateMajor = function() {
      if ($scope.major) {
        $scope.students = Restangular.all('majors/' + $scope.major.$id + '/students').getList().$object;
      } else {
        if($scope.school){
          $scope.students = Restangular.all('schools/' + $scope.school.$id.toString() + '/students').getList().$object;
        }
        else{
          $scope.students = [];
        }
      }
    };

    $scope.update = function() {
      $scope.user = $scope.selected.value[0];
      if($scope.user.gender == 1)
        $scope.user.gendername = '男';
      else
        $scope.user.gendername = '女';
      console.log($scope.user);
    };

    $scope.submitForm = function (student) {
      if(student.$id != null){
        if(student.gendername == '男')
          student.gender = 1;
        else
          student.gender = 2;
        Restangular.one('students', student.$id).patch(student).then(function() {
          alert("修改成功");
        });
      }
    };

    $scope.submitPassword = function (newpassword) {
      if($scope.user.$id){
        $scope.newstudent = {
          $type: "student",
          password: newpassword.content
        };
        console.log($scope.newstudent);
        Restangular.one('students', $scope.user.$id).patch($scope.newstudent).then(function() {
          alert("修改成功");
          $state.reload();
        });
      }
    }
    $scope.assign = function() {
      if($scope.user.$id != null){
        $modal.open({
            templateUrl : 'views/student/student_course.html',
            controller: 'studentCourseCtrl',
            backdrop : 'static',
            keyboard : false,
            resolve: {
                      school: function () {
                          return $scope.user.$related.school;
                      },
                      student: function () {
                        return $scope.user;
                      },
                      currentUser: function () {
                        return $scope.currentUser;
                      }
                  }
          })
      }
    };
    $scope.studentremove = function() {
      if($scope.user.$id != null){
        var id = $scope.user.$id;
        var path = 'students/'+id;
        Restangular.one(path).remove().then(function(){
          alert("删除成功");
          $state.reload();
        });
      }
    };
  })
});
