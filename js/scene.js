var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), intersected;
var figure, spotLight;
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
	
	spotLight = getSpotLight();
	scene.add( spotLight );
	
	let hemiLight = getHemiLight();
	scene.add( hemiLight );
	
	let lightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( lightHelper );
	
	let model = buildModel();
	scene.add(model);
	
	figure =buildFigure();
	scene.add(figure);
	

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onMouseClick, false);
	
	window.addEventListener( 'resize', onWindowResize, false );
}

function onMouseClick(event) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	let targetBlocks = scene.children[6].children[1]
	var intersections = raycaster.intersectObjects( targetBlocks.children );
	
	if(intersections.length > 0) {
		console.log(intersections[0].object.name);
		let pos = intersections[0].object.position.clone();
		pos.z += 200;
		figure.position.copy(pos);
		pos.x += 100;
		spotLight.position.copy(pos);
		pos.x += 100;
		pos.z -= 100;
		spotLight.lookAt(pos);
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



function render() {
	// update the picking ray with the camera and mouse position
	
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	let targetBlocks = scene.children[6].children[1]
	var intersections = raycaster.intersectObjects( targetBlocks.children );
	var texSurface = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/sand_highres_top_512x512_compress.jpg" );
	//console.log(intersects[0].object);
	//console.log(intersects[0].object);
	

		/*
	if(intersects[0].object.name !== "") {
	//targetBlocks.remove(intersects[0].object);
	
	intersects[0].object.material.emissive.setHex( 0xff0000 );

	}
*/
			if ( intersections.length > 0 ) {
				if ( intersected != intersections[ 0 ].object ) {
					if ( intersected ) intersected.material.color.setHex( 0xffffff );
					intersected = intersections[ 0 ].object;
					intersected.material.color.setHex( 0xff0000 );
				}
				//document.body.style.cursor = 'pointer';
			}
			else if ( intersected ) {
				intersected.material.color.setHex( 0xffffff );
				intersected = null;
				//document.body.style.cursor = 'auto';
			}
	

	renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame( animate );
	render();
	controls.update();
	renderer.render( scene, camera );
}
