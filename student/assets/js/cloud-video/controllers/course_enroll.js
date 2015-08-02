angular.module('student').controller('CourseEnrollCtrl', function ($scope, $state,clazz,user,$modalInstance,Restangular,$modal) {
  $scope.clazz=clazz;
  $scope.dismiss = function(){
    $state.reload();
    $modalInstance.dismiss('cancel');
  }
  $scope.courseEnroll = function() {
    $scope.clazz.forEach(function(classes) {
      if (classes.chosen) {
        $scope.classes = classes;
      }
    });
    $modal.open({
      animation:true,
      size:'lg',
      templateUrl: 'assets/partials/password.html',
      controller: 'PasswordCtrl',
      resolve: {
        clazz: function () {
          return $scope.classes;
        },
        user:function(){
          return user;
        }
      },
    })
    $modalInstance.dismiss('cancel');
  };
});
