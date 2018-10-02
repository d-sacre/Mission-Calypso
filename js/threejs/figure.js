
function buildFigure(){
	//var texUnderground = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/granite_highres_withoutedge_256x256_compress.jpg" );
	var matFig = new THREE.MeshPhongMaterial( {color:0xff0000, wireframe: false});
	let geoFig = new THREE.BoxBufferGeometry( BOXSIZE.x/2 , BOXSIZE.y/2,  BOXSIZE.z/2);
	let meshFig = new THREE.Mesh( geoFig, matFig );

	
	let posFig = new THREE.Vector3(0*BOXSIZE.x, 1.5*BOXSIZE.y, BOXSIZE.y*0);
	meshFig.position.copy(posFig);
	let name = "Fig1";
	meshFig.name= name;
	meshFig.receiveShadow = true;
	meshFig.castShadow = true;
	return meshFig;
}

function buildDrill(){
	let texDrill = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/pink-and-green-lined-background.jpg" );
	let matDrill = new THREE.MeshPhongMaterial( {  wireframe: true});
	let geoDrill = new THREE.CylinderBufferGeometry( 1.5*BOXSIZE.x, 0*BOXSIZE.x, 1*BOXSIZE.x, 5 );
	let meshDrill = new THREE.Mesh( geoDrill, matDrill );
	//meshDrill.rotateY( Math.sign(x)* Math.PI / 5.4 );
	meshDrill.receiveShadow = true;
	meshDrill.castShadow = true;
	let posDrill = new THREE.Vector3(0, 0.5*BOXSIZE.y, BOXSIZE.z*(1));
	meshDrill.position.copy(posDrill);
	let name = "Drill";
	meshDrill.name= name;
	return meshDrill;
}