angular.module('cover')
.controller('CourseEditCtrl',
function ($scope,$http, course,create,$timeout, Restangular) {
  //modal begin
  $scope.course=course;
  $scope.textbooks=course.$related.textbooks;
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
  $scope.chooseEnum={
    0:'未选择',
    1:'已选择'
  }
  course.$related.textbooks=Restangular.one('courses',course.$id).getList('textbooks').$object;
  console.log(course);
  Restangular.one('textbooks').getList().then(function (textbooks){
    $scope.textbooks = textbooks;
    console.log($scope.textbooks);
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.isRelated=new Array($scope.textbooks.length);
    $scope.addSlide = function(now) {
      slides.push({
        image: 'http://192.168.0.110:8080/VPFile/' + $scope.textbooks[now].pic,
        author: $scope.textbooks[now].author,
        publisher: $scope.textbooks[now].publisher,
        publishTime: $scope.textbooks[now].publishTime,
        isbn: $scope.textbooks[now].isbn,
        name: $scope.textbooks[now].name,
        description: $scope.textbooks[now].description,
        check: $scope.isRelated[now]
      });
    };
    for (var i=0; i<$scope.textbooks.length; i++) {
      $scope.isRelated[i] = 0;
      for (var j=0; j<course.$related.textbooks.length; j++) {
        if (course.$related.textbooks[j].$id === $scope.textbooks[i].$id) {
          $scope.isRelated[i] = 1;
          break;
        }
      }

    }
    for (var i=0; i<$scope.textbooks.length; i++) {
      $scope.addSlide(i);
    }
  })
  /*
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
*/

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

  $scope.submitForm = function(isValid) {
    alert('our form is amazing');

    // check to make sure the form is completely valid
    if (isValid) {
    }

  };
});
