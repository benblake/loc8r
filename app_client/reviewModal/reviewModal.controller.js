(function() {

angular
  .module('loc8rApp')
  .controller('reviewModalCtrl', reviewModalCtrl);

reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
  var vm = this;
  vm.locationData = locationData;

  vm.modal = {
    close: function(result) {
      $uibModalInstance.close(result);
    },
    cancel: function() {
      $uibModalInstance.dismiss('cancel');
    }
  };

  vm.onSubmit = function() {
    vm.formError = "";
    if (!vm.formData.rating || !vm.formData.reviewText) {
      vm.formError = "All fields required, please try again";
      return false;
    } else {
      vm.doAddReview(vm.locationData.locationid, vm.formData);
    }
  };

  vm.doAddReview = function(locationid, data) {
    loc8rData.addReviewById(locationid, {
      rating: data.rating,
      reviewText: data.reviewText
    })
    .then(function(data) {
      vm.modal.close(data);
    })
    .catch(function(e) {
      vm.formError = "Your review could not be saved, try again";
    });

    return false;
  }
}

})();
