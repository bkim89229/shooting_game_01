import { spaceshipX, spaceshipY, bulletList, enemyList } from "./gameObj.js";

//시작종료 & 스테이지(개인적으로 추가한 부분)
export let score = 0;
export let currentStage = 1;
export let scoreForNextStage = 5;
export let gameOver = false; //true 게임끝, false 킵고잉

// 스테이지 클리어 확인
export function checkStageClear() {
  if (score >= scoreForNextStage) {
    currentStage++;
    scoreForNextStage += scoreForNextStage * 2; // 해당코드추가 -> 스테이지별 이미지&속도 변경 가능해짐 -> 왜???
    goToNextStage();
  }
}

// 스테이지 클리어 시 액션 구현
export function goToNextStage() {
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

// 재시도 -> 게임 상태 초기화
export function restartGame() {
  gameOver = false;
  score = 0;
  spaceshipX = canvas.width / 2 - 24;
  spaceshipY = canvas.height - 48;
  bulletList = [];
  enemyList = [];

  requestAnimationFrame(main); // 게임 재시작
}
