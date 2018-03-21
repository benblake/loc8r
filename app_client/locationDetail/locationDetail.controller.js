(function() {

angular
  .module('loc8rApp')
  .controller('locationDetailCtrl', locationDetailCtrl);

locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'loc8rData', 'authentication'];
function locationDetailCtrl($routeParams, $location, $uibModal, loc8rData, authentication) {
  var vm = this;
  vm.locationid = $routeParams.locationid;

  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentPath = $location.path();

  loc8rData.locationById(vm.locationid)
    .then(function(data) {
      vm.data = { location: data.data };
      vm.pageHeader = {
        title: vm.data.location.name
      };
    })
    .catch(function(e) {
      console.log(e);
    });

  vm.pageHeader = {
    title: vm.locationid
  };

  vm.popupReviewForm = function() {
    var modalInstance = $uibModal.open({
      templateUrl: '/reviewModal/reviewModal.view.html',
      controller: 'reviewModalCtrl as vm',
      resolve: {
        locationData: function() {
          return {
            locationid: vm.locationid,
            locationName: vm.data.location.name
          };
        }
      }
    });
    modalInstance.result.then(function(data) {
      vm.data.location.reviews.push(data);
    });
  };
}

})();
