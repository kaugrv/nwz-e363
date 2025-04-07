let Musiques = [];

fetch("./data/musiques.json")
  .then((response) => response.json())
  .then((data) => {
    Musiques = data.sort((a, b) => a.Titre.localeCompare(b.Titre));
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des musiques:", error);
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  SHUF = true;
  document.querySelector(".footer-mode").innerHTML = "SHUF";
  return array;
}

let currentScreen = 0;
// 0 = Menu principal
// 1 = Horloge
// 4 = Musique (choix Toutes les chansons, Album, ...)
// 5 = Toutes les chansons (A-Z)

// 6 = Musique-player
// 7 = Musique-player but launched from Toutes les Chansons

let nomsMenus = [
  "Aléatoire-Complète",
  "Radio FM",
  "Affichage de l'Horloge",
  "Photos",
  "Musique",
  "Vidéos",
  "Liens",
  "A propos",
  "Lecture en cours",
];

let menuIcon = 4;
let musicLi = 0;

let pause = true;
let SHUF = false;
let firstMusicPlayed = false;

let currentMusic = 0;
let currentAudio = document.getElementById("audio");

let radio = 0;

// Utiliser les flèches du mp4 pour naviguer
document.querySelector(".up").addEventListener("click", (e) => Navigate("up"));
document
  .querySelector(".down")
  .addEventListener("click", (e) => Navigate("down"));
document
  .querySelector(".right")
  .addEventListener("click", (e) => Navigate("right"));
document
  .querySelector(".left")
  .addEventListener("click", (e) => Navigate("left"));
// Enter et back
document.querySelector(".play").addEventListener("click", (e) => enter());
document.querySelector(".back").addEventListener("click", (e) => back());

// Pareil mais les flèches du clavier + Enter,Back,Esc,Espace
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft") {
    Navigate("left");
  } else if (event.key == "ArrowUp") {
    Navigate("up");
  } else if (event.key == "ArrowRight") {
    Navigate("right");
  } else if (event.key == "ArrowDown") {
    Navigate("down");
  } else if (event.key == " " || event.key == "Enter") {
    enter();
  } else if (event.key == "Backspace" || event.key == "Escape") {
    back();
  }
});

// Pour naviguer selon l'écran
function Navigate(direction) {
  // Menu : navigue dans la grille d'icônes
  if (currentScreen == 0) menuNavigate(direction);
  // Musique : navigation verticale entre les musique-li (Toutes les musiques, Artistes...)
  if (currentScreen == 4) musicLiNavigate(direction);
  if (currentScreen == 5) allMusicNavigate(direction);
}

// Menu : navigue dans la grille d'icônes
function menuNavigate(direction) {
  document.getElementById("icon-" + menuIcon).className = "";
  switch (direction) {
    case "up":
      menuIcon -= 3;
      break;
    case "down":
      menuIcon += 3;
      break;
    case "right":
      menuIcon += 1;
      break;
    case "left":
      menuIcon -= 1;
      break;
    default:
      break;
  }
  menuIcon = menuIcon % 9;
  if (menuIcon < 0) {
    menuIcon += 9;
  }
  document.querySelector(".menu-title").innerHTML = nomsMenus[menuIcon];
  document.getElementById("icon-" + menuIcon).className = "hover-icon";
}

// Musique : navigation verticale entre les musique-li (Toutes les musiques, Artistes...)
function musicLiNavigate(direction) {
  document.getElementById("musique-li-" + musicLi).className = "musique-li";
  switch (direction) {
    case "up":
      musicLi -= 1;
      break;
    case "down":
      musicLi += 1;
      break;
    default:
      break;
  }
  musicLi = musicLi % 5;
  if (musicLi < 0) {
    musicLi += 5;
  }
  document.getElementById("musique-li-" + musicLi).className =
    "musique-li hover-musique-li";
}

let allMusicLi = 0;
let allMusicpage = 0;

