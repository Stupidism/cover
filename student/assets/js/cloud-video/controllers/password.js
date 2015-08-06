angular.module('student').controller('PasswordCtrl', function ($scope, $state,clazz,$modalInstance,Restangular,user) {
  $scope.enrollClazz=clazz;
  $scope.dismiss = function(){
    $state.reload();
    $modalInstance.dismiss('cancel');
  }
  $scope.submit = function(enrollClazz) {
    $scope.myclass = {
      type: 'clazz',
      id: enrollClazz.$id,
      meta:{password:enrollClazz.password}
    }
    console.log(user);
    var id = user.$id;
    Restangular.all('students').all(id).all("links").all("clazz").post($scope.myclass).catch(function (res) {
          if (res.status === 409 ) {
            alert('已报名该课程或报名密码错误');
          }
        }).then(function () {
              $state.reload();
              $modalInstance.dismiss('cancel');
            });
    };
});