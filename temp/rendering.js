import { spaceshipX, spaceshipY, bulletList, enemyList } from "./gameObj.js";

//캔버스 세팅
export let canvas;
export let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

export let backgroundImage,
  startImage,
  spaceshipImage,
  bulletImage,
  enemyImage,
  gameOverImage,
  retryButtonImage;

//이미지 로드
export function loadImage() {
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

export function getImages() {
  return {
    backgroundImage,
    startImage,
    spaceshipImage,
    bulletImage,
    enemyImage,
    gameOverImage,
    retryButtonImage,
  };
}

export function render() {
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
