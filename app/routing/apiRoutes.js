//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
var friendList = require("../data/friends");

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get("/api/friends", function(req,res){
    res.json(friendList);
  });

  app.post("/api/friends", function(req,res){
    //grabs the new friend's scores to compare with friends in friendList array
    var newScores = req.body.scores;
    var scoreArray = [];
    var friendCount = 0;
    var friendMatch = 0;

    //Runs current friends in list
    for(var i=0; i<friendList.length; i++){
      var diffscore = 0;
    
      for(var j=0; j<newScores.length; j++){
        diffScore += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newScores[j])));
      }

      //Push results 
      scoreArray.push(diffScore);
    }

    //Find best match
    for(var i=0; i<scoreArray.length; i++){
      if(scoreArray[i] <= scoreArray[friendMatch]){
        friendMatch = i;
      }
    }

    //Return data
    var bestFriend = friendList[friendMatch];
    res.json(bestFriend);

    //Pushes new submission 
    friendList.push(req.body);
  });
};