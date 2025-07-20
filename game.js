var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [ ];

var userClickedPattern = [ ];

 var started = false;
  var level = 0;
  $(document).on("keydown",function(){
    if(!started){
      $("#level-title").text( "level " + level);
      nextSequence();
      started = true;
    }
  });

 //my clicked colour
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id"); //my clicked colur
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
    playSound(userChosenColour);//passing parameter values
    animatePress(userChosenColour);
    

    console.log(userChosenColour);
 });

 function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    //if answer is right then atart the next sequence with the recent answer like: red,green...
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    } 
  } 
  else {
    console.log("Wrong");
    playSound("wrong");
    //wrong answer background effect by adding class
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
     setTimeout(function(){
      $("body").removeClass("game-over");
     }, 200);

     startOver();
  }
 };

 //animated when i click a botton
   function animatePress(currentColour){
       $("#"+ currentColour).addClass("pressed");
       setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed")
       },100);
 };

 

//system guessed colour
function nextSequence() {
  userClickedPattern = [ ];

  level++;
  $("#level-title").text( "level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber]; //system clicked colur
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);

  playSound(randomChosenColour); //passing parameter value

  console.log(randomChosenColour);
  };

//Show the Sequence to the User with Animations and Sounds
//Add sound to button clicks
 function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

//resetting level and restart the game
function startOver(){
  level = 0;
  gamePattern = [ ];
  started = false;
 }

