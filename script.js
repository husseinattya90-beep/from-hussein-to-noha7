const screens = document.querySelectorAll(".screen");

const video = document.getElementById("mainVideo");

const joke1 = document.getElementById("joke1");
const joke2 = document.getElementById("joke2");
const joke3 = document.getElementById("joke3");

const videoStatus = document.getElementById("videoStatus");
const soundBtn = document.getElementById("soundBtn");

let jokeTimers = [];

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}


function startVideo() {

  showScreen("videoScreen");

  video.currentTime = 0;

  video.muted = true;

  video.play().catch(error => {
    console.log("Autoplay prevented:", error);
  });

  soundBtn.textContent = "🔇 SOUND OFF";

  startJokes();
}


function startJokes() {

  clearTimeouts();

  joke1.classList.remove("show");
  joke2.classList.remove("show");
  joke3.classList.remove("show");

  videoStatus.textContent = "ANALYZING...";

  jokeTimers.push(
    setTimeout(() => {
      joke1.classList.add("show");
    }, 2500)
  );

  jokeTimers.push(
    setTimeout(() => {
      joke1.classList.remove("show");
      joke2.classList.add("show");
    }, 6000)
  );

  jokeTimers.push(
    setTimeout(() => {
      joke2.classList.remove("show");
      joke3.classList.add("show");
    }, 9500)
  );

  jokeTimers.push(
    setTimeout(() => {
      joke3.classList.remove("show");
      videoStatus.textContent = "CONCLUSION: QUESTIONABLE";
    }, 13000)
  );
}


function clearTimeouts() {

  jokeTimers.forEach(timer => {
    clearTimeout(timer);
  });

  jokeTimers = [];
}


function toggleSound() {

  if (video.muted) {

    video.muted = false;

    soundBtn.textContent = "🔊 SOUND ON";

  } else {

    video.muted = true;

    soundBtn.textContent = "🔇 SOUND OFF";
  }
}


video.addEventListener("ended", () => {

  clearTimeouts();

  joke1.classList.remove("show");
  joke2.classList.remove("show");
  joke3.classList.remove("show");

  videoStatus.textContent = "ANALYSIS COMPLETE";

  setTimeout(() => {

    showScreen("afterVideo");

  }, 1200);

});


video.addEventListener("error", () => {

  videoStatus.textContent = "VIDEO ERROR";

});


/* Keyboard support */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    video.pause();

    showScreen("intro");

  }

});