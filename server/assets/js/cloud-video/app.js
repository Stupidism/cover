angular.module('cover', [
  'ui.bootstrap',
  'ui.router',
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'assets/partials/dashboard.html',
  }).state('textbooks', {
    url: '/textbooks',
    controller: 'TextbooksCtrl',
    templateUrl: 'assets/partials/textbook_list.html',
  }).state('courses', {
    url: '/courses',
    controller: 'CoursesCtrl',
    templateUrl: 'assets/partials/course_list.html',
  }).state('courses.list', {
    url: '/my_courses',
    controller: 'CoursesListCtrl',
    templateUrl: 'assets/partials/course_list_my_courses.html',
  }).state('courses.service', {
    url: '/service_incubator',
    templateUrl: 'assets/partials/course_list_service_incubator.html',
  }).state('courses.communication', {
    url: '/international_communication',
    templateUrl: 'assets/partials/course_list_international_communication.html',
  }).state('courseManage', {
    url: '/course_manage',
    templateUrl: 'assets/partials/course_manage.html',
  });

  $urlRouterProvider.otherwise('/');
});
