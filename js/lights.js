function getSpotLight() {
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 200, -400 );
	spotLight.lookAt(0,0,0);

	spotLight.castShadow = true;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;
	spotLight.angle = 0.98;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 1000;
	
	return spotLight;
}

function getHemiLight(){
	let hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
	return hemiLight;
	
	
}
