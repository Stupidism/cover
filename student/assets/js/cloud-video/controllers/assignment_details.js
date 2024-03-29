angular.module('student').controller('AssignmentDetailsCtrl', function ($scope, Restangular, $stateParams,$modal,$state) {
    var create = 0;
    var path = "students/"+$scope.currentUser.$id+"/assignments/"+$stateParams['assign']+"/homework";
	$scope.editHomework = {
		$type:"homework",
		status:0,
		iscommit:true,
		name:"",
		content:"",
		$relationships: {
	        assignment: {data: {
	        	type:"assignment",
	        	id: $stateParams['assign']
	        	}
	        },
	        student : {data: $scope.currentUser.$asLink()}
	  	},
	};
  	Restangular.one(path).get().then(function(homework){
  		$scope.neweditHomework = homework;
	  	if($scope.neweditHomework.$id){
	  		create = 1;
	  		$scope.editHomework = $scope.neweditHomework;
	  	}
	  });
	$scope.submit = function (homework) {
	    if(create == 1){
	    	var hid = homework.$id;
	    	$scope.fetchHomework = Restangular.one('homeworks',hid).get();
  			$scope.fetchHomework.then(function (newhomework) {
			    newhomework.patch(homework).then(function (c) {
			      $state.reload();
			    }); 
			});   	
	    }
	    else{
	      Restangular.all("homeworks").post(homework).then(function () {
	        $state.reload();
	      });
	    }
		};
		$scope.fileUploaded = function (data) {
	  		if(create == 0){
				Restangular.all("homeworks").post($scope.editHomework).then(function (homework) {	
					$scope.editHomework = homework;
					var id = homework.$id;
					Restangular.all("homeworks").all(id).all("links").all('resources').post([data.$asLink()]).then(
	      				function () {
	        				$state.reload();
	      				});
	      		});
	  		}
			else{
				var id = $scope.editHomework.$id;
				Restangular.all("homeworks").all(id).all("links").all('resources').post([data.$asLink()]).then(
	  				function () {
	    				$state.reload();
	  				});
			}
	  	};
})
