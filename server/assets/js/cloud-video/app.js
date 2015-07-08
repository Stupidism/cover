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
    url: '/course_manage/:course',
    controller: 'CourseManageCtrl',
    templateUrl: 'assets/partials/course_manage.html',
  }).state('courseManage.textbooks', {
    url: '/textbooks',
    controller: 'TextbooksCtrl',
    template: '<div cover-ebook="/VPFile{{course.ebookUrl}}"></div>'
  }).state('courseManage.microcourse', {
    url: '/microcourse',
    controller: 'MicroCourseCtrl',
    templateUrl: 'assets/partials/microcourse.html',
  }).state('courseManage.assignments', {
    url: '/assignments',
    templateUrl: 'assets/partials/assignment_list.html',
  }).state('courseManage.subjects', {
    url: '/subjects',
    templateUrl: 'assets/partials/subject_list.html',
  }).state('courseManage.subjectDetails', {
    url: '/subjects/:subject',
    controller: 'SubjectDetailsCtrl',
    templateUrl: 'assets/partials/subject_details.html',
  }).state('courseManage.problems', {
    url: '/problems',
    templateUrl: 'assets/partials/problem_list.html',
  }).state('courseManage.problemDetails', {
    url: '/problems/:problems',
    controller: 'ProblemDetailsCtrl',
    templateUrl: 'assets/partials/problem_details.html',
  }).state('courseManage.exercises', {
    url: '/exercises',
    templateUrl: 'assets/partials/exercise_list.html',
  }).state('courseManage.classes', {
    url: '/classes',
    templateUrl: 'assets/partials/class_list.html',
  }).state('courseManage.classDetails', {
    url: '/classes/:class',
    controller: 'ClassDetailsCtrl',
    templateUrl: 'assets/partials/class_details.html',
  }).state('courseManage.edit', {
    url: '/edit',
    controller: 'CourseManageEditCtrl',
    templateUrl: 'assets/partials/course_manage_edit.html',
  });

  $urlRouterProvider.otherwise('/');
}).run(function (Restangular, JsonApiOrg, coverAuth, $http) {
  Restangular.setRestangularFields({
      id: "$id"
  });
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

  Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
    if (coverAuth.currentUser) {
      headers['Access-Token'] = coverAuth.currentUser.$token;
    }
    return {
      element: element,
      params: params,
      headers: headers,
      httpConfig: httpConfig
    };
  });
  Restangular.addErrorInterceptor(function(response, deferred, responseHandler) {
    if (response.status === 401) {
      coverAuth.login().then(function() {
        var config = response.config;
        if (coverAuth.currentUser) {
          config.headers = config.headers || {};
          config.headers['Access-Token'] = coverAuth.currentUser.$token;
        }
        return $http(config);
      }).then(responseHandler, deferred.reject);
      return false;
    }
    return true;
  });
});
