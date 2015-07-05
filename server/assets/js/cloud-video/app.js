angular.module('cover', [
  'ui.bootstrap',
  'ui.router',
  'restangular',
]).config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
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
    url: '/course_manage?course',
    controller: 'CourseManageCtrl',
    templateUrl: 'assets/partials/course_manage.html',
  }).state('courseManage.textbooks', {
    url: '/textbooks',
    controller: 'TextbooksCtrl',
    template: '<div class="textbook-player" cover-flash="http://202.120.40.73:36038/VPFile{{course.ebookUrl}}"></div>',
  }).state('courseManage.microcourse', {
    url: '/microcourse',
    templateUrl: 'assets/partials/video_demo.html',
  }).state('courseManage.subjects', {
    url: '/subjects',
    templateUrl: 'assets/partials/subject_list.html',
  }).state('courseManage.classes', {
    url: '/classes',
    templateUrl: 'assets/partials/class_list.html',
  }).state('courseManage.edit', {
    url: '/edit',
    controller: 'CourseManageEditCtrl',
    templateUrl: 'assets/partials/course_manage_edit.html',
  });

  $urlRouterProvider.otherwise('/');
}).run(function (Restangular, JsonApiOrg) {
  Restangular.setBaseUrl('/api/');
  Restangular.addResponseInterceptor(
    function (data, operation, what, url, response, deferred) {
      var transformResource = function (resource, parent) {
        return Restangular.restangularizeElement(parent, resource, what, {});
      };
      return JsonApiOrg.parse(data, transformResource);
    });
  Restangular.addRequestInterceptor(function (element, operation, what, url) {
    if (['post', 'put', 'patch'].indexOf(operation) >= 0) {
      return JsonApiOrg.serialize(element);
    }
    return element;
  });
});
