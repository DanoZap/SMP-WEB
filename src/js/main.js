const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  musicAudio = wrapper.querySelector("#music-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar"),
  playlistBtn = wrapper.querySelector(".playlist"),
  showMoreBtn = wrapper.querySelector("#queue"),
  hideMusicBtn = playlistBtn.querySelector("#close");

let musicIndex = 0;

window.addEventListener("load", () => {
  loadMusic(musicIndex); // load music function called
});

// load music function
function loadMusic(indexNum) {
  musicName.innerText = allMusic[indexNum].name;
  musicArtist.innerText = allMusic[indexNum].artist;
  musicImg.src = `../assets/img/${allMusic[indexNum].img}.png`
  musicAudio.src = `./assets/music/${allMusic[indexNum].src}.mp3`;
}

//play music
function playMusic() {
  wrapper.classList.add("paused");
  musicAudio.play();
}

//pause music
function pauseMusic() {
  wrapper.classList.remove("paused");
  musicAudio.pause();
}

//next song
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

//prev song
function prevMusic() {
  musicIndex--;
  musicIndex < 0 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// play or pause button event
playPauseBtn.addEventListener("click", () => {
  const musicPause = wrapper.classList.contains("paused");
  musicPause ? pauseMusic() : playMusic();
});

const playPause = document.querySelector(".bx-play");

playPause.addEventListener("click", () => {
  playPause.classList.toggle("bx-play");
  playPause.classList.toggle("bx-pause");
});

nextBtn.addEventListener("click", () => {
  nextMusic(); // next song
});

prevBtn.addEventListener("click", () => {
  prevMusic(); // prev song
});

//update progress bar
musicAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

  musicAudio.addEventListener("loadeddata", () => {
    let audioDuration = musicAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let audioCurrentTime = musicAudio.currentTime;
  let currentMin = Math.floor(audioCurrentTime / 60);
  let currentSec = Math.floor(audioCurrentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = musicAudio.duration;

  musicAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
  let repeatAll = repeatBtn.classList.toggle("bx-shuffle");
  let repeatOne = repeatBtn.classList.toggle("bx-repeat");

  if (repeatOne == true) {
    repeatBtn.setAttribute("loop", "loop");
    repeatBtn.setAttribute("title", "repeat one");
    musicAudio.play();
  } else {
    repeatBtn.removeAttribute("loop");
    repeatBtn.setAttribute("title", "repeat all");
  }
});

musicAudio.addEventListener("ended", () => {
  musicAudio.pause();
  musicAudio.load();
  musicAudio.currentTime = 0;
  if (repeatBtn.hasAttribute("loop")) {
    musicAudio.play();
  } else {
    nextMusic();
  }
  musicAudio.play();
});

showMoreBtn.addEventListener("click", () => {
  playlistBtn.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
  showMoreBtn.click();
});

let allMusic = [
  {
    name: "01 dE ENEro",
    artist: "DUKI, Lucho SSJ",
    src: "track-1",
    img: "ada"
  },
  {
    name: "JEFES DEL SUDOESTE",
    artist: "DUKI",
    src: "track-2",
    img: "ada"
  },
  {
    name: "RoCKSTAR 2.0",
    artist: "DUKI, Jhayco",
    src: "track-3",
    img: "rockstar2"
  },
  {
    name: "hARAkiRI",
    artist: "DUKI, C.R.O",
    src: "track-4",
    img: "harakiri"
  },
  {
    name: "cONTRA><Mi",
    artist: "DUKI, WE$T DUBAI",
    src: "track-5",
    img: "ada"
  },
  {
    name: "CSIpher (audio latino)",
    artist: "DUKI, Akapellah, Neutro Shorty, Micro TDH",
    src: "track-6",
    img: "ada"
  },
  {
    name: "GiGi",
    artist: "DUKI",
    src: "track-7",
    img: "ada"
  },
  {
    name: "don't lie",
    artist: "DUKI, Quevedo",
    src: "track-8",
    img: "ada"
  },
  {
    name: "antes de perderte (OG VERSION)",
    artist: "DUKI",
    src: "track-9",
    img: "ada"
  },
  {
    name: "uNO dOS",
    artist: "DUKI",
    src: "track-10",
    img: "ada"
  },
  {
    name: "N.C.L.C",
    artist: "DUKI",
    src: "track-11",
    img: "ada"
  },
  {
    name: "aPoLLo13",
    artist: "DUKI",
    src: "track-12",
    img: "apollo13"
  },
  {
    name: "Ultimo Tren a Ameri",
    artist: "DUKI",
    src: "track-13",
    img: "ada"
  },
  {
    name: "Buscando Ameri",
    artist: "DUKI",
    src: "track-14",
    img: "ada"
  },
];

let ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>                    
                    <span id="${allMusic[i].src}" class="audio-duration"></span>
                    <audio id="${allMusic[i].src}" src="./assets/music/${allMusic[i].src}.mp3"></audio>
                </li>`;

  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`#${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}
const allLiTag = ulTag.querySelectorAll("li");

function playingNow() {
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

playingNow();

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
};

const closeWindow = document.querySelector("#closeAll");

closeWindow.addEventListener("click", () => {
  if (confirm("Close Music Player ? :(")) {
    window.close();
    close();
  } else {
    alert(" LES GO ")
  }
})