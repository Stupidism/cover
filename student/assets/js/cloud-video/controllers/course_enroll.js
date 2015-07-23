angular.module('student').controller('CourseEnrollCtrl', function ($scope, $state,clazz,user,$modalInstance,Restangular) {
  console.log(user);
  var id = user.$id;
  $scope.clazz=clazz;
  console.log($scope.clazz);
  /*$scope.submit = function (question) {
  console.log($scope.question);
  Restangular.all('questions').post($scope.question).then(function (question) {
      $state.go('courseManage.questions', {course: $scope.question.$relationships.course.data.id}, {reload: true});
      $modalInstance.dismiss('cancel');
    });
  };*/
  $scope.dismiss = function(){
    $state.reload();
  }
  $scope.courseEnroll = function() {
    $scope.clazz.forEach(function(classes) {
      console.log(classes.chosen);
      if (classes.chosen) {
        $scope.classes = classes;
      }
    });
    $scope.myclass = {
      type: 'clazz',
      id: $scope.classes.$id,
      meta:{password:$scope.classes.enrollPwd}
    }
    Restangular.all('students').all(id).all("links").all("clazz").post($scope.myclass).catch(function (res) {
          if (res.status === 409 ) {
            alert('已报名该课程');
          }
        }).then(function () {
              $state.reload();
              $modalInstance.dismiss('cancel');
            });
    };
});
