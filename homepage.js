
var ppbutton = document.getElementById("vidbutton");

ppbutton.addEventListener("click", playPause);

myVideo = document.getElementById("home-video");

function playPause() { 
    if (myVideo.paused) {
        myVideo.play();
        ppbutton.innerHTML = "Pause";
        }
    else  {
        myVideo.pause(); 
        ppbutton.innerHTML = "Play";
        }
}


const openinsta = () => {
    
}
