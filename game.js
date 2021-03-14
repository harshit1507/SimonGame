var gamePattern = [];
var userClickedPatern = [];
var buttonColor = ["red","blue","green","yellow"];
var level = 0;
var started = false;
$("h1").text("Press A key to Start");
function nextSequence() 
{
    userClickedPatern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(randomChoosenColor);
    playSound(randomChoosenColor);    
}

// $(".btn").click(function(){
$(".btn").on("click",function() {
    var userChosenColor = $(this).attr("id");
    userClickedPatern.push(userChosenColor);
    // console.log(userClickedPatern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPatern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {$("#"+currentColor).removeClass("pressed")},100);
}

$(document).on("keydown", function() {
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started = true;   
    }    
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPatern[currentLevel])
    {
        console.log("success");

        if(gamePattern.length === userClickedPatern.length)
        {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}