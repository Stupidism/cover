angular.module('cover').controller('SubjectAddCtrl',
function ($scope,$state,$http,$timeout, Restangular,JsonApiOrg ) {
  $scope.step=1;
  $scope.subject={};
  $scope.create=true;

  $scope.dismiss = function(){
    console.log(123);
    $state.go('courseManage.subjects',{course: $scope.course.$id});
  }
  $scope.createSubject = function() {
    $scope.newsubject = {
      $type: "subject",
      code: "213213",
      name: $scope.subject.name,
      description: $scope.subject.description,
      $relationships: {
        courses: {data: 
          [
            {
                $id: $scope.course.$id,
                $type: "course"
            }
          ]
        }
      }
    }
    //var courseLinks = $scope.newsubject.$relationships.courses.data = [];
    //console.log($scope.course);
    //courseLinks.push($scope.course);
    //console.log($scope.newsubject);
    Restangular.all('subjects').post($scope.newsubject).then(function (subject) {
      $scope.subject = subject;
      console.log($scope.subject);
    });
  };
  $scope.fileUploaded = function (data) {
    var subjectRest = Restangular.one('subjects', $scope.subject.$id);
    //$scope.subject = subjectRest.get().$object;
    subjectRest.all('links').all('resources').post([data.$asLink()]).then(
      function () {
        $state.go('courseManage.subjects',{course: $scope.subject.$relationships.course.data.id});
      });
  };
  $scope.$dismiss = function () {
    $state.go('courseManage.subjects',{course: $scope.course.$id},{reload: true});
  };
});