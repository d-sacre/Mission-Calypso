
function getHemiLight(){
	let hemiLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1.2);
	hemiLight.position.set(0,100,000);
	return hemiLight;
}

function getDirectLight(){
	var directLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directLight.position.set( 0, 100, 100 );
	return directLight;
}
