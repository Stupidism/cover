'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('superAdminApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope,$window,$location){
        $scope.search = function(searchText)
        {
          $window.location.href = 'http://www.baidu.com/s?wd=site:'+$location.host()+'%20'+$scope.searchText;
        }
      }
    }
  });
