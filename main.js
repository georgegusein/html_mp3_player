document.addEventListener("DOMContentLoaded", function (event) {
    let playList = [];
    let playListItem = document.getElementsByClassName("playListItem");
    //get all tracks
    for (let i = 0; i < playListItem.length; i++) {
        let x = playListItem[i].getAttribute("data-track");
        playList.push(x);
    }
    //attach events for all play buttons
    let playButton = document.getElementsByClassName("play");
    for (let i = 0; i < playButton.length; i++) {
        playButton[i].addEventListener("click", function () {
            for (k = 0; k < playButton.length; k++) {
                if (k == i) {
                    playListItem[i].getElementsByClassName("pause")[0].style.display = "block";
                    playListItem[i].getElementsByClassName("play")[0].style.display = "none";
                    playListItem[i].style.background = "rgb(64, 196, 255)";
                    playListItem[k].style.boxShadow = "inset 2px 2px 4px 0px #4e7b90";
                } else {
                    playListItem[k].getElementsByClassName("play")[0].style.display = "block";
                    playListItem[k].getElementsByClassName("pause")[0].style.display = "none";
                    playListItem[k].style.background = "rgb(6, 158, 226)";
                    playListItem[k].style.boxShadow = "none";
                    
                }
            }
            loadAudionFromList(i);
        });
    }


    //attach play event to player 
    document.getElementById("play").addEventListener('click', function () {
        if (document.getElementById("audioSource").readyState === 4) {
            document.getElementById("play").style.display = "none";
            document.getElementById("pause").style.display = "block";
            document.getElementById("audioSource").play();
        }
    });
    //attach pause event to player
    document.getElementById("pause").addEventListener('click', function () {
        document.getElementById("play").style.display = "block";
        document.getElementById("pause").style.display = "none";
        document.getElementById("audioSource").pause();
    });
    //attach back event to player
    document.getElementById("back").addEventListener('click', function () {
        back();
    });
    //attach forward event to player
    document.getElementById("forward").addEventListener('click', function () {
        forward();
    });
    //back
    function back() {
        let track = document.getElementById("audioSource").getAttribute("data-trackNum");
        track = Number(track);
        track -= 1;
        if (track < 0) {
            track = playList.length - 1;
        }
        for (k = 0; k < playButton.length; k++) {
            if (k == track) {
                playListItem[track].getElementsByClassName("pause")[0].style.display = "block";
                playListItem[track].getElementsByClassName("play")[0].style.display = "none";
                playListItem[track].style.background = "rgb(64, 196, 255)";
                playListItem[k].style.boxShadow = "inset 2px 2px 4px 0px #4e7b90";
            } else {
                playListItem[k].getElementsByClassName("play")[0].style.display = "block";
                playListItem[k].getElementsByClassName("pause")[0].style.display = "none";
                playListItem[k].style.background = "rgb(6, 158, 226)";
                playListItem[k].style.boxShadow = "none";
            }

        }
        loadAudionFromList(track);
    }
    //forward
    function forward() {
        let track = document.getElementById("audioSource").getAttribute("data-trackNum");
        track = Number(track);
        track += 1;
        if (track == playList.length) {
            track = 0;
        }
        for (k = 0; k < playButton.length; k++) {
            if (k == track) {
                playListItem[track].getElementsByClassName("pause")[0].style.display = "block";
                playListItem[track].getElementsByClassName("play")[0].style.display = "none";
                playListItem[track].style.background = "rgb(64, 196, 255)";
                playListItem[k].style.boxShadow = "inset 2px 2px 4px 0px #4e7b90";
            } else {
                playListItem[k].getElementsByClassName("play")[0].style.display = "block";
                playListItem[k].getElementsByClassName("pause")[0].style.display = "none";
                playListItem[k].style.background = "rgb(6, 158, 226)";
                playListItem[k].style.boxShadow = "none";
            }

        }
        loadAudionFromList(track);
    }
    //on track end go to next track
    document.getElementById("audioSource").onended = function () {
        forward();
    };
    //seeking the track on PC

    document.getElementById("progressBar").addEventListener('click', (e) => {
        let width = window.innerWidth;
        if (width <= 600) {
            delta = ((e.clientX) / (window.innerWidth)) * 100;
            let now = (document.getElementById("audioSource").duration / 100) * delta;
            document.getElementById("audioSource").currentTime = now;
            document.getElementById("progress").style.width = delta + '%';
            console.log(delta);
        } else {
            delta = ((e.clientX - window.innerWidth / 4) / (window.innerWidth / 2)) * 100;
            let now = (document.getElementById("audioSource").duration / 100) * delta;
            document.getElementById("audioSource").currentTime = now;
            document.getElementById("progress").style.width = delta + '%';
            console.log(delta);
        }



    });

    //seeking the track on MOBILE
    document.getElementById("progressBar").addEventListener('touchmove', (e) => {
        let width = window.innerWidth;
        if (width <= 600) {
            delta = ((e.targetTouches[0].pageX) / (window.innerWidth)) * 100;
            let now = (document.getElementById("audioSource").duration / 100) * delta;
            document.getElementById("audioSource").currentTime = now;
            document.getElementById("progress").style.width = delta + '%';
            console.log(delta);
        } else {
            delta = ((e.targetTouches[0].pageX - window.innerWidth / 4) / (window.innerWidth / 2)) * 100;
            let now = (document.getElementById("audioSource").duration / 100) * delta;
            document.getElementById("audioSource").currentTime = now;
            document.getElementById("progress").style.width = delta + '%';
            console.log(delta);
        }
    });
    //load new audio from list
    function loadAudionFromList(i) {
        let duration;
        //attach new src and load to play  
        document.getElementById("mp3_src").src = playList[i];
        document.getElementById("download").setAttribute("href", playList[i]);
        document.getElementById("trackName").innerHTML = playListItem[i].getElementsByClassName("trackName")[0].innerHTML;
        document.getElementById("audioSource").setAttribute("data-trackNum", i);
        document.getElementById("audioSource").load();
        //get track durration after loading
        document.getElementById("audioSource").onloadedmetadata = function () {
            duration = document.getElementById("audioSource").duration;
            let sec = Math.floor((duration % 60));
            let min = Math.floor((duration / 60));

            document.getElementById("duration").innerHTML = min + ':' + sec;
            document.getElementById("audioSource").play();
        };
        //listen to time line update
        document.getElementById("audioSource").ontimeupdate = function () {
            let time = document.getElementById("audioSource").currentTime;
            let sec = Math.floor((time % 60));
            let min = Math.floor((time / 60));
            percent = ((time / duration) * 100).toFixed(0);
            document.getElementById("progress").style.width = percent + '%';
            document.getElementById("timer").innerHTML = min + ':' + sec + '/';
        };
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "block";
    }
});