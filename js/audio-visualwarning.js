function playAudio() {
	var a = document.getElementById('warning');

	if(a.paused) {
		if(a.ended)
			a.currentTime = 0;

		a.play();
	} /*else {

		a.pause();
	}*/
}
function stopAudio() {
	var a = document.getElementById('warning');

  a.pause();

	/*if(!a.paused)
		playAudio();*/

	a.currentTime = 0;

}
