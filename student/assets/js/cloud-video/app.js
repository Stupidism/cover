angular.module('student', [
  'ui.bootstrap',
  'ui.router',
  'restangular',
  'angular-table',
]).config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'assets/partials/dashboard.html',
  }).state('textbooks', {
    url: '/textbooks',
    controller: 'TextbooksCtrl',
    templateUrl: 'assets/partials/textbook_list.html',
  }).state('information', {
    url: '/information',
    controller: 'InformationCtrl',
    templateUrl: 'assets/partials/information.html',
  }).state('courseslist', {
    url: '/courseslist',
    controller: 'CourseAllCtrl',
    templateUrl: 'assets/partials/course_all.html',
  }).state('mycourses', {
    url: '/mycourses',
    controller: 'CoursesListCtrl',
    templateUrl: 'assets/partials/course_list_my_courses.html',
  }).state('courseManage', {
    url: '/course_manage/:course',
    controller: 'CourseManageCtrl',
    templateUrl: 'assets/partials/course_manage.html',
  }).state('courseManage.courseIndex', {
    url: '/courseindex',
    controller: 'CourseIndexCtrl',
    templateUrl: 'assets/partials/course_index.html',
  }).state('courseManage.textbooks', {
    url: '/textbooks',
    controller: 'TextbooksCtrl',
    template: '<div cover-ebook="/VPFile{{course.ebookUrl}}"></div>'
  }).state('courseManage.microcourse', {
    url: '/microcourse',
    controller: 'MicroCourseCtrl',
    templateUrl: 'assets/partials/microcourse.html',
  }).state('courseManage.messages', {
    url: '/messages',
    controller: 'MessagesListCtrl',
    templateUrl: 'assets/partials/message_list.html',
  }).state('courseManage.assignments', {
    url: '/assignments',
    controller: 'AssignmentListCtrl',
    templateUrl: 'assets/partials/assignment_list.html',
  }).state('courseManage.assignmentDetails', {
    url: '/assignments/:assign',
    controller: 'AssignmentDetailsCtrl',
    templateUrl: 'assets/partials/assignment_details.html',
  }).state('courseManage.assignmentDetailsFile', {
    url: '/homeworks/:home',
    controller: 'AssignmentDetailsFileCtrl',
    templateUrl: 'assets/partials/assignment_details_file.html',
  }).state('courseManage.assignmentFile', {
    url: '/assignments/:assign/file',
    controller: 'AssignmentFileCtrl',
    templateUrl: 'assets/partials/assignment_file.html',
  }).state('courseManage.subjects', {
    url: '/subjects',
    controller: 'SubjectListCtrl',
    templateUrl: 'assets/partials/subject_list.html',
  }).state('courseManage.subjectDetails', {
    url: '/subjects/:subject',
    controller: 'SubjectDetailsCtrl',
    templateUrl: 'assets/partials/subject_details.html',
  }).state('courseManage.questions', {
    url: '/questions',
    controller: 'QuestionsListCtrl',
    templateUrl: 'assets/partials/question_list.html',
  }).state('courseManage.questionDetails', {
    url: '/questions/:question',
    controller: 'QuestionDetailsCtrl',
    templateUrl: 'assets/partials/question_details.html',
  }).state('courseManage.exercises', {
    url: '/exercises',
    templateUrl: 'assets/partials/exercise_list.html',
  }).state('courseManage.outline', {
    url: '/outline',
    controller: 'CourseOutlineCtrl',
    templateUrl: 'assets/partials/course_outline.html',
  });

  $urlRouterProvider.otherwise('/');
}).run(function (Restangular, JsonApiOrg, coverAuth, $http) {
  Restangular.setRestangularFields({
      id: "$id"
  });
  Restangular.setBaseUrl('/api/');
  Restangular.addResponseInterceptor(
    function (data, operation, what, url, response, deferred) {
      if (!data) return data;
      return JsonApiOrg.parse(data, what);
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
