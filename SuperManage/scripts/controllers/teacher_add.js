angular.module('superAdminApp')
.controller('teacherAddCtrl',
function ($scope, $http, $state, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "教师管理 - 添加教师";
  $scope.login().then(function (){
  $scope.schools = Restangular.all('schools').getList().$object;
  $scope.majors = Restangular.all('majors').getList().$object;
  var original;
  return $scope.user = {
      $type: "teacher",
      $relationships: {
      },
      username: "",
      password: "",
      email: "",
      code: "",
      truename: "",
      department: "",
      title: "",
      phone: "",
      credit: "",
      level: "",
      address: "",
  },
  $scope.showInfoOnSubmit = !1,
  original = angular.copy($scope.user),
  $scope.revert = function() {
      return $scope.user = angular.copy(original),
      $scope.form_signin.$setPristine()
  },
  $scope.canRevert = function() {
      return ! angular.equals($scope.user, original) || !$scope.form_signin.$pristine
  },
  $scope.canSubmit = function() {
      return $scope.form_signin.$valid && !angular.equals($scope.user, original)
  },
  $scope.updateSchool = function() {
    if ($scope.school) {
      Restangular.all('schools/' + $scope.school.$id + '/majors').getList().then(function(majors){
        $scope.majors = majors;
      });
    } else {
      Restangular.all('majors').getList().then(function(majors){
        $scope.majors = majors;
      });
    }
  },
  $scope.submitForm = function() {
    $scope.user.$relationships.school = {data:$scope.school.$asLink()};
    $scope.user.$relationships.major = {data:$scope.major.$asLink()};
      Restangular.all('teachers').post($scope.user).then(function (teacher) {
          alert("新增老师成功");
          return $scope.showInfoOnSubmit = !0,
          $scope.revert();
        });
  };
});
});
