angular.module('sbAdminApp').controller('MasterCtrl', function ($scope, coverAuth, $rootScope) {  
  $rootScope.pageTitle = "学校管理 - 仪表盘";
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
