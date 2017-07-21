//Grabbing elements
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fs = player.querySelector(".fullscreen");

//Functions
function togglePlay() {
  if(video.paused) video.play();
  else video.pause();
}

function updateButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

// Uing flex-basis for the progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function toggleVideo(e) {
  console.log(e);
  if (e.key && e.code != "KeyF") return 1;


  //Exit Fullscreen
  if (document.fullscreenElement) {
      document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
  } else if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
  //Enter Fullscreen
  } else if (player.mozRequestFullScreen) {
    player.mozRequestFullScreen();
  }
  else if (player.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  }
  else {
    player.requestFullscreen();
  }
}

//Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", rangeUpdate));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mouseDown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);
//make sure mouseDown is true
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));

//fullscreen event
fs.addEventListener("click", toggleVideo);
document.addEventListener("keypress", toggleVideo);
