angular.module('cover', [
  'ui.bootstrap', 
  'ui.router',
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'assets/partials/dashboard.html',
  }).state('courses', {
    url: '/courses',
    templateUrl: 'assets/partials/course_list.html',
  });

  $urlRouterProvider.otherwise('/');
});
