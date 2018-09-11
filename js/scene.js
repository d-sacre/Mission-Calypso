let camera, scene, renderer, controls;
init();
animate();
function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;
	camera.lookAt( 0, 0, 0 );
	
	scene = new THREE.Scene();

	initRenderer();
	initControls();
	
	let ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
	scene.add( ambient );

	window.addEventListener( 'resize', onWindowResize, false );
	document.body.appendChild( renderer.domElement );

	let spotLight = getSpotlight();
	scene.add( spotLight );
	
	let lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );

	let model = buildModel();
	scene.add(model);	
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

function initControls() {
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = 100;
	controls.maxDistance = 500;
	controls.maxPolarAngle = Math.PI / 2;	
}

function initRenderer() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	
}
