angular.module('sbAdminApp').factory('coverAuth', function ($http, $q, $modal,
                                                       $rootScope, JsonApiOrg) {

  var currentUserChangedCallbacks = [];

  var coverAuth = {
    currentUser: null,
    setCurrentUser: setCurrentUser,
    onCurrentUserChange: onCurrentUserChange,
    autoLogin: autoLogin,
    login: login,
    register: register,
    logout: logout,
  };
  return coverAuth;

  ////

  function setCurrentUser(currentUser) {
    coverAuth.currentUser = currentUser;
    currentUserChangedCallbacks.forEach(function (callback) {
      callback(currentUser);
    });
  }
  function onCurrentUserChange(callback) {
    currentUserChangedCallbacks.push(callback);
  }

  var loginPromise;

  function autoLogin() {
    var accessToken = localStorage['accessToken'];
    if (!accessToken) return $q.reject();
    return loginPromise = $http.get('/api/account/current', {headers: {
      'Access-Token': accessToken
    }}).then(function (res) {
      coverAuth.currentUser = JsonApiOrg.parse(res.data);
      coverAuth.currentUser.$token = accessToken;
      return coverAuth.setCurrentUser(coverAuth.currentUser);
    }, function (e) {
      delete localStorage['accessToken'];
      return $q.reject(e);
    }).catch(function (e) {
      loginPromise = null;
      return $q.reject(e);
    }) || $q.reject();
  }

  function login(user) {
    if (coverAuth.currentUser)
      return $q.when(coverAuth.currentUser);
    if (!loginPromise) {
      if (user) {
        loginPromise = $q.when(user);
      } else {
        loginPromise = $modal.open({
            templateUrl : 'views/pages/login.html',
            backdrop : 'static',
            keyboard : false,
            size : 'sm',
          }).result.catch(function (e) {
            if (e === 'register')
              return coverAuth.register();
            return $q.reject(e);
          })
      }
      loginPromise = loginPromise.then(function (user) {
        user.role = 3;
        return $http.post('/api/account/login', user).catch(function (res) {
          if (res.status === 403 || res.status === 404) {
            alert('用户名或密码错误！')
          }
          return $q.reject(res);
        });
      }).then(function (res) {
        coverAuth.currentUser = JsonApiOrg.parse(res.data.user);
        coverAuth.currentUser.$token = res.data.token;
        localStorage['accessToken'] = coverAuth.currentUser.$token;
        return coverAuth.setCurrentUser(coverAuth.currentUser);
      });
      loginPromise.catch(function (e) {
        loginPromise = null;
      });
    }
    return loginPromise || $q.reject();
  }

  function register() {
    var scope = $rootScope.$new('isolate');
    scope.register = true;
    return $modal.open({
      templateUrl : 'assets/partials/user_edit.html',
      backdrop : 'static',
      keyboard : false,
      size : 'sm',
      scope : scope,
    }).result.then(function (user) {
      return $http.post("api/users/", user)
        .then(function(res){
          return coverAuth.login(user);
        });
    }).then(function (user) {
      return user;
    });
  }

  function logout() {
    $http.post("/api/account/logout", {}, {headers: {
      'Access-Token': coverAuth.currentUser.$token,
    }}).then(function () {
      delete localStorage['accessToken'];
      coverAuth.setCurrentUser(null);
      loginPromise = null;
    });
  }
});
