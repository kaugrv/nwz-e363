let Musiques = [
    {
        Titre: "Virilisme",
        Artiste: "Magenta Club",
        Album: "x1000",
        Genre: "Electropop",
        Annee: "2024",
        cover: "musique/X1000.jpg",
        musique: "musique/virilisme.mp3"
    },

    {
        Titre: "Despair, Hangover & Ecstasy",
        Artiste: "The Dø",
        Album: "Shake Shook Shaken",
        Genre: "Indie Pop",
        Annee: "2014",
        cover: "musique/shakeshookshaken.jpg",
        musique: "musique/despairhangoverecstasy.mp3"
    },

    
    {
        Titre: "Good Luck",
        Artiste: "Broken Bells",
        Album: "Good Luck",
        Genre: "Indie Pop",
        Annee: "2019",
        cover: "musique/goodluck.jpg",
        musique: "musique/goodluck.mp3"
    },

    {
        Titre: "Soldier of Fortune",
        Artiste: "Deep Purple",
        Album: "Stormbringer",
        Genre: "Folk Rock",
        Annee: "1974",
        cover: "musique/stormbringer.jpg",
        musique: "musique/soldieroffortune.mp3"
    },


    {
        Titre: "Subterfuge",
        Artiste: "Magenta Club",
        Album: "x1000",
        Genre: "Electropop",
        Annee: "2024",
        cover: "musique/X1000.jpg",
        musique: "musique/subterfuge.mp3"
    },

    {
        Titre: "No Plan",
        Artiste: "Hozier",
        Album: "Wasteland, Baby!",
        Genre: "Pop Soul",
        Annee: "2019",
        cover: "musique/wastelandbaby.jpg",
        musique: "musique/noplan.mp3"
    },
]

function triAZ(liste) {
    return liste.sort((a, b) => {
        if (a['Titre'] < b['Titre']) {
            return -1;  // a vient avant b
        }
        if (a['Titre'] > b['Titre']) {
            return 1;   // b vient avant a
        }
        return 0;  // a et b sont égaux
    });
}

Musiques = triAZ(Musiques);


let currentScreen = 0;
// 0 = Menu principal
// 1 = Horloge
// 4 = Musique (choix Toutes les chansons, Album, ...)
// 5 = Toutes les chansons (A-Z)

// 6 = Musique-player

let nomsMenus = ["Aléatoire-Complète", "Radio FM", "Affichage de l'Horloge", "Photos", "Musique", "Vidéos", "Paramètres", "Listes de lecture", "Lecture en cours"];

let menuIcon = 4;
let musicLi = 0;

let pause = true;

let currentMusic = 0;
let currentAudio = document.getElementById("audio");

// Utiliser les flèches du mp4 pour naviguer
document.querySelector(".up").addEventListener("click", (e) => Navigate("up"));
document.querySelector(".down").addEventListener("click", (e) => Navigate("down"));
document.querySelector(".right").addEventListener("click", (e) => Navigate("right"));
document.querySelector(".left").addEventListener("click", (e) => Navigate("left"));

// Utiliser les flèches du clavier pour naviguer
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
        Navigate("left");
    } else if (event.key == "ArrowUp") {
        Navigate("up");
    } else if (event.key == "ArrowRight") {
        Navigate("right");
    } else if (event.key == "ArrowDown") {
        Navigate("down");
    } else if (event.key == " ") {
        enter();

    }
})

// Enter et back
document.querySelector(".play").addEventListener("click", (e) => enter())
document.querySelector(".back").addEventListener("click", (e) => back())

// Pour naviguer selon l'écran
function Navigate(direction) {
    // Menu : navigue dans la grille d'icônes
    if (currentScreen == 0) menuNavigate(direction)
    // Musique : navigation verticale entre les musique-li (Toutes les musiques, Artistes...)
    if (currentScreen == 4) musicLiNavigate(direction)
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
    menuIcon = (menuIcon % 9);
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
    musicLi = (musicLi % 6);
    if (musicLi < 0) {
        musicLi += 6;
    }
    document.getElementById("musique-li-" + musicLi).className = "musique-li hover-musique-li";
}



