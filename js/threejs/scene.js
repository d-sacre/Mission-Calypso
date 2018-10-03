var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), intersected;
var figure, drillObj, pointLight;
var container;
var camera, controls, scene, renderer;
var sky, sunSphere;
var targetPosition;
var verticalMode = true;
var SPEED=5; //only multiples of 5 allowed
var stages; //maximum 9 allowed, because max 9 rows are visible



init();
animate();


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

		
	let model = buildModel();
	scene.add(model);

	figure = buildFigure();
	scene.add(figure);
	targetPosition = getPlayerPosition();

	drillObj = buildDrill();
	scene.add(drillObj);
	//targetDrillPos = drillObj.position.clone();
	
	let directLight1 = getDirectLight();
	scene.add( directLight1 );
	
	let directLight2 = getDirectLight();
	directLight1.position.set( 100, 100, -100 );
	directLight1.intensity=1;
	scene.add( directLight2 );
	
	pointLight = getPointLight();
	scene.add( pointLight );
	pointLight.position.set(targetPosition.x, (targetPosition.y + 1*BOXSIZE.x), targetPosition.z);
	
	var sphereSize = 300;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	//scene.add( pointLightHelper );
	
	let spotLight = getSpotLight();
	scene.add( spotLight );
	
	let rectLight = getRectLight();
	scene.add( rectLight );
	
	let rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
	rectLightMesh.scale.x = rectLight.width;
	rectLightMesh.scale.y = rectLight.height;
	rectLight.add( rectLightMesh );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onMouseClick, false);

	window.addEventListener( 'resize', onWindowResize, false );
}


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

	let targetBlocks = scene.children[2].children[1];
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
	speed = SPEED * getActualMinerSpeed(); //./threejs_gui_interface.js;


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
	let speed = SPEED * getActualMinerSpeed(); //./threejs_gui_interface.js

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
	let speed = SPEED * getActualMinerSpeed(); //./threejs_gui_interface.js

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


function updateDrillPosition(){
	let speedDrill = SPEED * getActualMainDrillSpeed(); //./threejs_gui_interface.js
	let currentDrillPos = drillObj.position.clone();
	let currentStage = getCurrentStage(currentDrillPos);
	//Fkt. Daniel: Übergabe currentStage
	stages = getMainDrillDestination().destination; //./threejs_gui_interface.js
	let targetDrillPos = getTargetDrillPos(stages);
	
	
	if(currentDrillPos.equals(targetDrillPos)) {
		return;}
	
	
	let dY = targetDrillPos.y - currentDrillPos.y;

	if(dY < speedDrill) {
		currentDrillPos.y -= speedDrill;
		drillObj.position.copy(currentDrillPos);
		//drillObj.rotation.y = (- Math.PI / speedDrill);
		drill((currentDrillPos.y / -200));	
	}

	if(dY > speedDrill) {
		currentDrillPos.y += speedDrill;
		drillObj.position.copy(currentDrillPos);

	}
	
	if(dY <= speedDrill && dY >= -speedDrill) {
		currentDrillPos.y = targetDrillPos.y;
		drillObj.position.copy(currentDrillPos);
	}
}


function getCurrentStage(currentDrillPos){
	if(currentDrillPos.y > -0.5 * BOXSIZE.y && currentDrillPos.y < 0.5 * BOXSIZE.y){
			return 1;
	}
	
	for(let i = 1; i <=8; i++){
		if((currentDrillPos.y < -0.5 * BOXSIZE.y * i) && (currentDrillPos.y > -1.5 * BOXSIZE.y * i)){
			return i+1;
		}
	}
}


function getTargetDrillPos(stages){
	let cubeObj = scene.getObjectByName( "(" + 0 + "|" + stages + ")");
	if(cubeObj != null){
			let targetPosDrill = cubeObj.position.clone();
			return targetPosDrill;	
	}
	return drillObj.position.clone();
}



function render() {
	// update the picking ray with the camera and mouse position

	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	let targetBlocks = scene.children[2].children[1]
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
	//updateDrillPosition(drillObj.position.clone(), getTargetDrillPos());
	updateDrillPosition();
	updateFigPostitions(getPlayerPosition(),targetPosition);
	pointLight.position.set(getPlayerPosition().x, (getPlayerPosition().y + 0.41*BOXSIZE.y), getPlayerPosition().z+ 0.0*BOXSIZE.z);
	render();
	controls.update();
}
