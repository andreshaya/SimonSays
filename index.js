// Color Variables
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

// Key Press Event
$(document).keypress(function(e) {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Sequence Generator
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber]);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

// User Button Click
$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    animatePress(userChoosenColor);
    playSound(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
});
// Sound Queues
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// User Button Press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Check User Clicks Match Game Pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    console.log(userClickedPattern.length + " " + gamePattern.length);
}

// Restart Game
function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
}

