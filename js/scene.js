var container;
var camera, controls, scene, renderer;
var sky, sunSphere;
init();
animate();
function initSky() {
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );
	// Add Sun Helper
	sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700000;
	sunSphere.visible = false;
	scene.add( sunSphere );
	/// GUI
	var effectController  = {
		turbidity: 2.8,
		rayleigh: 0.252,
		mieCoefficient: 0.051,
		mieDirectionalG: 0.981,
		luminance: 1.1,
		inclination: 0.4207, // elevation / inclination
		azimuth: 0.2256, // Facing front,
		sun: ! true
	};
	var distance = 400000;
	function guiChanged() {
		var uniforms = sky.material.uniforms;
		uniforms.turbidity.value = effectController.turbidity;
		uniforms.rayleigh.value = effectController.rayleigh;
		uniforms.luminance.value = effectController.luminance;
		uniforms.mieCoefficient.value = effectController.mieCoefficient;
		uniforms.mieDirectionalG.value = effectController.mieDirectionalG;
		var theta = Math.PI * ( effectController.inclination - 0.5 );
		var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
		sunSphere.position.x = distance * Math.cos( phi );
		sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
		sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
		sunSphere.visible = effectController.sun;
		uniforms.sunPosition.value.copy( sunSphere.position );
		renderer.render( scene, camera );
	}
	guiChanged();
}
function init() {
	camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 30, 2000000 );
	//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
	camera.position.set( 0, 10, 100 );
	camera.lookAt( 0, 0, 0 );
	//camera.setLens(20);
	scene = new THREE.Scene();
	var helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
	scene.add( helper );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
	//controls.maxPolarAngle = Math.PI / 2;
	controls.enableZoom = false;
	controls.enablePan = false;
	initSky();
		let spotLight = getSpotLight();
	scene.add( spotLight );
	
	let hemiLight = getHemiLight();
	scene.add( hemiLight );
	
	let lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );
		let model = buildModel();
	scene.add(model);	
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}
function render() {
	renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
