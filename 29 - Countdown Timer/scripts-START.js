let countdown;
const displayTimer = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

/**
 * [timer description]
 * @param  {[type]} secs Seconds passed by the user
 * @return {[type]}      [description]
 */
function timer(secs) {
  /**
   * Clearing any existing intervals
   * @param  {[type]} countdown [description]
   * @return {[type]}           [description]
   */
  clearInterval(countdown);

  const now = Date.now();
  const then = now + secs * 1000;
  displayTimeLeft(secs);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secsLeft = Math.round((then - Date.now()) / 1000);

    if (secsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secsLeft);
  }, 1000);
}

/**
 * [displayTimeLeft display timer
 * @param  {[type]} secs seconds given
 * @return {[type]}      [description]
 */
function displayTimeLeft(secs) {
  const mins = Math.floor(secs / 60);
  const remainderSecs = secs % 60;
  const display = `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;

  document.title = display;
  displayTimer.textContent = display;
}

/**
 * display when users should be back
 * @param  {[type]} timestamp Unix time
 * @return {[type]}           [description]
 */
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

/**
 * Starts countdown
 * @return {[type]} [description]
 */
function startTimer() {
  const secs = parseInt(this.dataset.time, 10);
  timer(secs);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
