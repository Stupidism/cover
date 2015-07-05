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
});
