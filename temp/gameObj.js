import { score } from "./gameStateMgmt.js";

//우주선 좌표
export let spaceshipX = canvas.width / 2 - 24;
export let spaceshipY = canvas.height - 48;

export let bulletList = []; //총알 저장 리스트
export let enemyList = []; //적군 저장 리스트

//적군의 초기 속도/이미지를 전역 변수로 선언
export let enemySpeed = 2;
export let enemyImageSrc = "images/enemy.png";

//총알
export function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 14;
    this.y = spaceshipY;
    this.alive = true; // true 총알생존, false 총알소멸??
    bulletList.push(this);
  };
  this.updateObjects = function () {
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

//총알생성 - 단순화 위해 클래스 대신 함수 사용
export function createBullet() {
  let b = new Bullet(); // 한 개 생성!
  b.init();
}

//적군
export function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48); // 우주선 가로값 48
    enemyList.push(this);
  };
  this.updateObjects = function () {
    this.y += enemySpeed; // 적군 속도 조절 (개인적으로 수정한 부분, 스테이지 변경위해 전역변수 사용함)

    if (this.y >= canvas.height - 40) {
      // 우주선 세로값 48인데 화면 바닥에 적군이 닿으려면 40
      gameOver = true;
    }
  };
}

export function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; //최대최소값 안에서 랜덤값 얻는 방법
  return randomNum;
}

//적군생성 - setInterval(호출하고싶은 함수, 시간)
export function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1200); // 1000 -> 1초를 의미
}

export function updateObjects() {
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
      bulletList[i].updateObjects();
      bulletList[i].checkHit();
    }
  }

  // 우주선 y좌표 업뎃하는 함수 호출
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].updateObjects();
  }
}
