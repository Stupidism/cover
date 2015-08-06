angular.module('superAdminApp')
.controller('schoolAddCtrl',
function ($scope, $http, $state, $timeout, Restangular) {
  $scope.login().then(function (){
  var original;
  return $scope.school = {
      $type: "school",
      name: "",
      code: "",
      money: "",
      credit: "",
      level: "",
      address: "",
      is985:false,
      is211:false
  },
  $scope.showInfoOnSubmit = !1,
  original = angular.copy($scope.school),
  $scope.revert = function() {
      return $scope.school = angular.copy(original),
      $scope.form_signin.$setPristine()
  },
  $scope.canRevert = function() {
      return ! angular.equals($scope.school, original) || !$scope.form_signin.$pristine
  },
  $scope.canSubmit = function() {
      return $scope.form_signin.$valid && !angular.equals($scope.school, original)
  },
  $scope.submitForm = function() {
    if($scope.school.is985 == '是')
      $scope.school.is985 = true;
    else
      $scope.school.is985 = false;
    if($scope.school.is211 == '是')
      $scope.school.is211 = true;
    else
      $scope.school.is211 = false;
    Restangular.all('schools').post($scope.school).then(function (question) {
          alert("新增学校成功");
          return $scope.showInfoOnSubmit = !0,
          $scope.revert();
        });
    };
  });
});
