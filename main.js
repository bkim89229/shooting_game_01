//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,
  startImage,
  spaceshipImage,
  bulletImage,
  enemyImage,
  gameOverImage,
  retryButtonImage;

//시작종료 & 스테이지(개인적으로 추가한 부분)
let score = 0;
let currentStage = 1;
let scoreForNextStage = 5;
let gameOver = false; //true 게임끝, false 킵고잉

// main 함수 시작 시간 (함수 밖에서 선언)
let startTime = new Date();

//시간측정 함수
function checkElapsedTime() {
  var currentTime = new Date();
  var elapsedTime = (currentTime - startTime) / 1000; // 밀리초 -> 초 변환
  return elapsedTime;
}

//우주선 좌표
let spaceshipX = canvas.width / 2 - 24;
let spaceshipY = canvas.height - 48;

//총알
let bulletList = []; //총알 저장 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 14;
    this.y = spaceshipY;
    this.alive = true; // true 총알생존, false 총알소멸??
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;

    // 화면상단 벗어난 총알 비활성화(개인적으로 추가한 부분)
    if (this.y < 0) {
      this.alive = false;
    }
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40 //40은 적군 이미지 크기
      ) {
        score++; //총알&적군 소멸 -> 점수획득
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

//적군의 초기 속도/이미지를 전역 변수로 선언
let enemySpeed = 2;
let enemyImageSrc = "images/enemy.png";

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48); // 우주선 가로값 48
    enemyList.push(this);
  };
  this.update = function () {
    this.y += enemySpeed; // 적군 속도 조절 (개인적으로 수정한 부분, 스테이지 변경위해 전역변수 사용함)

    if (this.y >= canvas.height - 40) {
      // 우주선 세로값 48인데 화면 바닥에 적군이 닿으려면 40
      gameOver = true;
    }
  };
}

//이미지 로드
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

  startImage = new Image();
  startImage.src = "images/start.png";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = enemyImageSrc;

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.png";

  retryButtonImage = new Image();
  retryButtonImage.src = "images/retry.png";
}

// 게임 상태 초기화
function restartGame() {
  gameOver = false;
  score = 0;
  spaceshipX = canvas.width / 2 - 24;
  spaceshipY = canvas.height - 48;
  bulletList = [];
  enemyList = [];

  requestAnimationFrame(main); // 게임 재시작
}

// 스테이지 클리어 확인
function checkStageClear() {
  if (score >= scoreForNextStage) {
    currentStage++;
    scoreForNextStage += scoreForNextStage * 2; // 해당코드추가 -> 스테이지별 이미지&속도 변경 가능해짐 -> 왜???
    goToNextStage();
  }
}

// 스테이지 클리어 시 액션 구현
function goToNextStage() {
  enemySpeed++; //적군 속도 증가

  // 스테이지 클리어 시 적군 이미지 변경
  switch (currentStage) {
    case 2:
      enemyImageSrc = "images/enemy_stage2.png";
      break;
    case 3:
      enemyImageSrc = "images/enemy_stage3.png";
      break;
    default:
      enemyImageSrc = "images/enemy.png"; // 초기이미지
  }

  // 적군 이미지 새로 로드
  enemyImage = new Image();
  enemyImage.src = enemyImageSrc;
}

//마우스
function setupMouseListeners() {
  canvas.addEventListener("click", function (event) {
    if (gameOver) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

       console.log(x, y); // 클릭된 좌표 출력

      // 재시도 버튼 영역 내 클릭인지 확인
      if (x > canvas.width - 60 && x < canvas.width - 10 && y > 10 && y < 60) {
        restartGame();
      }
    }
  });
}

//키보드
let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    //스페이스바 누르고 있을때
    keysDown[event.keyCode] = true;
  });

  document.addEventListener("keyup", function (event) {
    //스페이스바 안 누름
    delete keysDown[event.keyCode];

    if (event.keyCode == 32) {
      createBullet(); // 총알생성
    }
  });
}

//총알생성 - 단순화 위해 클래스 대신 함수 사용
function createBullet() {
  let b = new Bullet(); // 한 개 생성!
  b.init();
}

//적군생성 - setInterval(호출하고싶은 함수, 시간)
function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1200); // 1000 -> 1초를 의미
}


function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];

    if (event.keyCode == 32) {
      createBullet();
    }
  });
}


function update() {
  if (39 in keysDown) {
    //right
    spaceshipX += 5; //우주선 속도 조절
  }
  if (37 in keysDown) {
    // left
    spaceshipX -= 5;
  }

  //우주선 좌표값이 무한대로 업데이트되는걸 막으려면
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 48) {
    spaceshipX = canvas.width - 48; //- 48 : 배경이미지 밖에서 그려지는 것 방지
  }

  // 총알 y좌표 업뎃하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    // 이 조건이 없다면, 화면상에서 적군과 충돌한 총알이 사라져도
    // 계속 적용되어서 적군1 다음에 등장하는 적군2도 사라지는 오류 발생
    if (bulletList[i].alive) {
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
  ctx.fillText(`Score:${score}`, 5, 20);
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
    checkStageClear(); // 점수 & 스테이지 클리어 체크
    render(); //그려주고
    if (checkElapsedTime() < 1) {
      ctx.drawImage(startImage, 25, 250, 350, 200);
    }
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 150, 380, 380);
    // ctx.fillText("Retry", canvas.width - 55, 20); // 캔버스 우측 상단에 위치
    ctx.drawImage(
      retryButtonImage,
      canvas.width - 60, // 캔버스 너비에서 버튼 너비를 뺀 값
      10, // 상단 모서리에 위치 (y = 0)
      50,
      50
    ); // 버튼 위치 조정
  }
}

loadImage();
setupMouseListeners();
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
