angular.module('sbAdminApp')
.controller('studentAddCtrl',
function ($scope, $http, $state, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "学生管理 - 添加学生";
  $scope.login().then(function (){
  $scope.school = $scope.currentUser.$related.school;
  $scope.majors = Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().$object;
  var original;
  return $scope.user = {
      $type: "student",
      $relationships: {
        school: {data:$scope.school.$asLink()},
      },
      username: "",
      password: "",
      email: "",
      code: "",
      gender:"",
      truename: "",
      department: "",
      title: "",
      phone: "",
      credit: "",
      level: "",
      address: "",
      gendername:""
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
  $scope.submitForm = function() {
    $scope.user.$relationships.major = {data:$scope.major.$asLink()};
    if($scope.user.gendername == '男')
      $scope.user.gender = 1;
    else
      $scope.user.gender = 2;
    Restangular.all('students').post($scope.user).then(function (question) {
          alert("新增学生成功");
          return $scope.showInfoOnSubmit = !0,
          $scope.revert();
        });
    };
  });
});
