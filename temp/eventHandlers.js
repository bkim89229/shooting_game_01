import { createBullet } from "./gameObjects.js";
import { restartGame } from "./gameStateManagement.js";

//키보드
export let keysDown = {};
export function setupKeyboardListener() {
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

//마우스
export function setupMouseListeners() {
  canvas.addEventListener("click", function (event) {
    if (gameOver) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      // 재시도 버튼 영역 내 클릭인지 확인
      if (x > canvas.width - 60 && x < canvas.width - 10 && y > 10 && y < 60) {
        restartGame();
      }
    }
  });
}
