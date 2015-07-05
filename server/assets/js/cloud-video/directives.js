angular.module('cover').directive('coverFlash', function() {
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
});
