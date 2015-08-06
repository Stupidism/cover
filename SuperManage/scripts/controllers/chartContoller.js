'use strict';
/**
 * @ngdoc function
 * @name superAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the superAdminApp
 */
angular.module('superAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.login().then(function() {
      $scope.school = $scope.currentUser.$related.school;
      console.log($scope.school);
    });
}]);
