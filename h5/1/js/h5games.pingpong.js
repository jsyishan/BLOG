

var pingpong = {
    scoreA : 0,
    scoreB : 0
}
pingpong.pressedKeys = [];

pingpong.KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

$(function() {
    pingpong.timer = setInterval(gameloop,30);

    $(document).keydown(function(e) {
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e) {
        pingpong.pressedKeys[e.which] = false;
    });
});

function gameloop() {
    moveBall();
    movePaddles();
}

function movePaddles() {
    if(pingpong.pressedKeys[pingpong.KEY.UP]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top - 5);
    }
    if(pingpong.pressedKeys[pingpong.KEY.DOWN]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top + 5);
    }
    if(pingpong.pressedKeys[pingpong.KEY.W]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top - 5);
    }
    if(pingpong.pressedKeys[pingpong.KEY.S]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top + 5);
    }
}

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}

function moveBall() {
    //Some variables
    var pgWidth = parseInt($("#playground").width());
    var pgHeight = parseInt($("#playground").height());
    var ball = pingpong.ball;
    //CheckPlayground
    //Buttom
    if(ball.y + ball.speed * ball.directionY > (pgHeight - 13)) {
        ball.directionY = -1;
    }
    //Top
    if(ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }



    //Right
    if(ball.x + ball.speed * ball.directionX > pgWidth) {
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
        ball.directionX = -1;
    }
    //Left
    if(ball.x + ball.speed * ball.directionX < 0) {
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
        ball.directionX = 1;
    }



    //Move init
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    //Check Paddles
    //PaddleA
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYButtom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if(ball.x + ball.speed * ball.directionX < paddleAX) {
        if(ball.y + ball.speed * ball.directionY <= paddleAYButtom && ball.y + ball.speed * ball.directionY >= paddleAYTop) {
            ball.directionX = 1;
        }
    }
    //PaddleB
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYButtom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if(ball.x + ball.speed * ball.directionX >= paddleBX) {
        if(ball.y + ball.speed * ball.directionY <= paddleBYButtom && ball.y + ball.speed * ball.directionY >= paddleBYTop) {
            ball.directionX = -1;
        }
    }

    //Move
    $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
}