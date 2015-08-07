angular.module('superAdminApp')
.controller('majorManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "专业管理 - 详细管理";
  $scope.login().then(function (){
    Restangular.all('schools').getList().then(function(schools) {
      $scope.schools = schools;
      $scope.school = $scope.schools[0];
      Restangular.all('schools/' + $scope.school.$id.toString() + '/majors').getList().then(function(majors) {
        $scope.majors = majors;
      });
    });
    $scope.major = {};

    $scope.update = function() {
      $scope.major = $scope.selected.value[0];
    };
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
    $scope.submitForm = function (major) {
      if(major.$id != null){
        Restangular.one('majors', major.$id).patch(major).then(function() {
          alert("修改成功");
        });
      }
    };

    $scope.majorremove = function() {
    if($scope.major.$id != null){
        var id = $scope.major.$id;
        var path = 'majors/'+id;
        Restangular.one(path).remove().then(function(){
          alert("删除成功");
          $state.reload();
        });
      }
    };
  })
});
