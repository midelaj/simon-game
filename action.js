var buttonColours = ["red", "green", "blue", "yellow"];

var defaultPattern = [];
var userChoice = [];

var start = false;
var level = 0;


$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level)
        setSequence();
        start = true;
    }
})

$(".btn").click(function () {

    var userPattern = $(this).attr("id");
    userChoice.push(userPattern);

    playSound(userPattern);
    animatePress(userPattern);
    checkPattern(userChoice.length - 1)
})

function checkPattern(currentLevel) {
    if (userChoice[currentLevel] === defaultPattern[currentLevel]) {
        if (userChoice.length === defaultPattern.length) {
            setTimeout(function () {
                setSequence();
            }, 1000)
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("game over, Press any key to restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function setSequence() {
    userChoice = [];
    level++;
    $("#level-title").text("level " + level);
    var randumButton = Math.floor(Math.random() * 4);
    var randumChoosenColour = buttonColours[randumButton];
    defaultPattern.push(randumChoosenColour);


    $("#" + randumChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randumChoosenColour)
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    defaultPattern = [];
    start = false;
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


