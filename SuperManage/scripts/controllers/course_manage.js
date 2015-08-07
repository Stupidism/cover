angular.module('superAdminApp')
.controller('courseManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, $filter, dateFilter, $rootScope) {
  $rootScope.pageTitle = "课程管理 - 详细管理";
  $scope.login().then(function() {
    Restangular.all('schools').getList().then(function(schools) {
      $scope.schools = schools;
      $scope.school = $scope.schools[0];
      Restangular.all('schools/' + $scope.school.$id.toString() + '/majors').getList().then(function(majors) {
        $scope.majors = majors;
        $scope.major = $scope.majors[0];
        $scope.coursesAll = Restangular.all('majors/' + $scope.major.$id + '/courses').getList().$object;
      });
    });

    $scope.user = {};

    $scope.updateSchool = function() {
      console.log($scope.school);
      if ($scope.school) {
        Restangular.all('schools/' + $scope.school.$id + '/majors').getList().then(function(majors){
          $scope.majors = majors;
          $scope.major = $scope.majors[0];
          $scope.updateMajor();
        });
      } else {
        Restangular.all('majors').getList().then(function(majors){
          $scope.majors = majors;
          $scope.major = $scope.majors[0];
          $scope.updateMajor();
        });
      }
    };

    $scope.updateMajor = function() {
      if ($scope.major) {
        $scope.coursesAll = Restangular.all('majors/' + $scope.major.$id + '/courses').getList().$object;
      } else {
        if($scope.school){
          $scope.coursesAll = Restangular.all('schools/' + $scope.school.$id.toString() + '/courses').getList().$object;
        }
        else{
          $scope.coursesAll = [];
        }
      }
    };

    $scope.updateAll = function() {
        $scope.course = $scope.selectedcourseAll.value[0];
        console.log($scope.course);
    };

    //form-group inputs begin
    $scope.isPosInt = function(num) {
      var re = /^[1-9]+[0-9]*]*$/;
      return re.test(num);
    };

    $scope.ratios = {
      'assignmentRatio': {
        title: '作业比例',
        type: 'success',
      },
      'testRatio': {
        title: '测验比例',
        type: 'info'
      },
      'examRatio': {
        title: '考试比例',
        type: 'danger'
      },
    };

    $scope.$watch('course.assignmentRatio', function(ratios) {
      if ($scope.course) {
        $scope.course.testRatio = 100 - $scope.course.examRatio - $scope.course.assignmentRatio;
        $scope.ratiosValid = !isNaN($scope.course.testRatio);
      }
    })
    $scope.$watch('course.examRatio', function(ratios) {
        if ($scope.course) {
          $scope.course.testRatio = 100 - $scope.course.examRatio - $scope.course.assignmentRatio;
          $scope.ratiosValid = !isNaN($scope.course.testRatio);
        }
      })
      //form-group inputs end

    //teaching matatiral begin
    $scope.chooseEnum = {
      0: '未选择',
      1: '已选择'
    }

    //datepicker begin
    function formatDate(date, format) {
      if (!date) return;
      if (!format) format = "yyyy-MM-dd";
      switch (typeof date) {
        case "string":
          date = new Date(date.replace(/-/, "/"));
          break;
        case "number":
          date = new Date(date);
          break;
      }
      if (!date instanceof Date) return;
      var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
      };
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
      });
    }

    $scope.$watch('course.enrollStarttime', function(date) {
      if ($scope.course) {
        $scope.course.enrollStarttime = formatDate($scope.course.enrollStarttime, "yyyy-MM-dd HH:mm:ss");
      }
    });

    $scope.$watch('course.enrollEndtime', function(date) {
      if ($scope.course) {
        $scope.course.enrollEndtime = formatDate($scope.course.enrollEndtime, "yyyy-MM-dd HH:mm:ss");
      }
    });
    $scope.$watch('course.startTime', function(date) {
      if ($scope.course) {
        $scope.course.startTime = formatDate($scope.course.startTime, "yyyy-MM-dd HH:mm:ss");
      }
    });
    $scope.$watch('course.endTime', function(date) {
      if ($scope.course) {
        $scope.course.endTime = formatDate($scope.course.endTime, "yyyy-MM-dd HH:mm:ss");
      }
    });
    //datepicker end


    $scope.submit = function(course) {
      if (course.$id != null) {
        course.patch(course).then(function(c) {
          alert("修改成功");
          if($scope.school)
            $scope.coursesAll = Restangular.all('schools/' + $scope.school.$id + '/courses').getList().$object;
          else{
            if($scope.major)
              $scope.coursesAll = Restangular.all('majors/' + $scope.major.$id + '/courses').getList().$object;
            else
              $scope.coursesAll = Restangular.all('courses').getList().$object;
          }
        });
      }

    };
    $scope.courseremove = function() {
      if ($scope.course) {
        if($scope.school == null){
          alert("请选择学校");
        }
        else{
          var reqDEL = {
            method: 'DELETE',
            url: '/api/schools/' + $scope.school.$id + '/links/courses',
            headers: {
              'Access-Token': $scope.currentUser.$token,
            },
            data: {
              "data": [{
                type: "course",
                id: $scope.course.$id
              }]
            }
          };
          console.log(reqDEL);
          $http(reqDEL)
            .then(function() {
              alert("删除成功");
              if($scope.major)
                $scope.coursesAll = Restangular.all('majors/' + $scope.major.$id + '/courses').getList().$object;
              else
                $scope.coursesAll = Restangular.all('schools/' + $scope.school.$id + '/courses').getList().$object;
            });
        }
      }
    };

  });
});

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
};

angular.module('superAdminApp')
.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

angular.module('superAdminApp')
.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});
