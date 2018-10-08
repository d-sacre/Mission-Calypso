
function buildFigure(){
	let texFig = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/spacer_try3_flame.png" ); //old: "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/flametest_256x256px.png"
	let matFig = new THREE.MeshPhongMaterial( { map: texFig, transparent: true, opacity: 1});
	let geoFig = new THREE.BoxBufferGeometry( BOXSIZE.x, BOXSIZE.y,  BOXSIZE.z/2); // default: ( BOXSIZE.x/2 , BOXSIZE.y/2,  BOXSIZE.z/2)
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
	let texDrill = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/drill_texture.png" );
	let matDrill = new THREE.MeshBasicMaterial( {color:0x535353, wireframe: true});
	let geoDrill = new THREE.CylinderBufferGeometry( 0.5*BOXSIZE.x, 0*BOXSIZE.x, 1.0*BOXSIZE.x, 32 );
	let meshDrill = new THREE.Mesh( geoDrill, matDrill );
	meshDrill.receiveShadow = false;
	meshDrill.castShadow = false;
	let posDrill = new THREE.Vector3(0, 0.5*BOXSIZE.y, BOXSIZE.z*(0.8));
	meshDrill.position.copy(posDrill);
	let name = "Drill";
	meshDrill.name= name;
	return meshDrill;
}

function buildInnerDrill(){
	let texDrill = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/drill_texture.png" );
	let matDrill = new THREE.MeshBasicMaterial( {color:0xFFD700, wireframe: false}); //0xB5B5B5
	let geoDrill = new THREE.CylinderBufferGeometry( 0.45*BOXSIZE.x, 0*BOXSIZE.x, 0.9*BOXSIZE.x, 32 );
	let meshDrill = new THREE.Mesh( geoDrill, matDrill );
	meshDrill.receiveShadow = false;
	meshDrill.castShadow = false;
	let posDrill = new THREE.Vector3(0, 0.5*BOXSIZE.y, BOXSIZE.z*(0.8));
	meshDrill.position.copy(posDrill);
	let name = "InnerDrill";
	meshDrill.name= name;
	return meshDrill;
}




