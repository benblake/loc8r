(function() {

angular
  .module('loc8rApp')
  .directive('navigation', navigation);

function navigation() {
  return {
    restrict: 'EA',
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/common/directives/navigation/navigation.template.html'
  };
};

})();
