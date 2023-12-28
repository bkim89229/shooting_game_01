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

let keysDown = {};
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
    }); //스페이스바 누르고 있을때
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];

        if(event.keyCode == 32){
            createBullet() // 총알생성

        }
    }); 
}

function createBullet(){
    
}

function update(){
    if(39 in keysDown){
        spaceshipX += 5; //우주선 속도 조절
    } //right
    if(37 in keysDown){
        spaceshipX -= 5;
    } // left

    //우주선 좌표값이 무한대로 업데이트되는걸 막으려면
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64; //- 64 : 배경이미지 밖에서 그려지는 것 방지
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main(){
    update(); // 좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 방향키를 누르면 
// 우주선의 xy 좌표가 바뀌고 
// 다시 render 그려준다

//총알 제작
//1. 스페이스바를 누르면 발사
//2. 발사 = 총알 y값이 --, 총알 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 배열에 저장
//4. 총알은 x,y 좌표값이 있어야 한다
//5. 총알 배열을 가지고 render
// * 여기서는 클래스 대신 함수로 사용한다 