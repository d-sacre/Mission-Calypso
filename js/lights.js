function getSpotlight() {
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 0, 40 );
	spotLight.lookAt(0,0,0);

	spotLight.castShadow = true;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 200;
	
	return spotLight;
}

