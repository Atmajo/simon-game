btnCl = ["red","green","yellow","blue"]
gamePAt = []
userClickedPattern = []
started=false
level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){

    var usrChosenCl = $(this).attr("id");
    userClickedPattern.push(usrChosenCl);

    playSound(usrChosenCl);

    animatePress(usrChosenCl);

    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){
  if(gamePAt[currentLevel]==userClickedPattern[currentLevel]){
    console.log("Success");
    if(gamePAt.length == userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong");

    playSound("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  rndCl = Math.floor(Math.random() * 4);
  randomChosenColour = btnCl[rndCl];

  gamePAt.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
  
}

function startOver(){
  level=0;
  started=false;
  gamePat = [];
  userClickedPattern = [];
}
