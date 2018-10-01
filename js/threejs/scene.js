var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), intersected;
var figure, drill, spotLight;
var container;
var camera, controls, scene, renderer;
var sky, sunSphere;
var targetPosition;
var verticalMode = true;
var SPEED=5;
var stages = 6;


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
		inclination: 0.4, // elevation / inclination
		azimuth: 0.3, // Facing front,
		sun: ! true
	};
	var distance = 40000000000;
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

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 30, 2000000 );
	renderer = new THREE.WebGLRenderer({antialias: true});

	//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
	camera.position.set( 0, 3*BOXSIZE.x, 100*BOXSIZE.x );
	camera.lookAt( 0, 0, 0 );
	//camera.setLens(20);

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
	controls.maxPolarAngle = Math.PI / 2;
	controls.enableZoom = false;
	controls.enablePan = false;
	initSky();

	var helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
	scene.add( helper );

	var spotLight = getSpotLight();
	scene.add( spotLight );

	let hemiLight = getHemiLight();
	scene.add( hemiLight );

	let lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );

	let model = buildModel();
	scene.add(model);

	figure =buildFigure();
	scene.add(figure);
	targetPosition = getPlayerPosition();

	drill =buildDrill();
	scene.add(drill);
	//targetPosition = getPlayerPosition();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onMouseClick, false);

	window.addEventListener( 'resize', onWindowResize, false );
}

function onMouseClick(event){
	targetPosition = getTargetPosition(event);
}

function getPlayerPosition(){
	let currentPlayerPos = figure.position.clone();
	return currentPlayerPos;
}

function getTargetPosition(event){
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let targetBlocks = scene.children[6].children[1];
	var intersections = raycaster.intersectObjects( targetBlocks.children );

	if(intersections.length > 0 && intersections[0].object.userData.positionY < stages) {
		let pos = intersections[0].object.position.clone();
		return pos;
	}
	return targetPosition;
}




function updateFigPostitions(posPlayer,posTarget) {
	if(posPlayer.equals(posTarget)) {
		return;}

	let isInCorrectRow = (posPlayer.y === posTarget.y);
	let isCentered = (posPlayer.x === 0);
	let isInCorrectColumn = (posPlayer.x === posTarget.y);

	let nullPositionX = new THREE.Vector3(0,posPlayer.y,0),
		speed = SPEED;


	if(!isCentered && !isInCorrectRow) {
		playerGotoX(posPlayer, nullPositionX);
	}
	if(!isInCorrectRow && isCentered) {
		playerGotoY(posPlayer, posTarget);
	}
	if(isInCorrectRow) {
		playerGotoX(posPlayer, posTarget);
	}

}
function playerGotoX(posPlayer, posTarget) {
	let speed = SPEED;

	currentPlayerPos = posPlayer;
	targetPlayerPos = posTarget;

	let dX = targetPlayerPos.x - currentPlayerPos.x,
	dY = targetPlayerPos.y - currentPlayerPos.y;


	if(dX < speed) {
		deleteCubeUnderground((currentPlayerPos.x / 200)-1, (currentPlayerPos.y / -200));
		currentPlayerPos.x -= speed;
		figure.position.copy(currentPlayerPos);
	}
	if(dX > speed) {
		deleteCubeUnderground((currentPlayerPos.x / 200)+1, (currentPlayerPos.y / -200));
		currentPlayerPos.x += speed;
		figure.position.copy(currentPlayerPos);
	}
	if(dX <= speed && dX >= -speed) {
		currentPlayerPos.x = targetPlayerPos.x;
		figure.position.copy(currentPlayerPos);
	}
}

function playerGotoY(posPlayer, posTarget) {
	let speed = SPEED;

	currentPlayerPos = posPlayer;
	targetPlayerPos = posTarget;

	let dX = targetPlayerPos.x - currentPlayerPos.x,
	dY = targetPlayerPos.y - currentPlayerPos.y;

	if(dY < speed) {
		currentPlayerPos.y -= speed;
		figure.position.copy(currentPlayerPos);
	}

	if(dY > speed) {
		currentPlayerPos.y += speed;
		figure.position.copy(currentPlayerPos);
	}
	if(dY <= speed && dY >= -speed) {
		currentPlayerPos.y = targetPlayerPos.y;
		figure.position.copy(currentPlayerPos);
	}
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

/*function updateDrillPosition(speedDrill){
	let currentDrillPos = drill.position.clone();
	if(posPlayer.equals(posTarget)) {
		return;}
	let nullPositionX = new THREE.Vector3(0,posPlayer.y,0),
		speedD = speedDrill;
	//drill.position.copy(currentPlayerPos);
}

function drillGotoY(posPlayer, posTarget) {
	let speedD = SPEED;

	currentPlayerPos = posPlayer;
	targetPlayerPos = posTarget;
}
*/

function render() {
	// update the picking ray with the camera and mouse position

	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	let targetBlocks = scene.children[6].children[1]
	var intersections = raycaster.intersectObjects( targetBlocks.children );

		/*
	if(intersects[0].object.name !== "") {
	//targetBlocks.remove(intersects[0].object);

	intersects[0].object.material.emissive.setHex( 0xff0000 );
	}
*/
			if ( intersections.length > 0 && intersections[0].object.userData.positionY < stages) {
				if ( intersected != intersections[ 0 ].object ) {
					if ( intersected ) intersected.material.color.setHex( 0xffffff );
					intersected = intersections[ 0 ].object;
					intersected.material.color.setHex( 0xff0000 );
				}
			}
			else if ( intersected ) {
				intersected.material.color.setHex( 0xffffff );
				intersected = null;
			}


	renderer.render( scene, camera );
}


function animate() {
	requestAnimationFrame( animate );
	updateFigPostitions(getPlayerPosition(),targetPosition);
	render();
	controls.update();
}
