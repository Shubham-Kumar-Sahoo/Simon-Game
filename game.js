buttonColors=["red","blue","green","yellow"];
gamePattern=[];
userClickedPattern=[];
level=0;

function nextSequence(){
    userClickedPattern=[];
    randomNumber=Math.floor(Math.random()*4);
    randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);
    $("h1").text("Level "+(++level));
}

$(".btn").click(function(){
    userChoosenButton=$(this).attr("id");
    userClickedPattern.push(userChoosenButton);
    console.log(userClickedPattern);
    playSound(userChoosenButton);
    animatePress(userChoosenButton);
    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(color){
    switch(color){
        case "red": audio= new Audio("./sounds/red.mp3");
                audio.play();
                break;
        case "blue": audio= new Audio("./sounds/blue.mp3");
                audio.play();
                break;
        case "green": audio= new Audio("./sounds/green.mp3");
                audio.play();
                break;
        case "yellow": audio= new Audio("./sounds/yellow.mp3");
                audio.play();
                break;
        default: console.log(randomChoosenColor);
    }
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

$(document).keydown(function(){
    nextSequence();
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(nextSequence(),1000);
        }
    }
    else{
        console.log("failure");
        audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("h1").html("Game Over !<br>Press Any Key to Restart");
        startAgain();
    }
}

function startAgain(){
    level=0;
    gamePattern=[];
}