angular.module('cover').controller('TextbooksCtrl', function ($scope, $q, $state, $http) {
  $scope.textbooks = [{
    title: 'The Introduction to JAVA',
    author: 'CHP',
    price: 233,
    published_date: '2015-11-11',
    publisher: 'SJTU'
  }, {
    title: 'The Introduction to PS',
    author: 'Zhongguo Wang Ming',
    price: 233,
    published_date: '2015-11-11',
    publisher: 'QHDX'
  }];
});

