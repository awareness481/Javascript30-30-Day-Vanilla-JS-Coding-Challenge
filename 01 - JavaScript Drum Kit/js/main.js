function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
}

function removeTransform(e) {
  if (e.propertyName == "transform") {
    this.classList.remove("playing");
  }
}


const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransform));
window.addEventListener('keydown', playSound);