// Play 
function enter() {
    console.log(currentScreen);
    // Menu
    if (currentScreen == 0) {
        // Musique
        if (menuIcon == 4) {
            currentScreen = 4;
            document.querySelector(".musique").style.display = "block";
            document.querySelector(".menu").style.display = "none";
            document.querySelector(".header").innerHTML = nomsMenus[4];
            return;
        }
        // Aléatoire-Complète
        if (menuIcon == 0) {
            currentScreen = 6;
            setMusicInfos(0);
            document.querySelector(".musique").style.display = "none";
            document.querySelector(".music-player").style.display = "block";
            document.querySelector(".header").innerHTML = nomsMenus[4];
            let nbMin = Math.floor(currentAudio.currentTime / 60);
            let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
            document.querySelector(".footer-title").innerHTML = "00:00";

            currentAudio.currentTime = 0;

            if (pause) {
                setMusicInfos(0);

                currentAudio.play()
                    .then(() => {
                        musicPlay();
                    })
                    .catch((error) => {
                        console.error('Erreur de lecture audio', error);
                    });
            } else {
                setMusicInfos(0);
                currentAudio.pause();
                currentAudio.currentTime = 0;


                setTimeout(() => {
                    setMusicInfos(0);
                    currentAudio.play()
                        .then(() => {
                            musicPlay();
                        })
                        .catch((error) => {
                            console.error('Erreur de lecture audio', error);
                        });
                }, 100);
            }
            return;
        }

        if (menuIcon == 1) {
            open('https://www.radiomeuh.com/');
            return;
        }

        if (menuIcon == 2) {
            currentScreen = 1;
            document.querySelector(".menu").style.display = "none";
            document.querySelector(".clock").style.display = "flex";
            document.querySelector(".header").style.display = "none";
            document.querySelector(".footer").style.display = "none";
            return;
        }
    }

    if (currentScreen == 4) {
        if (musicLi == 0) {
            currentScreen = 5;
            document.querySelector(".musique").style.display = "none";
            document.querySelector(".header").innerHTML = "Toutes les Chansons";
            document.querySelector(".all-musique").style.display = "block";

            let listeMusiques = "";
            listeMusiques += '<div class="musique-li hover-musique-li"  id="musique-li-0">' + truncate(Musiques[0].Titre) + '</div>';
            for (let i = 1; i < Musiques.length; i++) {
                listeMusiques += '<div class="musique-li"  id="musique-li-' + i + '">' + Musiques[i].Titre + '</div>';
            }
            document.querySelector(".all-musique").innerHTML = listeMusiques;
            return;
        }
    }

    // Si on est déjà sur l'écran de lecture (currentScreen == 6), on gère la lecture/pauses
    if (currentScreen == 6) {
        togglePlayPause();
    }
}


function togglePlayPause() {
    if (pause) {
        musicPlay();

    } else if (!pause) {
        musicPause();
    }
}

function musicPlay() {
    pause = false;
    document.querySelector(".footer-state").innerHTML = "▶";
    document.querySelector(".footer-state").style.color = "rgb(44, 243, 44)";
    currentAudio.play();
}

function musicPause() {
    pause = true;
    document.querySelector(".footer-state").innerHTML = "⏸";
    document.querySelector(".footer-state").style.color = "white";
    currentAudio.pause();

}

function back() {
    if (currentScreen == 4) {
        currentScreen = 0;
        document.querySelector(".header").innerHTML = "Accueil";
        document.querySelector(".musique").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
        return;
    }
    if (currentScreen == 6) {
        currentScreen = 0;
        document.querySelector(".header").innerHTML = "Accueil";
        document.querySelector(".music-player").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
        return;
    }
    if (currentScreen == 1) {
        currentScreen = 0;
        document.querySelector(".clock").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
        document.querySelector(".header").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        return;
    }
    if (currentScreen == 5) {
        currentScreen = 4;
        document.querySelector(".musique").style.display = "block";
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".all-musique").style.display = "none";
        document.querySelector(".header").innerHTML = nomsMenus[4];
        return;
    }

}


document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
        musicQueue("previous");
    } else if (event.key == "ArrowRight") {
        musicQueue("next");
    }
})

document.querySelector(".left").addEventListener("click", (e) => musicQueue("previous"));
document.querySelector(".right").addEventListener("mouseup", (e) => musicQueue("next"));

