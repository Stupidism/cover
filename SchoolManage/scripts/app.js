'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'restangular'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        data : { pageTitle: 'Home' },
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    .state('dashboard.home',{
      templateUrl:'views/dashboard/home.html',
      url:'/home',
      controller:'ChartCtrl',
      resolve: {
        loadMyFile:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'chart.js',
            files:[
              'bower_components/angular-chart.js/dist/angular-chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.css'
            ]
          }),
          $ocLazyLoad.load({
              name:'sbAdminApp',
              files:['scripts/controllers/chartContoller.js']
          })
        }
      }
  })
      .state('dashboard.addTeacher',{
        templateUrl:'views/teacher/teacher_add.html',
        url:'/teacher/addTeacher',
        controller:'teacherAddCtrl',
    })
    .state('dashboard.manageTeacher',{
      templateUrl:'views/teacher/teacher_manage.html',
      url:'/teacher/manageTeacher',
      controller:'teacherManageCtrl',
    })
    .state('dashboard.addStudent',{
        templateUrl:'views/student/student_add.html',
        url:'/student/addStudent',
        controller:'studentAddCtrl',
    })
    .state('dashboard.manageStudent',{
      templateUrl:'views/student/student_manage.html',
      url:'/student/manageStudent',
      controller:'studentManageCtrl',
    })
    .state('dashboard.buyCourse',{
        templateUrl:'views/course/course_buy.html',
        url:'/course/buyCourse',
        controller:'courseBuyCtrl',
    })
    .state('dashboard.manageCourse',{
      templateUrl:'views/course/course_manage.html',
      url:'/course/manageCourse',
      controller:'courseManageCtrl',
    })
    .state('dashboard.addMajor',{
        templateUrl:'views/major/major_add.html',
        url:'/course/addMajor',
        controller:'majorAddCtrl',
    })
    .state('dashboard.manageMajor',{
      templateUrl:'views/major/major_manage.html',
      url:'/course/manageMajor',
      controller:'majorManageCtrl',
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
  }]).run(function (Restangular, JsonApiOrg, coverAuth, $http) {
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
