var petFriends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(petFriends);
  });

  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name: " + userName);
    console.log("User Score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);

    console.log("Sum of users score " + sum);
    console.log("Best match pet friend diff " + bestMatch.friendDifference);
    console.log("+++++++=================++++++++++");

    for (var i = 0; i < petFriends.length; i++) {
      console.log(petFriends[i].name);
      totalDifference = 0;
      console.log("Total Diff " + totalDifference);
      console.log("Best match Pet friend diff " + bestMatch.friendDifference);

      var bfriendScore = petFriends[i].scores.reduce((a, b) => a + b, 0);
      console.log("Total friend score " + bfriendScore);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log("-------------------------> " + totalDifference);

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = petFriends[i].name;
        bestMatch.photo = petFriends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      console.log(totalDifference + " Total Difference");
    }
    console.log(bestMatch);

    petFriends.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestMatch);
  });
};