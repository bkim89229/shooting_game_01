//캔버스 세팅

let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width= 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.gif"

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";
    
    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.png";
}

function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        console.log("무슨 키가 눌렸어?", event.keyCode)
    })
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main(){
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 방향키를 누르면 
// 우주선의 xy 좌표가 바뀌고 
// 다시 render 그려준다
