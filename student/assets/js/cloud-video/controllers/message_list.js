angular.module('student').controller('MessagesListCtrl', function ($scope, $http, $modal, Restangular, $q, JsonApiOrg) {
  $scope.fetchCourse.then(function () { 
    Restangular.one('courses', $scope.course.$id).all('messages').getList()
      .then(function (messages) {
        $scope.messages = messages;
      });
  });
  $scope.message = [];
  $scope.newMessage = function (course,$event,create) {
    $event.stopPropagation();
    message = {
      $type: 'message',
      $relationships: {
        course: {data: $scope.course.$asLink()},
        teacher : {data: $scope.currentUser.$asLink()}
      },
    };
    //question.viewCount = 0;
    
    $modal.open({
      animation:true,
      size:'lg',
      backdrop: create ? true : false,
      templateUrl: 'assets/partials/message_new.html',
      controller: 'MessageNewCtrl',
      resolve: {
        message: function () {
          return message;
        },
        create: function(){
          return create;
        },
      },
    });
  };
});
