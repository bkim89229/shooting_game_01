// main 함수 시작 시간 (함수 밖에서 선언)
export let startTime = new Date();

//시간측정 함수
export function checkElapsedTime() {
  var currentTime = new Date();
  var elapsedTime = (currentTime - startTime) / 1000; // 밀리초 -> 초 변환
  return elapsedTime;
}
