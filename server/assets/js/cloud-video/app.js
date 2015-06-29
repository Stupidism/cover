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
        var resource = angular.copy(item.attributes);
        resource.$id = item.id;
        resource.$type = item.type;
        resource.$relationships = item.relationships;
        return Restangular.restangularizeElement(parent, resource, what, {});
      };
      var populateIncluded = function (resource, resourceMap) {
        resource.$included = resource.$included || {};
        for (var relationName in resource.$relationships) {
          var relation = resource.$relationships[relationName];
          if (relation && relation.data) {
            var includedByLink = function (link) {
              var typedMap = resourceMap[link.type];
              return typedMap && typedMap[link.id];
            };
            if (Array.isArray(relation.data)) {
              var includeds = resource.$included[relationName] = [];
              relation.data.forEach(function (link) {
                var included = includedByLink(link);
                if (included) includeds.push(included);
              });
            } else {
              resource.$included[relationName] = includedByLink(relation.data);
            }
          }
        }
        return resource;
      };
      var resourceMap = {};
      var addResourceToMap = function (resource) {
        var typedMap = resourceMap[resource.$type];
        if (!typedMap) typedMap = resourceMap[resource.$type] = {};
        typedMap[resource.$id] = resource;
      };
      var primary = [];
      data.data.forEach(function (item) {
        var resource = parseJsonApiItem(item, primary);
        primary.push(resource);
        addResourceToMap(resource);
      });
      primary.$root = data;
      primary.$included = [];
      primary.$byType = resourceMap;
      Restangular.restangularizeCollection(null, primary.$included, what, {});
      data.included.forEach(function (item) {
        var resource = parseJsonApiItem(item, primary.$included);
        primary.$included.push(resource);
        addResourceToMap(resource);
      });
      primary.forEach(function (resource) {
        populateIncluded(resource, resourceMap);
      });
      primary.$included.forEach(function (resource) {
        populateIncluded(resource, resourceMap);
      });
      return primary;
    });
});
