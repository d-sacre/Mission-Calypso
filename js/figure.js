
function buildFigure(){
	//var texUnderground = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/granite_highres_withoutedge_256x256_compress.jpg" );
	var matFig = new THREE.MeshPhongMaterial( {color:0xff0000, wireframe: false});
	var geoFig = new THREE.BoxBufferGeometry( BOXSIZE.x/2 , BOXSIZE.y/2,  BOXSIZE.z/2);
	meshFig = new THREE.Mesh( geoFig, matFig );

	var posFig = new THREE.Vector3(0*BOXSIZE.x, 0*BOXSIZE.y, BOXSIZE.y*2);
	meshFig.position.copy(posFig);
	let name = "Fig1";
	meshFig.name= name;
	meshFig.receiveShadow = true;
	meshFig.castShadow = true;
	return meshFig;
}