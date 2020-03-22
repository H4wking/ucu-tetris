document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case DOWN:
      moveDown();
      break;
    case LEFT:
      moveRight();
      break;
    case RIGHT:
      moveLeft();
      break;
    case PAUSE:
      pauseGame();
      break;
    default:
      break;
  }
});