function allMusicNavigate(direction) {
  document.getElementById("all-musique-li-" + allMusicLi).className =
    "musique-li";
  switch (direction) {
    case "up":
      allMusicLi -= 1;
      document.querySelector(".scrollbar-body").style.top = (allMusicLi+allMusicpage)/Musiques.length*89 + "%";

      break;
    case "down":
      allMusicLi += 1;
      document.querySelector(".scrollbar-body").style.top = (allMusicLi+allMusicpage)/Musiques.length*89 + "%";

      break;
    default:
      break;
  }

  if (allMusicLi == 8) {
    allMusicLi = 7;
    allMusicpage++;
    if (allMusicpage + allMusicLi == Musiques.length) {
      document.querySelector(".scrollbar-body").style.top ="0%";
      allMusicLi = 0;
      allMusicpage = 0;
    }
  }

  if (allMusicLi == -1) {
    allMusicLi = 0;
    allMusicpage--;
    if (allMusicpage == -1) {
      document.querySelector(".scrollbar-body").style.top ="89%";
      allMusicLi = 7;
      allMusicpage = Musiques.length - 8;
    }
  }
  // document.querySelector(".scrollbar-body").style.top = Musiques.length/8+"px";
  // document.querySelector(".scrollbar-body").style.top = allMusicpage + "%";

  let listeMusiques = "";
  for (let i = 0; i < 8; i++) {
    listeMusiques +=
      '<div class="musique-li"  id="all-musique-li-' +
      i +
      '">' +
      truncate(Musiques[i + allMusicpage].Titre) +
      "</div>";
  }
  document.querySelector(".all-musique").innerHTML = listeMusiques;
  document.getElementById("all-musique-li-" + allMusicLi).className =
    "musique-li hover-musique-li";
}

let toggle = true;

function alterne() {
  if (currentScreen != 6) {
    if (toggle) {
      document.querySelector(".footer-title").innerHTML =
        Musiques[currentMusic].Titre; // Affiche le titre
    } else {
      document.querySelector(".footer-title").innerHTML =
        Musiques[currentMusic].Artiste; // Affiche l'artiste
    }

    toggle = !toggle;

    if (document.querySelector(".footer-title").innerHTML.length > 15) {
      document.querySelector(".footer-title").style.animation =
        "defilement-rtl 20s infinite linear";
    } else {
      document.querySelector(".footer-title").style.animation = "none";
    }
  }
}

var intervalID = null;

function intervalManager(flag) {
  if (flag) intervalID = setInterval(alterne, 4000);
  else clearInterval(intervalID);
}

