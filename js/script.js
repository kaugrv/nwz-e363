let Musiques = [
    {
      Titre: "Virilisme",
      Artiste: "Magenta Club",
      Album: "x1000",
      Genre: "Electropop",
      Annee: "2024",
      cover: "../musiques/X1000.jpg",
      musique: "../musiques/virilisme.mp3"
    },
]  



let currentScreen = 0;
// 0 = Menu principal
// 1 = Horloge
// 4 = Musique (choix Toutes les chansons, Album, ...)

// 6 = Musique-player

let nomsMenus = ["Aléatoire-Complète", "Radio FM", "Affichage de l'Horloge", "Photos", "Musique", "Vidéos", "Paramètres", "Listes de lecture", "Lecture en cours"];

let menuIcon = 4;
let musicLi = 0;

// Utiliser les flèches du mp4 pour naviguer
document.querySelector(".up").addEventListener("click", (e) => Navigate("up"));
document.querySelector(".down").addEventListener("click", (e) => Navigate("down"));
document.querySelector(".right").addEventListener("click", (e) => Navigate("right"));
document.querySelector(".left").addEventListener("click", (e) => Navigate("left"));

// Utiliser les flèches du clavier pour naviguer
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft"){
        Navigate("left");
    } else if (event.key == "ArrowUp"){
        Navigate("up");
    } else if (event.key == "ArrowRight"){
        Navigate("right");
    } else if (event.key == "ArrowDown"){
        Navigate("down");
    } else if (event.key == " ") {
        enter();
          
    }
})


// Play et back
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
    document.getElementById("icon-"+menuIcon).className = "";
    switch (direction) {
        case "up":
            menuIcon-=3;
            break;
        case "down":
            menuIcon+=3;
            break;
        case "right":
            menuIcon+=1;
            break;
        case "left":
            menuIcon-=1;
            break;
        default:
            break;
    }
    menuIcon = (menuIcon%9);
    if (menuIcon<0) {
        menuIcon+=9;
    }
    document.querySelector(".menu-title").innerHTML = nomsMenus[menuIcon];
    document.getElementById("icon-"+menuIcon).className = "hover-icon";
}

// Musique : navigation verticale entre les musique-li (Toutes les musiques, Artistes...)
function musicLiNavigate(direction) {
    document.getElementById("musique-li-"+musicLi).className = "musique-li";
    switch (direction) {
        case "up":
            musicLi-=1;
            break;
        case "down":
            musicLi+=1;
            break;
        default:
            break;
    }
    musicLi = (musicLi%6);
    if (musicLi<0) {
        musicLi+=6;
    }
    document.getElementById("musique-li-"+musicLi).className = "musique-li hover-musique-li";
}

let currentAudio = document.getElementById("audio");

// Play 
function enter() {

    // Menu
    if (currentScreen == 0) {
        // Musique
        if (menuIcon == 4) 
        {
            currentScreen = 4;
            document.querySelector(".musique").style.display = "block";
            document.querySelector(".menu").style.display = "none";
            document.querySelector(".header").innerHTML = nomsMenus[4];
        }
        // Aléatoire-Complète
        if (menuIcon == 0) {
            currentScreen = 6;
            document.querySelector(".musique").style.display = "none";
            document.querySelector(".music-player").style.display = "block";
            document.querySelector(".header").innerHTML = nomsMenus[4];
        }

        if (menuIcon==1) {
            open('https://www.radiomeuh.com/');
        }

        if(menuIcon==2) {
            currentScreen = 1;
            document.querySelector(".menu").style.display = "none";
            document.querySelector(".clock").style.display = "flex";
            document.querySelector(".header").style.display = "none";
            document.querySelector(".footer").style.display = "none";
        }
    }

    if (currentScreen == 6) {
        currentAudio.play();
    }   
}

function back() {
    if (currentScreen == 4) {
        currentScreen = 0;
        document.querySelector(".header").innerHTML = "Accueil";
        document.querySelector(".musique").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    }
    if (currentScreen == 6) {
        currentScreen = 0;
        document.querySelector(".header").innerHTML = "Accueil";
        document.querySelector(".music-player").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    }
    if (currentScreen == 1) {
        currentScreen = 0;
        document.querySelector(".clock").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
        document.querySelector(".header").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";


    }

}

// Horloge


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
    document.querySelector(".aiguille-h").style.rotate = ((h*360/12)) + (m*360/60)/12+ "deg";
    document.querySelector(".aiguille-m").style.rotate = (m*360/60) + "deg";

    document.querySelector(".music-progress-bar").style.width = currentAudio.currentTime/currentAudio.duration*100+"%";
    if (currentScreen == 6) {
        let nbMin = Math.floor(currentAudio.currentTime/60);
        let nbS = Math.floor(currentAudio.currentTime - nbMin*60);
        document.querySelector(".footer-title").innerHTML = 
        
        (nbMin < 10 ? '0' : '') + nbMin + ":" + (nbS < 10 ? '0' : '') + nbS ;
    } 
    setTimeout(startTime, 1000);
  }

  function truncate(str) {
    return (str.length > 20) ?
      str.slice(0, 19) + '…' : str;
  }
  
  function setMusicInfos(n) {
    document.getElementById("titre").innerHTML = '<img src="images/5.png" alt="" class="" />'+ truncate(Musiques[n].Titre);
    document.getElementById("album").innerHTML ="X " + truncate(Musiques[n].Album);
    document.getElementById("genre").innerHTML ="X " + truncate(Musiques[n].Genre);
    document.getElementById("annee").innerHTML ="X " + truncate(Musiques[n].Annee);
  }

  setMusicInfos(0);

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

