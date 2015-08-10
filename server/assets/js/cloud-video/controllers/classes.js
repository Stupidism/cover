angular.module('cover').controller('ClassesCtrl', function ($scope, $http, $modal, Restangular, $stateParams,$state) {
  $scope.fetchCourse.then(function (course) {
    $scope.classes = course.$related.clazzs;
  });
  $scope.clazz = [];
  $scope.classremove = function(classid){
	var path = 'clazzs/'+classid;
    Restangular.one(path).remove().then(function(){
      alert("删除成功");
      $state.reload();
    });
  }
  $scope.newClazz = function (course,$event,create) {
  	console.log("aaa");
    $event.stopPropagation();
    clazz = {
      $type: 'clazz',
      $relationships: {
        course: {data: $scope.course.$asLink()}
      },
    };
    //question.viewCount = 0;
    $modal.open({
      animation:true,
      size:'lg',
      backdrop: create ? true : false,
      templateUrl: 'assets/partials/class_new.html',
      controller: 'ClazzNewCtrl',
      resolve: {
        clazz: function () {
          return clazz;
        },
        create: function(){
          return create;
        },
      },
    });
  };
});
