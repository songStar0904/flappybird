var can;
var ctx;

var w = window.screen.availWidth;
var h = window.screen.availHeight - 50;

var landH;
var bgWidth;
var bgHeight;

var bg1 = new Image();
var bg2 = new Image();
var atlas = new Image();
var scoreImgSingle = new Image();
var scoreImgTen = new Image();

var bird = new birdObj();
var land = new landObj();
//var pipe = new pipe();
var pies;
var spd;
var dy;
var canClick;
var gameover;
var canCount;
var score;
var timer;

var isStarted;
var isShow;

var date=new Date();
$(function() {
    atlas.src = 'img/atlas.png';
    prepareForMobile();
    Start();
});

function prepareForMobile() {
    if (w > 414) {
        w = 400;
        h = 600;
    }
    $(".box").css("width", w);
    $(".box").css("height", h);
    canvas.width = w;
    canvas.height = h;
    landH = h / 10;
    bgWidth = w;
    bgHeight = h - landH;
}

function Start() {
    can = document.getElementById("canvas");
    ctx = can.getContext('2d');
    bird.init();
    bird.t = 0;
    pies = [];
    score = 0;
    spd = 1.8; //水管移动速度
    canClick = true;
    gameover = false;
    canCount = true;
    isStarted = false;
    isShow = false;
    creatPipe();
    gameLoop();
}

function gameLoop() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(gameLoop);
    //console.log(timer);
    fillCanvas();
    drawLand();
    drawBird();
    if (isStarted) {
        drawPipe();
        //console.log(pies);
    } else {
        drawReady();
    }
    drawScore(w / 2 - w / 9 / 2, h / 20, w / 10, h / 10);
    check(bird);
    gameOver();
    //console.log(landH); 
}

function fillCanvas() {
    var bgX;
    if(date.getHours>=6&&date.getHours()<18)
        bgX=0;
else {
    bgX=290;
}
    
    ctx.drawImage(atlas, bgX, 0, 288, 510, 0, 0, bgWidth, bgHeight);
}

function drawBird() {
    bird.draw();
}

function drawPipe() {
    //console.log(pies);
    //console.log(pies.length);
    for (var i = 0; i < pies.length; i++) {
        drawP(i);
    }

}

function drawLand() {
    //console.log(0,bgHeight,w,landH,584,0,bgWidth,landH);
    land.draw(landH);

}

document.ontouchstart = document.onmousedown = function(e) {

        isStarted = true;
        //console.log(isStarted);
        if (isStarted)
            if (canClick) {
                $("#wing")[0].play();
                bird.t = 0;
            }
            //在ios客户端，touch事件之后还会触发click事件，阻止默认事件就可以屏蔽了
        var e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

    }
    // document.addEventListener("click",function(e){
    //    //点击屏幕时小鸟进行跳跃等处理
    //          isStarted = true;
    //    //console.log(isStarted);
    //    if (isStarted)
    //        if (canClick) {
    //            $("#wing")[0].play();
    //            bird.t = 0;
    //        }
    //        //在ios客户端，touch事件之后还会触发click事件，阻止默认事件就可以屏蔽了
    //    var e = e || window.event;
    //    if(e.preventDefault){
    //        e.preventDefault();
    //    }else{
    //        e.returnValue = false;
    //        }
    //        },false);

function gameOver() {
    if (gameover) {
        spd = 0;
        canClick = false;
        gameOverAnimation();
    }
}
var overY = -h / 10;
var startY = h;

function gameOverAnimation() {
    if (overY > h / 6) {
        overY = h / 6;
        ctx.drawImage(atlas, 6, 518, 226, 114, w / 8, h / 2.6, w * 6 / 8, h / 4.5); //绘制计分板
        drawScore(w / 8 + w * 6 / 8 * 4 / 5, h / 2.6 + h / 4.5 / 4, w * 6 / 8 / 14, h / 4.5 / 4); //绘制计分 板上的分数
        if (startY < h / 1.4) {
            startY = h / 1.4;
            isShow = true;
            cancelAnimationFrame(timer); //停止动画
            canvas.addEventListener('click', function(e) {
                if (isShow && isInPath(e.offsetX, e.offsetY)) {
                    ctx.clearRect(0, 0, w, h);
                    overY = -h / 10;
                    startY = h;
                    Start();
                    //ctx.scale(1.5,1.5);
                    //ctx.drawImage(atlas,707,235,112,58,w/8,startY,(w*6/8/2-w*6/8/25)*1.5,h/9*1.5);
                }
            });
        }
        //var ctx1=can.getContext('2d');
        ctx.drawImage(atlas, 707, 235, 112, 58, w / 8, startY, w * 6 / 8 / 2 - w * 6 / 8 / 25, h / 9); //绘制重新开始
        ctx.drawImage(atlas, 828, 235, 112, 58, w - w / 8 - w * 6 / 8 / 2 + w * 6 / 8 / 25, startY, w * 6 / 8 / 2 - w * 6 / 8 / 25, h / 9); //绘制排行榜
        startY -= 12;
    }

    ctx.drawImage(atlas, 789, 117, 192, 43, w / 5, overY, w / 5 * 3, h / 10); //绘制Game Over
    overY += 12;
}


function drawReady() {
    //console.log("a");
    ctx.drawImage(atlas, 589, 118, 184, 50, w / 5, h / 6, w / 5 * 3, h / 10);
    ctx.drawImage(atlas, 584, 181, 114, 98, w / 3, h / 2.43, w / 3, h / 5);
}

function isInPath(x, y) {
    //console.log(x, y);
    ctx.rect(w / 8, h / 1.4, w * 6 / 8 / 2 - w * 6 / 8 / 25, h / 9); //设置重新开始的位置
    return ctx.isPointInPath(x, y); //判断点击的坐标是否在重新开始的位置上  返回true

}

function drawScore(canX, canY, canW, canH) {
    if (score >= 10) {
        var Ten = Math.floor(score / 10);
        var Single = score % 10;
        scoreImgTen.src = 'img/' + Ten + '.png';
        ctx.drawImage(scoreImgTen, 0, 0, 24, 44, canX - canW, canY, canW, canH);
        scoreImgSingle.src = 'img/' + Single + '.png';
        ctx.drawImage(scoreImgSingle, 0, 0, 24, 44, canX, canY, canW, canH);
    } else {
        scoreImgSingle.src = 'img/' + score + '.png';
        //console.log(score);
        ctx.drawImage(scoreImgSingle, 0, 0, 24, 44, canX, canY, canW, canH);
    }
}
