angular.module('cover').controller('MasterCtrl', function ($scope, $q, $modal, $http, JsonApiOrg) {
  $scope.currentUser = null;

  var loginPromise;
  $scope.login = function () {
    if ($scope.currentUser)
      return $q.when($scope.currentUser);
    loginPromise = null;
    if (!loginPromise || loginPromise.$rejected) {
      loginPromise = $modal.open({
          templateUrl : '/assets/partials/login.html',
          backdrop : 'static',
          keyboard : false,
          size : 'sm',
        }).result.then(function (user) {
          user.role = 1;
          return $http.post('/api/account/login', user)
          .then(function (res) {
            $scope.currentUser = JsonApiOrg.parse(res.data.user);
            $scope.currentUser.$token = res.data.token;
            console.log($scope.currentUser);
          }, function (res) {
            console.info(res);
            if(res.status==403)
              alert("用户名或密码错误");
          });
        }, function (e) {
          console.info(e);
          if (e === 'register')
            return $scope.register().catch (function (e) {
              loginPromise = null;
              return $q.reject(e);
            });
          loginPromise = null;
          return $q.reject(e);
        });
    }
    return loginPromise || $q.reject();
  };


  $scope.register = function () {
    var scope = $scope.$new('isolate');
    scope.register = true;
    return $modal.open({
      templateUrl : 'assets/partials/user_edit.html',
      backdrop : 'static',
      keyboard : false,
      size : 'sm',
      scope : scope,
    }).result.then(function (user) {
      $http.post("api/users/", user)
        .then(function(res){
          console.info(user);
          $http.post('/api/login', user)
          .then(function (res) {
            $scope.currentUser = res.data;
          }, function (res) {
            console.info(res);
            if(res.status==403)
              alert("用户名或密码错误");
          });
        },function(){
            console.error("Failed to save.");
        });
    }).then(function (user) {
      return user;
    });
  };
  $scope.logout = function () {
    $http.post("/api/account/logout", {}, {headers: {
      'Access-Token': $scope.currentUser.$token,
    }}).then(function () {
      window.location.reload();
    });
  };
});
