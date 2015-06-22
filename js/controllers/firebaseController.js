app.controller("FirbaseCtrl", function($scope, $firebaseObject) {
  var ref = new Firebase("https://careermap.firebaseio.com");
  // download the data into a local object
  $scope.data = $firebaseObject(ref);

  $scope.data.$loaded()
  .then(function() {
    console.log($scope.data);
  })
  .catch(function(err) {
    console.error(err);
  });
});