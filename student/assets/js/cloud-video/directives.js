angular.module('student').directive('coverFlash', function() {
  return {
    scope: {
      coverFlash: "@"
    },
    restrict: 'A',
    template:
      '<object data="{{src}}" type="application/x-shockwave-flash">'+
        '<param name="allowscriptaccess" value="always" />'+
        '<param name="allowfullscreen" value="true" />'+
        '<param name="wmode" value="transparent" />'+
      '</object>',
    compile: function(elem, attrs, transcludeFn) {
      return function link (scope, element, attrs) {
        var movie = null;
        scope.$watch('coverFlash', function(src) {
          if (movie) movie.remove();
          movie = jQuery('<param name="movie" value="' + src + '" />')
          element.find('object').append(movie);
        });
      };
    }
  };
}).directive('coverEbook', function() {
  var total_vid = 0;
  return {
    scope: {
      coverEbook: "@"
    },
    restrict: 'A',
    templateUrl: 'assets/partials/cover_ebook.html',
    link: function ($scope, element, attrs) {
      var vid = total_vid++;
      $scope.$watch('coverEbook', function(src) {
        if (!src) return;
        var target = element.find('.cover-textbook-viewer');
        target.attr('id', 'cover-textbook-viewer--' + vid);
        target.FlexPaperViewer({
          config : {
            SwfFile : escape(src),
          }
        });
      });
    },
  };
}).directive('coverVideo', function() {
  var total_vid = 0;
  return {
    scope: {
      coverVideo: "@",
      width: "=",
      height: "=",
      image: "@?",
    },
    restrict: 'A',
    template: '<div class="video-container"><div>Loading the player...</div></div>',
    link: function ($scope, element, attrs) {
      var vid = total_vid++;
      $scope.$watch('coverVideo', function(src) {
        if (!src) return;
        var target = element.find('.video-container > div');
        var id = 'cover-video--' + vid;
        target.attr('id', id);
        var playerInstance = jwplayer(id);
        playerInstance.setup({
          file: src,
          image: $scope.image,
          width: $scope.width,
          height: $scope.height,
        });
      });
    },
  };
}).directive('coverFileUpload', function(JsonApiOrg) {
  return {
    scope: {
      coverFileUpload: "&",
    },
    restrict: 'A',
    templateUrl: 'assets/partials/cover_file_upload.html',
    link: function ($scope, element, attrs) {
      element.find(".cover-file-upload").dmUploader({
        url: '/VPFile/fileupload',
        onNewFile: function () {
          $scope.$apply(function () {
            $scope.fileUploadPercent = 0;
          });
        },
        onUploadProgress: function (id, percent) {
          $scope.$apply(function () {
            $scope.fileUploadPercent = percent;
          });
        },
        dataType: 'json',
        onUploadSuccess: function (id, data) {
          $scope.$apply(function () {
            $scope.fileUploadPercent = 100;
            data = JsonApiOrg.parseResource({
              id: data.data.id,
              type: 'vpresource',
              attributes: data.data,
            });
            $scope.coverFileUpload({$data: data})
          });
        },
      });
    },
  };
});
