'use strict';
/**
 * @ngdoc function
 * @name superAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the superAdminApp
 */
angular.module('superAdminApp')
  .controller('ChartCtrl', 
   function ($scope, $timeout,Restangular,$http) {
    $scope.login().then(function() {
      $scope.schools = Restangular.all('schools').getList().$object;
      //$scope.school = $scope.currentUser.$related.school;
      //console.log($scope.school);
    });
});
