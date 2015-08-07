angular.module('sbAdminApp')
.controller('majorManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "专业管理 - 详细管理";
  $scope.login().then(function (){
    $scope.school = $scope.currentUser.$related.school;
    $scope.majors = Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().$object;
    $scope.major = {};

    $scope.update = function() {
      $scope.major = $scope.selected.value[0];
    };

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
