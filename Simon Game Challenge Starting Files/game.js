var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level= 0;
var started=false;

//Function to play a particular sound file.
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//This function is being called,at the beggining of each level,to provide a new colour code for the sequence.
function nextSequence()
{
  level ++;
  //To change the h1 to the new level.
  $("#level-title").html("Level "+level);
  //To create a random number between [0,3].
  var randomNumber=Math.floor(Math.random()*4);
 var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
//To give a special effect to the button chosen by the system,for the user to know.
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

//This function is called when a button is clicked by the user.
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

//To add an animation to an element.
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");}
        , 100);
  }

//This function is called at a keypress,only at the beggining of the game.Once the game beggins,a keypress does not triggers this function.
  $(document).keypress(function(){
    if(started===false){
      $("#level-title").html("Level "+level);
        nextSequence();
        started=true;
    }});

//This function is called at each level,to decide whether the user won or lost a level and hence for the system to proceed accordinglly.
    function checkAnswer(currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          //At a particular level when the user is done with the final sequence,then this condition decides whether it lost or won.
  if (userClickedPattern.length === gamePattern.length){
    userClickedPattern=[];
    setTimeout(function () {
      nextSequence();
    }, 1000); }
}
  else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");}
        , 200);
          $("h1").html("Game Over,press any key to restart the game!");
          startOver();
       }}

//This function is called to refresh the conditions in order to restart the game.
       function startOver(){
          gamePattern=[];
          userClickedPattern=[];
          level= 0;
          started=false;

       }
