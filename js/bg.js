const body = document.querySelector('body');

const IMG_NUMBER = 7;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `wallpaper/${imgNumber + 1}.jpg`;
  image.classList.add('bgImg');
  body.appendChild(image);
}

function generatorRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomeNum = generatorRandom();
  paintImage(randomeNum);
}

init();
