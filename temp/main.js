import { ctx, loadImage, retryButtonImage, render } from "./rendering.js";
import { createEnemy, updateObjects } from "./gameObj.js";
import { gameOver, checkStageClear } from "./gameStateMgmt.js";
import { setupKeyboardListener, setupMouseListeners } from "./eventHandlers.js";
import { checkElapsedTime } from "./utility.js";

function main() {
  if (!gameOver) {
    updateObjects(); // 좌표값을 업데이트하고
    checkStageClear(); // 점수 & 스테이지 클리어 체크
    render(); //그려주고
    if (checkElapsedTime() < 1) {
      ctx.drawImage(startImage, 25, 250, 350, 200);
    }
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 150, 380, 380);
    ctx.drawImage(
      retryButtonImage,
      canvas.width - 60, // 캔버스 너비에서 버튼 너비를 뺀 값
      10, // 상단 모서리에 위치 (y = 0)
      50,
      50
    ); // 버튼 위치 조정
  }
}

// 이미지 로드, 이벤트 리스너 설정, 게임 시작
loadImage();
setupKeyboardListener();
setupMouseListeners();
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
//1. 귀엽다 / x,y좌표, init, updateObjects
//2. 위치가 랜덤
//3. 밑으로 내려온다 -> y좌표가 증가한다
//4. 1초마다 적군 하나씩 등장
//5. 적군 우주선이 화면 바닥에 닿으면 게임오버
//6. 적군과 총알이 만나면 우주선이 사라짐 -> 1점 획득

/* 적군이 죽는다 */
// 총알.y <= 적군.y
// 총알.x >= 적군.x && 총알.x <= 적군.x + 적군의 넓이
// -> 닿았다 -> 총알&적군 없어짐 -> 점수획득
