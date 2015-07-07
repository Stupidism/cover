angular.module('cover').controller('MasterCtrl', function ($scope, $q, $modal, $http, JsonApiOrg) {
  $scope.currentUser = null;

  var loginPromise;
  $scope.autoLogin = function () {
    var accessToken = localStorage['accessToken'];
    if (!accessToken) return $q.reject();
    return loginPromise = $http.get('/api/account/current', {headers: {
      'Access-Token': accessToken
    }}).then(function (res) {
      $scope.currentUser = JsonApiOrg.parse(res.data);
      $scope.currentUser.$token = accessToken;
      return $scope.currentUser;
    }, function (e) {
      delete localStorage['accessToken'];
      return $q.reject(e);
    }).catch(function (e) {
      loginPromise = null;
      return $q.reject(e);
    }) || $q.reject();
  };
  $scope.autoLogin();
  $scope.login = function () {
    if ($scope.currentUser)
      return $q.when($scope.currentUser);
    if (!loginPromise) {
      loginPromise = $modal.open({
          templateUrl : 'assets/partials/login.html',
          backdrop : 'static',
          keyboard : false,
          size : 'sm',
        }).result.catch(function (e) {
          if (e === 'register')
            return $scope.register();
          return $q.reject(e);
        }).then(function (user) {
          user.role = 1;
          return $http.post('/api/account/login', user).catch(function (res) {
            if (res.status === 403 || res.status === 404) {
              alert('用户名或密码错误！')
            }
            return $q.reject(res);
          });
        }).then(function (res) {
          $scope.currentUser = JsonApiOrg.parse(res.data.user);
          $scope.currentUser.$token = res.data.token;
          localStorage['accessToken'] = $scope.currentUser.$token;
          console.log($scope.currentUser);
          return $scope.currentUser;
        });
      loginPromise.catch(function (e) {
        loginPromise = null;
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
      delete localStorage['accessToken'];
      window.location.reload();
    });
  };
});
