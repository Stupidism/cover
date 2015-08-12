angular.module('superAdminApp')
.controller('resourceManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $rootScope) {
  $rootScope.pageTitle = "资源管理";
  $scope.login().then(function (){
    $scope.nowPage = 1;
    $scope.keyword = "";
    http(1);
    $scope.delete = function(resource)
    {
      var reqDEL = {
        method: 'DELETE',
        url: '/api/resources/'+resource.attributes.id,
        headers: {
          'Access-Token': $scope.currentUser.$token,
        },
      };
      $http(reqDEL).success(function(httpResource) {
        http($scope.nowPage);
        alert("删除指定资源成功");
      });
    };
    $scope.prev = function()
    {
      $scope.nowPage--;
      http($scope.nowPage);
    };
    $scope.next = function()
    {
      $scope.nowPage++;
      http($scope.nowPage);
    };
    $scope.search = function()
    {
      http($scope.nowPage);
    }
    function http(now)
    {
      var reqGET = {
        method: 'GET',
        url: '/api/resources?page='+now.toString()+'&size=10&keyword='+$scope.keyword,
        headers: {
          'Access-Token': $scope.currentUser.$token,
        },
      };
      $http(reqGET).success(function(httpResource) {
        $scope.resources = httpResource.data;
        $scope.totalPage = httpResource.totalPage;
      });
    };
  })
});