function musicQueue(sens) {


    if (currentScreen == 6) {
        if (sens == "previous") {
            if (currentAudio.currentTime < 2) {
                currentMusic--;
                if (currentMusic < 0) {
                    currentMusic = Musiques.length - 1;
                }
            }
        }

        if (sens == "next") {
    
            currentMusic++;
            if (currentMusic > Musiques.length - 1) {
                currentMusic = 0;
            }
        }

        setMusicInfos(currentMusic);

        if (!pause) {
            currentAudio.currentTime = 0;
            document.querySelector(".footer-title").innerHTML = "00:00";
            currentAudio.play().then(() => {
            }).catch((error) => {
                console.error('Erreur de lecture audio', error);
            });
        } else {
            currentAudio.currentTime = 0;
            document.querySelector(".footer-title").innerHTML = "00:00";
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
    month = (month < 10 ? '0' : '') + month;
    let year = today.getFullYear();
    document.querySelector(".hour h2").innerHTML =
        h + ":" + (m < 10 ? '0' : '') + m;
    document.querySelector(".hour h3").innerHTML =
        day + "/" + month + "/" + year;
    document.querySelector(".aiguille-h").style.rotate = ((h * 360 / 12)) + (m * 360 / 60) / 12 + "deg";
    document.querySelector(".aiguille-m").style.rotate = (m * 360 / 60) + "deg";

    if (!pause && currentScreen == 6) {
        document.querySelector(".music-progress-bar").style.width = currentAudio.currentTime / currentAudio.duration * 100 + "%";
        if (currentScreen == 6) {
            let nbMin = Math.floor(currentAudio.currentTime / 60);
            let nbS = Math.floor(currentAudio.currentTime - nbMin * 60);
            document.querySelector(".footer-title").innerHTML =

                (nbMin < 10 ? '0' : '') + nbMin + ":" + (nbS < 10 ? '0' : '') + nbS;

            if (currentAudio.currentTime == currentAudio.duration) {
                currentMusic++;
                if (currentMusic > Musiques.length - 1) {
                    currentMusic = 0;
                }

                setMusicInfos(currentMusic);
                currentAudio.currentTime = 0;
                document.querySelector(".footer-title").innerHTML = "00:00";
                currentAudio.play().then(() => {
                }).catch((error) => {
                    console.error('Erreur de lecture audio', error);
                });
            }
        }
    }

    setTimeout(startTime, 1000);
}

// function alterneTitreArtiste() {
//     if (currentScreen != 6) {
//         let footerTitle = document.querySelector(".footer-title");
//         let toggle = true;  // Début avec le titre

//         setInterval(() => {
//             if (toggle) {
//                 footerTitle.innerHTML = Musiques[currentMusic].Titre;  // Affiche le titre
//             } else {
//                 footerTitle.innerHTML = Musiques[currentMusic].Artiste;  // Affiche l'artiste
//             }
//             toggle = !toggle;  // Inverse la valeur pour alterner
//         }, 4000);  // Intervalle de 3 secondes (3000 ms)
//     }
// }

function truncate(str) {
    return (str.length > 20) ?
        str.slice(0, 19) + '…' : str;
}

function setMusicInfos(n) {
    currentAudio.src = Musiques[n].musique;
    document.getElementById("titre").innerHTML = '<img src="images/5.png" alt="" class="" />' + truncate(Musiques[n].Titre);
    document.getElementById("artiste").innerHTML = "X " + truncate(Musiques[n].Artiste);
    document.getElementById("album").innerHTML = "X " + truncate(Musiques[n].Album);
    document.getElementById("genre").innerHTML = "X " + truncate(Musiques[n].Genre);
    document.getElementById("annee").innerHTML = "X " + truncate(Musiques[n].Annee);
    document.getElementById("cover").src = Musiques[n].cover;
    document.querySelector(".music-count").innerHTML = n + 1 + "/" + Musiques.length;
}


////// DEBUG //////
function hideEverything() {
    document.querySelector(".musique").style.display = "none";
    document.querySelector(".menu").style.display = "none";
    //document.querySelector(".music-player").style.display = "none";
    // document.querySelector(".header").style.display = "none";
    // document.querySelector(".footer").style.display = "none";
    document.querySelector(".clock").style.display = "none";

}

// hideEverything();
















// /* Default */
// gsap.defaults({
//     ease: "power4.out",
//     duration: 1,
//   });

// /* Animation GSAP */
// gsap.from('.mp4-player', {
//     opacity:0,
//     scale:0.5,
// });

// /* Animation ScrollTrigger */
// gsap.from('.mp4-player', {
//     opacity:0,
//     scale:2,
//     rotate:360,
//     scrollTrigger:{
//         trigger: ".mp4-player",
//         start:"center 80%",
//         end:"+=500",
//         markers:false,
//         toggleActions: "play none none reverse",
//         //scrub:1,
//         //pin:true,
//     }
// });