// Play
function enter() {
  // Menu
  if (currentScreen == 0) {
    // Musique
    if (menuIcon == 4) {
      // currentScreen = 4;
      // document.querySelector(".musique").style.display = "block";
      // document.querySelector(".menu").style.display = "none";
      // document.querySelector(".header").innerHTML = nomsMenus[4];
      // console.log(currentScreen)
      currentScreen = 5;
      document.querySelector(".menu").style.display = "none";
      document.querySelector(".header").innerHTML = "Toutes les Chansons";
      document.querySelector(".all-musique").style.display = "block";
      document.querySelector(".scrollbar").style.display = "block";

      Musiques.sort((a, b) => a.Titre.localeCompare(b.Titre));
      let listeMusiques = "";
      listeMusiques +=
        '<div class="musique-li hover-musique-li"  id="all-musique-li-0">' +
        truncate(Musiques[0].Titre) +
        "</div>";
      for (let i = 1; i < 8; i++) {
        listeMusiques +=
          '<div class="musique-li"  id="all-musique-li-' +
          i +
          '">' +
          truncate(Musiques[i].Titre) +
          "</div>";
      }
      document.querySelector(".all-musique").innerHTML = listeMusiques;
      return;
      

      return;
    }
    // Aléatoire-Complète
    if (menuIcon == 0) {
      currentScreen = 6;
      currentMusic = 0;
      Musiques = shuffle(Musiques);
      firstMusicPlayed = true;
      intervalManager(false);
      setMusicInfos(currentMusic);
      document.querySelector(".musique").style.display = "none";
      document.querySelector(".music-player").style.display = "block";
      document.querySelector(".header").innerHTML = nomsMenus[4];
      document.querySelector(".footer-mode").style.display = "block";
      let nbMin = Math.floor(currentAudio.currentTime / 60);
      let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
      document.querySelector(".footer-title").style.animation = "none";
      musicReset();
      if (pause) {
        setMusicInfos(currentMusic);
        currentAudio
          .play()
          .then(() => {
            musicPlay();
          })
          .catch((error) => {
            console.error("Erreur de lecture audio", error);
          });
      } else {
        setMusicInfos(currentMusic);
        currentAudio.pause();
        currentAudio.currentTime = 0;

        setTimeout(() => {
          setMusicInfos(0);
          currentAudio
            .play()
            .then(() => {
              musicPlay();
            })
            .catch((error) => {
              console.error("Erreur de lecture audio", error);
            });
        }, 100);
      }
      return;
    }

    // Lecture en cours
    if (menuIcon == 8 && firstMusicPlayed) {
      intervalManager(false);
      document.querySelector(".footer-title").style.animation = "none";
      document.querySelector(".musique").style.display = "none";
      document.querySelector(".music-player").style.display = "block";
      document.querySelector(".header").innerHTML = nomsMenus[4];
      let nbMin = Math.floor(currentAudio.currentTime / 60);
      let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
      document.querySelector(".footer-title").innerHTML =
        (nbMin < 10 ? "0" : "") + nbMin + ":" + (nbS < 10 ? "0" : "") + nbS;
      setTimeout(() => {
        currentScreen = 6;
      }, 300);

      document.querySelector(".footer-mode").style.display = "block";
      document.querySelector(".footer-title").style.animation = "none";
      document.querySelector(".music-progress-bar").style.width =
        (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
    }

    //Radio FM
    if (menuIcon == 1) {
      if (radio==0) open("https://www.radiomeuh.com/");
      else if (radio==1) open("https://www.nostalgie.fr/");
      else if (radio==2) open("https://www.radiofrance.fr/fip");

      radio = (radio+1)%3;
      return;
    }

    //A propos 
    if  (menuIcon == 7) {
      currentScreen = 8;
      document.querySelector(".message-voile").style.display = "block";
    }

    //Liens
    if (menuIcon == 6) {
      open("https://kaugrv.github.io/xmb-portfolio/")
    }

    //Affichage de l'Horloge
    if (menuIcon == 2) {
      currentScreen = 1;
      document.querySelector(".menu").style.display = "none";
      document.querySelector(".clock").style.display = "flex";
      document.querySelector(".header").style.display = "none";
      document.querySelector(".footer").style.display = "none";
      return;
    }
  }

  // Toutes les chansons
  // if (currentScreen == 4) {
  //   if (musicLi == 0) {
  //     currentScreen = 5;
  //     document.querySelector(".musique").style.display = "none";
  //     document.querySelector(".header").innerHTML = "Toutes les Chansons";
  //     document.querySelector(".all-musique").style.display = "block";
  //     document.querySelector(".scrollbar").style.display = "block";

  //     Musiques.sort((a, b) => a.Titre.localeCompare(b.Titre));
  //     let listeMusiques = "";
  //     listeMusiques +=
  //       '<div class="musique-li hover-musique-li"  id="all-musique-li-0">' +
  //       truncate(Musiques[0].Titre) +
  //       "</div>";
  //     for (let i = 1; i < 8; i++) {
  //       listeMusiques +=
  //         '<div class="musique-li"  id="all-musique-li-' +
  //         i +
  //         '">' +
  //         truncate(Musiques[i].Titre) +
  //         "</div>";
  //     }
  //     document.querySelector(".all-musique").innerHTML = listeMusiques;
  //     console.log(currentScreen)
  //     return;
  //   }
  // }

  if (currentScreen == 5) {
    currentScreen = 7;
    currentMusic = allMusicLi +allMusicpage;
    firstMusicPlayed = true;
    setMusicInfos(currentMusic);
    intervalManager(false);
    SHUF = false;
    document.querySelector(".footer-mode").innerHTML = "";
    document.querySelector(".musique").style.display = "none";
    document.querySelector(".music-player").style.display = "block";
    document.querySelector(".header").innerHTML = nomsMenus[4];
    document.querySelector(".footer-mode").style.display = "block";
    document.querySelector(".scrollbar").style.display = "none";

    let nbMin = Math.floor(currentAudio.currentTime / 60);
    let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
    document.querySelector(".footer-title").style.animation = "none";
    musicReset();
    if (pause) {
      setMusicInfos(currentMusic);
      currentAudio
        .play()
        .then(() => {
          musicPlay();
        })
        .catch((error) => {
          console.error("Erreur de lecture audio", error);
        });
    } else {
      setMusicInfos(currentMusic);
      currentAudio.pause();
      currentAudio.currentTime = 0;

      setTimeout(() => {
        setMusicInfos(currentMusic);
        currentAudio
          .play()
          .then(() => {
            musicPlay();
          })
          .catch((error) => {
            console.error("Erreur de lecture audio", error);
          });
      }, 100);
    }
    console.log(currentScreen)

    return;
  }

  // Si on est déjà sur l'écran de lecture (currentScreen == 6), on gère la lecture/pauses
  if (currentScreen == 6 || currentScreen == 7) {
    setTimeout(() => {
      if (currentScreen == 6 || currentScreen == 7) togglePlayPause();
    }, 300);
  }

}

// Sur écran 6 (lecture de musique), le bouton permet de lancer/arrêter la lecture.
function togglePlayPause() {
  if (pause) {
    musicPlay();
  } else if (!pause) {
    musicPause();
  }
}

// Lancer
function musicPlay() {
  pause = false;
  document.querySelector(".footer-state").innerHTML = "▶";
  document.querySelector(".footer-state").style.color = "rgb(44, 243, 44)";
  currentAudio.play();
}

// Arrêter
function musicPause() {
  pause = true;
  document.querySelector(".footer-state").innerHTML = "⏸";
  document.querySelector(".footer-state").style.color = "white";
  currentAudio.pause();
}

function musicReset() {
  currentAudio.currentTime = 0;
  document.querySelector(".footer-title").innerHTML = "00:00";
  document.querySelector(".music-progress-bar").style.width = "0%";
}

// Gestion des retours arrières dans les menus
function back() {
  // Musique > Accueil
  // if (currentScreen == 4) {
  //   currentScreen = 0;
  //   document.querySelector(".header").innerHTML = "Accueil";
  //   document.querySelector(".musique").style.display = "none";
  //   document.querySelector(".menu").style.display = "flex";
  //   return;
  // }
  // Toutes les Chansons > Accueil
  if (currentScreen == 5) {
    currentScreen = 0;
    document.querySelector(".header").innerHTML = "Accueil";
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".all-musique").style.display = "none";
    document.querySelector(".scrollbar").style.display = "none";
    return;
  }
  // Player > Accueil
  if (currentScreen == 6) {
    currentScreen = 0;
    document.querySelector(".header").innerHTML = "Accueil";
    document.querySelector(".music-player").style.display = "none";
    document.querySelector(".menu").style.display = "flex";

    document.querySelector(".footer-title").innerHTML =
      Musiques[currentMusic].Titre;

    intervalManager(true);

    document.querySelector(".footer-mode").style.display = "none";
    return;
  }
  // Player > Toutes les Chansons
  if (currentScreen == 7) {
    currentScreen = 5;
    document.querySelector(".header").innerHTML = "Toutes les Chansons";
    document.querySelector(".music-player").style.display = "none";

    document.querySelector(".footer-title").innerHTML =
      Musiques[currentMusic].Titre;
    document.querySelector(".all-musique").style.display = "block";
    document.querySelector(".scrollbar").style.display = "block";

    intervalManager(true);
    document.querySelector(".footer-mode").style.display = "none";
    return;
  }
  // Horloge > Accueil
  if (currentScreen == 1) {
    currentScreen = 0;
    document.querySelector(".clock").style.display = "none";
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".header").style.display = "flex";
    document.querySelector(".footer").style.display = "flex";
    return;
  }
  // Toutes les chansons > Musique
  // if (currentScreen == 5) {
  //   currentScreen = 4;
  //   document.querySelector(".musique").style.display = "block";
  //   document.querySelector(".menu").style.display = "none";
  //   document.querySelector(".all-musique").style.display = "none";
  //   document.querySelector(".scrollbar").style.display = "none";

  //   document.querySelector(".header").innerHTML = nomsMenus[4];
  //   return;
  // }

  //A propos > Accueil
  if (currentScreen == 8) {
    currentScreen = 0;
    document.querySelector(".message-voile").style.display = "none";
  }
}

