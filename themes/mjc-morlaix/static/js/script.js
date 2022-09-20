// Menu
let links = document.getElementsByClassName("link");

function openNav() {
  document.getElementById("nav__menu").style.width = "200px";
  document.getElementById("nav__menu").ariaHidden = "false";
  document.getElementById("close").tabIndex = "1";
  document.querySelectorAll(".nav__link-focus")
    .forEach(elem => {
      elem.setAttribute("tabindex", "1")
    })
}

function closeNav() {
  document.getElementById("nav__menu").style.width = 0;
  document.getElementById("nav__menu").ariaHidden = "true";
  document.getElementById("close").tabIndex= "-1";
  document.querySelectorAll(".nav__link-focus")
    .forEach(elem => {
      elem.setAttribute("tabindex", "-1")
    })

}

document.getElementById("open").addEventListener("click", openNav);

document.getElementById("close").addEventListener("click", closeNav);

for (var j = 0; j < links.length; j++) {
  links[j].addEventListener("click", function () {
    closeNav();
  });
}

//Carousel
$(document).ready(function () {
  $(".carousel__wrapper").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2600,
  });
});

//Player audio

//https://blog.shahednasser.com/how-to-style-an-audio-element/#styling-a-custom-audio-player

// Timeline and Play/Pause Buttons
const timeline = document.querySelector(".timeline");
const playerButton = document.querySelector(".player-button"),
  audio = document.querySelector("audio"),
  playIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1b3f47">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>
      `,
  pauseIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
      `;

// Play/Pause
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playerButton.innerHTML = pauseIcon;
    playerButton.ariaLabel = "Pause";
  } else {
    audio.pause();
    playerButton.innerHTML = playIcon;
    playerButton.ariaLabel = "Play";
  }
}

playerButton.addEventListener("click", toggleAudio);

// Audio ending
function audioEnded() {
  playerButton.innerHTML = playIcon;
  playerButton.ariaLabel = "Play";
}

audio.onended = audioEnded;

// Update timeline
function changeTimelinePosition() {
  const percentagePosition = (100 * audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}

audio.ontimeupdate = changeTimelinePosition;

function changeSeek() {
  const time = (timeline.value * audio.duration) / 100;
  audio.currentTime = time;
}

timeline.addEventListener("change", changeSeek);

// Sound/Mute Buttons
const soundButton = document.querySelector(".sound-button"),
  soundIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
</svg>`,
  muteIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>`;

// Toggle sound
function toggleSound() {
  audio.muted = !audio.muted;
  soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
  soundButton.ariaLabel = audio.muted ? "Muted" : "Unmuted";
}

soundButton.addEventListener("click", toggleSound);
