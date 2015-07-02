angular.module('cover')
.controller('CourseEditCtrl',
function ($scope,$http, course,create,$timeout) {
  //modal begin
  $scope.course=course;
  console.log(course);
  if(create){
    $scope.course.studentNum=20;
    $scope.course.examRatio=40;
    $scope.course.assignmentRatio=30;
    $scope.course.quizRatio=30;
    $scope.classNum=1;
  }else{
    $scope.classNum=1;
  }
  $scope.errorText={};
  $scope.create=create;
  //modal end

  //form-group inputs begin
  $scope.isPosInt=function(num)
  {
     var re = /^[1-9]+[0-9]*]*$/;
     return re.test(num);
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

  //teaching matatiral begin
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = slides.length+1;
    slides.push({
      image: 'assets/images/kittys/' + newWidth+'.jpg',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
  //teaching matatiral end

  //datepicker begin
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;
  if (!create) $scope.minDate = new Date(0);

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

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
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

  $scope.submitForm = function(isValid) {
    alert('our form is amazing');

    // check to make sure the form is completely valid
    if (isValid) {
    }

  };
});
