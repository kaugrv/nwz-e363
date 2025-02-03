let screens = ["menu"];
let currentScreen = 0;

let nomsMenus = ["Aléatoire-Complète", "Radio FM", "Affichage de l'Horloge", "Photos", "Musique", "Vidéos", "Paramètres", "Listes de lectures", "Lecture en cours"];

let menuIcon = 4;

document.querySelector(".up").addEventListener("click", (e) => menuNavigate("up"));
document.querySelector(".down").addEventListener("click", (e) => menuNavigate("down"));
document.querySelector(".right").addEventListener("click", (e) => menuNavigate("right"));
document.querySelector(".left").addEventListener("click", (e) => menuNavigate("left"));


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

