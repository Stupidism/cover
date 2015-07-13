angular.module('cover').controller('CourseNewCtrl',
function ($scope,$http,$timeout, Restangular,JsonApiOrg ) {
  //modal begin
  $scope.textbooks=Restangular.all('textbooks').getList().$object;
  $scope.step=1;

  $scope.course={};
  $scope.course.studentNum=20;
  $scope.course.examRatio=40;
  $scope.course.assignmentRatio=30;
  $scope.course.quizRatio=30;
  $scope.classNum=1;

  $scope.errorText={};
  $scope.create=true;
  //modal end

  //form-group inputs begin
  $scope.isPosInt=function(num)
  {
     var re = /^[1-9]+[0-9]*]*$/;
     return re.test(num);
  };

  $scope.choosedAnyTextbook=function(textbooks){
    return eval(textbooks.map(function(textbook){return textbook.chosen||false}).join("+"));
  };

  $scope.ratios={
    'assignmentRatio':{
      title:'作业比例',
      type:'success',
    },
    'testRatio':{
      title:'测验比例',
      type:'info'
    },
    'examRatio':{
      title:'考试比例',
      type:'danger'
    },
  };
  $scope.$watchGroup(['course.assignmentRatio','course.examRatio'],function(ratios){
    $scope.course.testRatio=100-$scope.course.examRatio-$scope.course.assignmentRatio;
    $scope.ratiosValid = !isNaN($scope.course.testRatio);
  })
  //form-group inputs end


  //teaching matatiral end

  //datepicker begin
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function($event,options) {
    $event.preventDefault();
    $event.stopPropagation();

    options.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd hh:mm:ss', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  //datepicker end

  //className begin
  $scope.$watch('classNum',function(newClassNum,oldClassNum){
    $scope.course.classNames=$scope.course.classNames||['班级1'];
    if(newClassNum<oldClassNum){
      for(var i=oldClassNum;i>newClassNum;i--){
        $scope.course.classNames.pop();
      }
    }else{
      for(var i=oldClassNum;i<newClassNum;i++){
        $scope.course.classNames.push('班级'+(i+1));
      }
    }
  })
  //className end

  $scope.createCourse = function() {
    if (!$scope.course.classNames) $scope.course.classNames = [];
    var classes = $scope.course.classNames.map(function (name) {
      return JsonApiOrg.serializeResource({
        $type: 'clazz',
        enrollPwd: "123456",
        name: name,
        $relationships: {
          course: {meta: {ref: 'primary'}}
        }
      });
    });
    $scope.course.$root = {included: classes},
    Restangular.all('courses').post($scope.course).then(function (course) {
      $state.go('courseManage',{course:course.$id});
    });
    console.log($scope.course);
  };
});