// Skip ou previous song : clavier
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft") {
    musicQueue("previous");
  } else if (event.key == "ArrowRight") {
    musicQueue("next");
  }
});

// Skip ou previous song : boutons
document
  .querySelector(".left")
  .addEventListener("click", (e) => musicQueue("previous"));
document
  .querySelector(".right")
  .addEventListener("mouseup", (e) => musicQueue("next"));

function musicQueue(sens) {
  if (currentScreen == 6 || currentScreen == 7) {
    // Previous
    if (sens == "previous") {
      // Passe à la chanson précédente si l'actuelle est à moins de 2s (sinon, on relance juste l'actuelle)
      if (currentAudio.currentTime < 2) {
        currentMusic--;
        if (currentMusic < 0) {
          currentMusic = Musiques.length - 1;
        }
      }
    }

    // Next
    if (sens == "next") {
      currentMusic++;
      if (currentMusic > Musiques.length - 1) {
        currentMusic = 0;
      }
    }

    // Get la musique
    setMusicInfos(currentMusic);

    // On peut aussi skip si on est en pause.
    if (!pause) {
      musicReset();
      currentAudio
        .play()
        .then(() => {})
        .catch((error) => {
          console.error("Erreur de lecture audio", error);
        });
    } else {
      musicReset();
      currentAudio.pause();
    }
  }
}

