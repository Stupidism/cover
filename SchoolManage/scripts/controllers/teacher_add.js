angular.module('sbAdminApp')
.controller('teacherAddCtrl',
function ($scope, $http, $state, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "教师管理 - 添加教师";
  $scope.login().then(function (){
  $scope.school = $scope.currentUser.$related.school;
  var original;
  return $scope.user = {
      $type: "teacher",
      $relationships: {
        school: {data:$scope.school.$asLink()},
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
  $scope.user.title = "教授",
  Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().then(function(majors) {
    $scope.majors = majors;
    $scope.major = $scope.majors[0];
  }),
  original = angular.copy($scope.user),
  $scope.revert = function() {
      return $scope.user = angular.copy(original),
      $scope.form_signin.$setPristine()
  },
  $scope.submitForm = function() {
    $scope.user.$relationships.major = {data:$scope.major.$asLink()};
      Restangular.all('teachers').post($scope.user).then(function (teacher) {
          alert("新增老师成功");
          return $scope.showInfoOnSubmit = !0,
          $scope.revert();
        });
  };
});
});
