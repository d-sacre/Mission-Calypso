function getSpotLight() {
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, -20, 70 );
	//spotLight.lookAt(0,0,0);

	spotLight.castShadow = true;
	spotLight.penumbra = 0.05;
	spotLight.decay = 0;
	spotLight.distance = 200;
	spotLight.angle = 2;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 1000;

	return spotLight;
}

function getHemiLight(){
	let hemiLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1.2);
	hemiLight.position.set(0,100,000);
	return hemiLight;
}
