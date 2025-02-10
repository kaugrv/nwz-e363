let currentScreen = 0;

// 0 = Menu principal
// 4 = Musique (choix Toutes les chansons, Album, ...)

let nomsMenus = ["Aléatoire-Complète", "Radio FM", "Affichage de l'Horloge", "Photos", "Musique", "Vidéos", "Paramètres", "Listes de lecture", "Lecture en cours"];

let menuIcon = 4;
let musicLi = 0;

document.querySelector(".up").addEventListener("click", (e) => Navigate("up"));
document.querySelector(".down").addEventListener("click", (e) => Navigate("down"));
document.querySelector(".right").addEventListener("click", (e) => Navigate("right"));
document.querySelector(".left").addEventListener("click", (e) => Navigate("left"));

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


document.querySelector(".play").addEventListener("click", (e) => enter())
document.querySelector(".back").addEventListener("click", (e) => back())

function Navigate(direction) {
if (currentScreen == 0) {
    menuNavigate(direction)
}
if (currentScreen == 4 )
    musicLiNavigate(direction)
}

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


function enter() {
    if (currentScreen == 0) {
        if (menuIcon == 4) // Musique 
        {
            currentScreen = 4;
            document.querySelector(".musique").style.display = "block";
            document.querySelector(".menu").style.display = "none";
            document.querySelector(".header").innerHTML = nomsMenus[menuIcon];
        }
    }
}

function back() {

    if (currentScreen == 4) {
        currentScreen = 0;
        document.querySelector(".header").innerHTML = "Accueil";
        document.querySelector(".musique").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    }
}

function hideEverything() {
    document.querySelector(".musique").style.display = "none";
    document.querySelector(".menu").style.display = "none";
}

hideEverything();
















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

