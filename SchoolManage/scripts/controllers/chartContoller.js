'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.login().then(function() {
      $scope.school = $scope.currentUser.$related.school;
      console.log($scope.school);
    });
}]);
