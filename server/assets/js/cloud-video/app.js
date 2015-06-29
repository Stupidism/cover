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
    url: '/course_manage',
    templateUrl: 'assets/partials/course_manage.html',
  });

  $urlRouterProvider.otherwise('/');
}).run(function (Restangular) {
  Restangular.setBaseUrl('/api/');
  Restangular.addResponseInterceptor(
    function (data, operation, what, url, response, deferred) {
      var parseJsonApiItem = function (item, parent) {
        var result = angular.copy(item.attributes);
        result.$id = item.id;
        result.$type = item.type;
        result.$relationships = item.relationships;
        return Restangular.restangularizeElement(parent, result, what, {});
      };
      var primary = [];
      data.data.forEach(function (item) {
        primary.push(parseJsonApiItem(item, primary));
      });
      primary.$root = data;
      primary.$included = [];
      Restangular.restangularizeCollection(null, primary.$included, what, {});
      data.included.forEach(function (item) {
        primary.$included.push(parseJsonApiItem(item, primary.$included));
      });
      return primary;
    });
});
