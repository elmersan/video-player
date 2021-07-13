const $video = document.querySelector("#video");
const $play = document.querySelector("#play");
const $pause = document.querySelector("#pause");
const $backward = document.querySelector("#backward");
const $forward = document.querySelector("#forward");
const $progress = document.querySelector("#progress");
const $fullscreen = document.querySelector("#fullscreen");
const $minscreen = document.querySelector("#minscreen");
const $videoContent = document.querySelector("#video-content");
const $playerOverlay = document.querySelector("#player-overlay");
let controlsTimeout;

$play.addEventListener("click", handlePlay);
$pause.addEventListener("click", handlePause);
$backward.addEventListener("click", handleBackward);
$forward.addEventListener("click", handleFarward);
$video.addEventListener("loadermetadata", handleLoaded);
$video.addEventListener("timeupdate", handleTimeUpdate);
$progress.addEventListener("input", handleInput);
$fullscreen.addEventListener("click", handleFullscreen);
$minscreen.addEventListener("click", handleMinscreen);

function handlePlay() {
  $video.play();
  $play.hidden = true;
  $pause.hidden = false;
}
function handlePause() {
  $video.pause();
  $play.hidden = false;
  $pause.hidden = true;
}

function handleBackward() {
  $video.currentTime -= 10;
}
function handleFarward() {
  $video.currentTime += 10;
}

function handleLoaded() {
  $progress.max = $video.duration;
}
function handleTimeUpdate() {
  $progress.value = $video.currentTime;
}

function handleInput() {
  $video.currentTime = $progress.value;
}

// display controllers
const displayControls = () => {
  $playerOverlay.style.opacity = "1";
  $playerOverlay.style.cursor = "initial";

  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    $playerOverlay.style.opacity = "0";
    $playerOverlay.style.cursor = "none";
  }, 3000);
};

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    $fullscreen.hidden = false;
    $minscreen.hidden = true;
  } else {
    $fullscreen.hidden = true;
    $minscreen.hidden = false;
  }
});

function handleFullscreen() {
  $fullscreen.hidden = true;
  $minscreen.hidden = false;

  if (!document.fullscreenElement) {
    $videoContent.requestFullscreen();
    displayControls();
  } else {
    document.exitFullscreen();
  }
}

$videoContent.addEventListener("mousemove", displayControls);

function handleMinscreen() {
  $fullscreen.hidden = false;
  $minscreen.hidden = true;
  document.exitFullscreen();
}
