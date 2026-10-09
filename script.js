```javascript
"use strict";

const BIRTHDAY_TIME = new Date(
  "2026-10-10T00:00:00+05:30"
).getTime();

const countdownScreen = document.getElementById("countdownScreen");
const birthdayExperience = document.getElementById("birthdayExperience");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const music = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

const cakeButton = document.getElementById("cakeButton");
const wishMessage = document.getElementById("wishMessage");
const relightButton = document.getElementById("relightButton");

let countdownInterval = null;
let birthdayShown = false;
let musicIsPlaying = false;


/* Check the date and display the correct experience */

function updateBirthdayExperience() {
  const now = Date.now();

  if (now >= BIRTHDAY_TIME) {
    showBirthdayExperience();
    return;
  }

  showCountdown(now);
}


function showCountdown(now) {
  const remaining = BIRTHDAY_TIME - now;

  if (remaining <= 0) {
    showBirthdayExperience();
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}


function showBirthdayExperience() {
  if (birthdayShown) return;

  birthdayShown = true;

  if (countdownInterval !== null) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  countdownScreen.hidden = true;
  birthdayExperience.hidden = false;

  document.body.classList.remove("locked");

  // Start at the beginning of the birthday page.
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}


/* Start countdown immediately */

updateBirthdayExperience();

if (!birthdayShown) {
  countdownInterval = setInterval(updateBirthdayExperience, 1000);
}


/* Music controls */

async function toggleMusic() {
  if (musicIsPlaying) {
    music.pause();
    musicIsPlaying = false;
    updateMusicButton();
    return;
  }

  try {
    await music.play();

    musicIsPlaying = true;
    updateMusicButton();
  } catch (error) {
    musicIsPlaying = false;
    updateMusicButton();

    musicLabel.textContent = "Add music.mp3";
    console.warn(
      "Music could not play. Add a valid music.mp3 file and try again.",
      error
    );
  }
}


function updateMusicButton() {
  musicIcon.textContent = musicIsPlaying ? "♫" : "♪";

  musicLabel.textContent = musicIsPlaying
    ? "Pause music"
    : "Play music";
}


musicToggle.addEventListener("click", toggleMusic);

music.addEventListener("ended", () => {
  musicIsPlaying = false;
  updateMusicButton();
});


/* Birthday cake */

cakeButton.addEventListener("click", () => {
  const alreadyBlown = cakeButton.classList.contains("blown");

  if (alreadyBlown) {
    return;
  }

  cakeButton.classList.add("blown");

  wishMessage.textContent =
    "Wish made! ✨ May this year bring you beautiful things. ♡";

  relightButton.hidden = false;
});


relightButton.addEventListener("click", () => {
  cakeButton.classList.remove("blown");

  wishMessage.textContent =
    "Close your eyes and make a wish. ♡";

  relightButton.hidden = true;
});
```
