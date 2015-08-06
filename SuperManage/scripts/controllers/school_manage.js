angular.module('superAdminApp')
.controller('schoolManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular) {
  $scope.login().then(function (){
    $scope.school = {};
    $scope.schools=Restangular.all('schools').getList().$object;

    $scope.update = function() {
      $scope.school = $scope.selected.value[0];
      console.log($scope.school);
      if($scope.school.is985 == true)
        $scope.school.shi985 = '是';
      else
        $scope.school.shi985 = '否';
      if($scope.school.is211 == true)
        $scope.school.shi211 = '是';
      else
        $scope.school.shi211 = '否';
    };

    $scope.submitForm = function (school) {
      if(school.$id != null){
        if(school.shi985 == '是')
          school.is985 = true;
        else
          school.is985 = false;
        if(school.shi211 == '是')
          school.is211 = true;
        else
          school.is211 = false;
        Restangular.one('schools', school.$id).patch(school).then(function() {
          alert("修改成功");
        });
      }
    };
    $scope.schoolremove = function() {
      if($scope.school.$id != null){
        var id = $scope.school.$id;
        var path = 'schools/'+id;
        Restangular.one(path).remove().then(function(){
          alert("删除成功");
          $state.reload();
        });
      }
    };
  })
});
