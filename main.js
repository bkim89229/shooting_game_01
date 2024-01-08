//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false; //true 게임끝, false 킵고잉
let score = 0;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

//총알
let bulletList = []; //총알 저장 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 20;
    this.y = spaceshipY;
    this.alive = true; // true 총알생존, false 총알소멸??
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40
      ) {
        score++;  //총알&적군 소멸 -> 점수획득
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

//적군
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; //최대최소값 안에서 랜덤값 얻는 방법
  return randomNum;
}

let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48); // 우주선 가로값 48
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 4; // 적군 속도 조절

    if (this.y >= canvas.height - 48) {  // 우주선 세로값 48
      gameOver = true;
    }
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

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
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {  //스페이스바 누르고 있을때
    keysDown[event.keyCode] = true;
  }); 
  
  document.addEventListener("keyup", function (event) {  //스페이스바 안 누름
    delete keysDown[event.keyCode];

    if (event.keyCode == 32) {
      createBullet(); // 총알생성
    }
  });
}

function createBullet() {  // 단순화 위해 클래스 대신 함수 사용
  let b = new Bullet();  // 총알 하나 생성
  b.init();
}

function createEnemy() {
  const interval = setInterval(function () {  //적군생성 함수 --- setInterval(호출하고싶은 함수, 시간)
    let e = new Enemy();
    e.init();
  }, 1000); // 1000 -> 1초를 의미
}

function update() {
  if (39 in keysDown) {  //right
    spaceshipX += 5; //우주선 속도 조절
  } 
  if (37 in keysDown) {  // left
    spaceshipX -= 5;
  } 

  //우주선 좌표값이 무한대로 업데이트되는걸 막으려면
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64; //- 64 : 배경이미지 밖에서 그려지는 것 방지
  }

  // 총알 y좌표 업뎃하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    // 이 조건이 없다면, 화면상에서 총알이 사라져도 계속 적용되어서 적군1 뒤에 오는 적군2도 사라지는 오류 발생
    if (bulletList[i.alive]) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  // 우주선 y좌표 업뎃하는 함수 호출
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`, 20, 20);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update(); // 좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();



/* 코드 작성시 고려사항 */
// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다

/* 총알 제작 */
//1. 스페이스바를 누르면 발사
//2. 발사 = 총알 y값이 --, 총알 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 배열에 저장
//4. 총알은 x,y 좌표값이 있어야 한다
//5. 총알 배열을 가지고 render
// ** 해당 코드에서는 클래스 대신 함수를 사용

/* 적군 특징 */
//1. 귀엽다 / x,y좌표, init, update
//2. 위치가 랜덤
//3. 밑으로 내려온다 -> y좌표가 증가한다
//4. 1초마다 적군 하나씩 등장
//5. 적군 우주선이 화면 바닥에 닿으면 게임오버
//6. 적군과 총알이 만나면 우주선이 사라짐 -> 1점 획득

/* 적군이 죽는다 */
// 총알.y <= 적군.y
// 총알.x >= 적군.x && 총알.x <= 적군.x + 적군의 넓이
// -> 닿았다 -> 총알&적군 없어짐 -> 점수획득


