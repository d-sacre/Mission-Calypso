
var video = document.getElementsByTagName('video')[0];

video.onended = function(e) {
    playAudioById("fail-music");

    document.querySelector('#rocket-explode-popup').style.display="block";
    document.querySelector('#rocket-explode-video').style.display="none";
}
