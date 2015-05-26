angular.module('remap', [
  'ui.bootstrap', 
  'ui.router',
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'assets/partials/dashbroad.html',
  }).state('paper', {
    url: '/courses',
    templateUrl: 'assets/partials/courses.html',
  });

  $urlRouterProvider.otherwise('/');
});