// Horloge et timer

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  day = (day < 10 ? "0" : "") + day;
  month = (month < 10 ? "0" : "") + month;
  let year = today.getFullYear();
  document.querySelector(".hour h2").innerHTML =
    (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
  document.querySelector(".hour h3").innerHTML = day + "/" + month + "/" + year;
  document.querySelector(".aiguille-h").style.rotate =
    (h * 360) / 12 + (m * 360) / 60 / 12 + "deg";
  document.querySelector(".aiguille-m").style.rotate = (m * 360) / 60 + "deg";

  if (!pause && (currentScreen == 6 || currentScreen == 7)) {
    document.querySelector(".music-progress-bar").style.width =
      (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
    if (currentScreen == 6 || currentScreen == 7) {
      let nbMin = Math.floor(currentAudio.currentTime / 60);
      let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
      document.querySelector(".footer-title").innerHTML =
        (nbMin < 10 ? "0" : "") + nbMin + ":" + (nbS < 10 ? "0" : "") + nbS;

      if (currentAudio.currentTime == currentAudio.duration) {
        currentMusic++;
        if (currentMusic > Musiques.length - 1) {
          currentMusic = 0;
        }

        setMusicInfos(currentMusic);
        musicReset();
        currentAudio
          .play()
          .then(() => {})
          .catch((error) => {
            console.error("Erreur de lecture audio", error);
          });
      }
    }
  }

  setTimeout(startTime, 1000);
}

function truncate(str) {
  return str.length > 20 ? str.slice(0, 19) + "…" : str;
}

function truncateforFooter(str) {
  return str.length > 7 ? str.slice(0, 6) : str;
}

function setMusicInfos(n) {
  currentAudio.src = Musiques[n].musique;
  document.getElementById("titre").innerHTML =
    '<img src="images/5.png" alt="" class="" />' + truncate(Musiques[n].Titre);
  document.getElementById("artiste").innerHTML =
    "X " + truncate(Musiques[n].Artiste);
  document.getElementById("album").innerHTML =
    "X " + truncate(Musiques[n].Album);
  document.getElementById("genre").innerHTML =
    "X " + truncate(Musiques[n].Genre);
  document.getElementById("annee").innerHTML =
    "X " + truncate(Musiques[n].Annee);
  document.getElementById("cover").src = Musiques[n].cover;
  document.querySelector(".music-count").innerHTML =
    n + 1 + "/" + Musiques.length;
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: Musiques[n].Titre,
      artist: Musiques[n].Artiste,
      album: Musiques[n].Album,
      artwork: [{ src: Musiques[n].cover }],
    });
  }
}


navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });

  function updateLevelInfo() {
    let batteryImg = document.querySelector(".battery");

    if (battery.level*100 <= 100 && battery.level*100 > 75) {
      batteryImg.src = "../images/batt1.png"
      batteryImg.style.animation = 'none';
    }
    if (battery.level*100 <= 75 && battery.level*100 > 50) {
      batteryImg.src = "../images/batt2.png"
      batteryImg.style.animation = 'none';
    }
    if (battery.level*100 <= 50 && battery.level*100 > 25) {
      batteryImg.src = "../images/batt3.png"
      batteryImg.style.animation = 'none';
    }
    if (battery.level*100 <= 25 && battery.level*100 > 15) {
      batteryImg.src = "../images/batt4.png"
      batteryImg.style.animation = 'none';
    }
    if (battery.level*100 <= 15) {
      batteryImg.src = "../images/batt4.png"
      batteryImg.style.animation = 'battery-flash 0.5s infinite steps(1, end)';
    }
  }
});