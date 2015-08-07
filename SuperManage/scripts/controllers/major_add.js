angular.module('superAdminApp')
.controller('majorAddCtrl',
function ($scope, $http, $state, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "专业管理 - 添加专业";
  $scope.login().then(function (){
    $scope.schools=Restangular.all('schools').getList().$object;
    //$scope.majors = Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().$object;
    var original;
    return $scope.major = {
        $type: "major",
        $relationships: {
        },
        name: "",
        code: "",
        description: ""
    },
    $scope.showInfoOnSubmit = !1,
    original = angular.copy($scope.major),
    $scope.revert = function() {
        return $scope.major = angular.copy(original),
        $scope.form_signin.$setPristine()
    },
    $scope.canRevert = function() {
        return ! angular.equals($scope.major, original) || !$scope.form_signin.$pristine
    },
    $scope.canSubmit = function() {
        return $scope.form_signin.$valid && !angular.equals($scope.major, original)
    },
    $scope.submitForm = function() {
      $scope.major.$relationships.school = {data:$scope.school.$asLink()};
      Restangular.all('majors').post($scope.major).then(function(major) {
        alert("新增专业成功");
        return $scope.showInfoOnSubmit = !0,
          $scope.revert();
      });
    };
  });
});
