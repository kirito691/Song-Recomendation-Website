const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

songIndex = 0;
songs = ['./assets/music/beyonce.mp3', './assets/music/dontstartnow.mp3']; // object storing paths for audio objects
thumbnails = ['./assets/images/lemonade.png', './assets/images/dontstartnow.png']; // object storing paths for album covers and backgrounds
songArtists = ['Beyonce', 'Dua Lipa']; // object storing track artists
songTitles = ["Don't Hurt Yourself", "Don't Start Now"]; // object storing track titles

var width = 320; // We will scale the photo width to this
var height = 0; // This will be computed based on the input stream

var streaming = false;

var video = null;
var canvas = null;
var photo = null;
var startbutton = null;

var localstream = null;

var take_pictures = false;

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";
        
        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"
        
        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

function suggestedSong(Index){
    console.log(Index);
    songIndex = Index;
    song.src = songs[songIndex];
    // thumbnail.src = thumbnails[songIndex];
    // background.src = thumbnails[songIndex];
    thumbnail.src = songLink
    background.src = songLink

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 
function nextSong() {
    songIndex++;
    if (songIndex > 1) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 1;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};



        

function startup() {
video = document.getElementById('video');
canvas = document.getElementById('canvas');
photo = document.getElementById('photo');
startbutton = document.getElementById('startbutton');

navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(function(stream) {
        video.srcObject = stream;
        localstream = stream;
        take_pictures = true;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

video.addEventListener('canplay', function(ev) {
    if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        if (isNaN(height)) {
            height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
    }
}, false);


startbutton.addEventListener('click', function(ev) {
    if (take_pictures) {
        takepicture();
        ev.preventDefault();
    }
}, false);

setInterval(function () {document.getElementById("startbutton").click();}, 1000);

clearphoto();
}

/*
function myClick() {
setTimeout(
    function() {
        takepicture();
    }, 2000);
}
*/


function clearphoto() {
var context = canvas.getContext('2d');
context.fillStyle = "#AAA";
context.fillRect(0, 0, canvas.width, canvas.height);

var data = canvas.toDataURL('image/png');
photo.setAttribute('src', data);
}

function takepicture() {
var context = canvas.getContext('2d');
if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    var hiddenButton = document.getElementById("hidden_btn");
    hiddenButton.click();
} else {
    clearphoto();
}
}

function vidOff() {
/* video = document.getElementById('video');*/
video.pause();
video.src = "";
localstream.getTracks()[0].stop();
console.log("Video off");
}

//setTimeout("takepicture()", 1000);

//setInterval(function () {document.getElementById("startbutton").click();}, 1000);

//window.addEventListener('load', startup, false);
btn = document.getElementById('clickbutton');
btn.addEventListener('click', startup, false);

stopbutton.addEventListener('click', function(ev) {
    vidOff();
    take_pictures = false;
    ev.preventDefault();
}, false);
var ccc = 0;
$("#hidden_btn").click(function() {
//var v = "hello pk";
var display_dynamic_btn = document.getElementById("suggest-btn");
display_dynamic_btn.click();

photo = document.getElementById('photo');
console.log(ccc);
ccc += 1;

var newcanvas = document.createElement('canvas');
var context = canvas.getContext('2d');
context.drawImage(photo, 0, 0);
//console.log(context.getImageData(0, 0, 1, 1).data);

var width = newcanvas.width, height = newcanvas.height;
// console.log(height)
// console.log(width)
// create 2d matrix of size width*height
var img_data = new Array(height);
for (var y = 0; y < height; y++) {
    img_data[y] = new Array(width);
    for (var x = 0; x < width; x++) {
        img_data[y][x] = context.getImageData(x,y,1,1).data;
    }
}

var arr = [1,2,3];

$.ajax({
    type : 'POST',
    url : "http://127.0.0.1:5000/",
    //contentType: 'application/json;charset=UTF-8',
    data : {'data': JSON.stringify(img_data)}
});

// console.log(width);
});
$("#suggest-btn").click(function(){
    var text = "ES16"

    $.ajax({
        url: "/suggest",
        type: "get",
        data: {jsdata: text},
        success: function(response) {
            $("#place_for_suggestions").html(response);
            console.log("SUCCESS");
            console.log(response);
        },
        error: function(xhr) {
            //Do Something to handle error
        }
    });
});

