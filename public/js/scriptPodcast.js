const podcastAudio = document.querySelectorAll(".podcast__audio"),
  podcastPlayIcon = document.querySelectorAll(".podcast__player_play"),
  podcastStopIcon = document.querySelectorAll(".podcast__player_stop"),
  podcastLoopIcon = document.querySelectorAll(".podcast__player_loop"),
  podcastLoopIconTrue = document.querySelectorAll(".podcast__player_loop-true"),
  timelines = document.querySelectorAll(".podcast__timeline");

for (let i = 0; i < podcastAudio.length; i++) {
  // Set loop to true
  podcastAudio[i].loop = true;

  // Play Pause
  podcastPlayIcon[i].addEventListener("click", function () {
    podcastAudio[i].play();
  });
  podcastStopIcon[i].addEventListener("click", function () {
    podcastAudio[i].pause();
  });

  // Loop No Loop
  podcastLoopIconTrue[i].addEventListener("click", function () {
    podcastLoopIconTrue[i].style.display = "none";
    podcastLoopIcon[i].style.display = "inline-block";
    podcastAudio[i].loop = false;
  });
  podcastLoopIcon[i].addEventListener("click", function () {
    podcastLoopIconTrue[i].style.display = "inline-block";
    podcastLoopIcon[i].style.display = "none";
    podcastAudio[i].loop = true;
  });

  // Update timeline
  function changeTimelinePosition() {
    const percentagePosition =
      (100 * podcastAudio[i].currentTime) / podcastAudio[i].duration;
    timelines[i].style.backgroundSize = `${percentagePosition}% 100%`;
    timelines[i].value = percentagePosition;
  }

  podcastAudio[i].ontimeupdate = changeTimelinePosition;

  function changeSeek() {
    const time = (timelines[i].value * podcastAudio[i].duration) / 100;
    podcastAudio[i].currentTime = time;
  }

  timelines[i].addEventListener("change", changeSeek);
}
