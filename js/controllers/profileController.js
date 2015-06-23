angular.module('careermap.controllers.profileController', [] ).controller("profileController", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = new Firebase("https://careermap.firebaseio.com/skills");
    ref.on("value", function(snapshot) {
      $scope.$apply(function() {
          $scope.skills = snapshot.val();
          // console.log($scope.data)
      });
    });

      var skillsURL = new Firebase("https://careermap.firebaseio.com/test"),
        usersURL = new Firebase("https://careermap.firebaseio.com/users"),
        historyURL = new Firebase("https://careermap.firebaseio.com/history");

      $scope.skillarray = $firebaseArray(skillsURL);
      $scope.historiesarray = $firebaseArray(historyURL);

      $scope.addSkills = function(skill) {
          $scope.skillarray.$add(skill);
      };
      $scope.addHistory = function(history) {
        console.log(history.startdate);
        $scope.historiesarray.$add({
          "company":  history.company,
          "start" : history.startdate.toString(),
          "end" : history.enddate.toString()
        });
      };
    
  }
]);;