angular.module('student').controller('MasterCtrl', function ($scope, coverAuth) {
  $scope.login = coverAuth.login;
  $scope.logout = coverAuth.logout;
  $scope.autoLogin = coverAuth.autoLogin;
  $scope.register = coverAuth.register;
  $scope.currentUser = null;
  coverAuth.onCurrentUserChange(function (user) {
    $scope.currentUser = user;
  });
  coverAuth.autoLogin();
});
