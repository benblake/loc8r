(function() {

angular
  .module('loc8rApp')
  .controller('navigationCtrl', navigationCtrl);

navigationCtrl.$inject = ['$location', 'authentication', '$window'];
function navigationCtrl($location, authentication) {
  var vm = this;

  vm.currentPath = $location.path();

  vm.isLoggedIn = authentication.isLoggedIn();
  // vm.isLoggedIn = true;

  vm.currentUser = authentication.currentUser();

  vm.logout = function() {
    authentication.logout();
    $location.path('/');
  };
}

})();
