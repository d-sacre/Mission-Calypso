"use strict";

var group, group2, groupSurface;
var NUMELEMENTS=20;
var BOXSIZE = new THREE.Vector3(200, 200, 200);
var SURFACEMULTI = 1000;
var ROCKHIGHT=5;

function buildModel() {

	var mesh, mesh1, mesh2, model;

	var texUnderground = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sandstone_512x512px.jpg" );
	var texEdge = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sand_highres_edge_128x128.jpg" );
	var texSurface = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sand_highres_top_512x512_compress.jpg" );

	//Resources
	var texPotassium = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sandstone_caloricum_512x512px.jpg" );
	var texCaloricum = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sandstone_copper_512x512px.jpg" );
	var texCopper = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/sandstone_pottasium_512x512px.jpg" );


	var texMetalGreenNor = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/green_metal_rust_Nor_1k.jpg" );
	var texMetalGreenAo = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/green_metal_rust_AO_1k.jpg" );
	var texMetalGreenRu = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/green_metal_rust_rough_1k.jpg" );
	var texMetalPlateBump = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/metal_plate_bump_1k.jpg" );





	let matMetalGreen = new THREE.MeshStandardMaterial( {
		color: 0x888888,
		roughness: 1,
		metalness: 0.4,
		normalMap: texMetalGreenNor,
		normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?
		aoMap: texMetalGreenAo,
		aoMapIntensity: 1,
		//displacementMap: displacementMap,
		//displacementScale: settings.displacementScale,
		//displacementBias: - 0.428408, // from original model
		//envMap: reflectionCube,
		//envMapIntensity: settings.envMapIntensity,
		side: THREE.DoubleSide
	} );

	let matMetalSilver = new THREE.MeshPhongMaterial( { map: texMetalPlateBump, wireframe: false});



	var matUnderground = new THREE.MeshPhongMaterial( { map: texUnderground, wireframe: false});
	var matEdge = new THREE.MeshPhongMaterial( { map: texUnderground, wireframe: false});

	//resources
	var matPot = new THREE.MeshPhongMaterial( { map: texPotassium, wireframe: false});
	var matCal = new THREE.MeshPhongMaterial( { map: texCaloricum, wireframe: false});
	var matCop = new THREE.MeshPhongMaterial( { map: texCopper, wireframe: false});

	var matSurface = new THREE.MeshPhongMaterial( { map: texUnderground, wireframe: false});
	var geoUnderground = new THREE.BoxBufferGeometry( BOXSIZE.x , BOXSIZE.y,  BOXSIZE.z);
	var geoSurface = new THREE.BoxBufferGeometry( SURFACEMULTI*BOXSIZE.x , BOXSIZE.y/2, SURFACEMULTI*BOXSIZE.y );
	var geoEdge = new THREE.BoxBufferGeometry( BOXSIZE.x , BOXSIZE.y/2, BOXSIZE.z );


	//creation of the edge
	model = new THREE.Group();
	groupSurface= new THREE.Group();
	let numberRows =2;
	for(let x=-NUMELEMENTS; x<NUMELEMENTS; x++){
			for(let z=0; z<numberRows; z++){
				mesh1 = new THREE.Mesh( geoEdge, matEdge );
				var pos1 = new THREE.Vector3(x*BOXSIZE.x, 0.75*BOXSIZE.y, -z*BOXSIZE.x);
				mesh1.position.copy(pos1);
				if(z===0) {
					let name = "(" + x + ")";
					mesh1.name= name;
				}
				
				mesh1.receiveShadow = true;
				mesh1.castShadow = true;
				groupSurface.add( mesh1 );
		}
	}
	model.add(groupSurface);

	//creation of the plain big surface
	mesh2 = new THREE.Mesh( geoSurface, matSurface );
	var pos2 = new THREE.Vector3(0, 0.75*BOXSIZE.y, -((SURFACEMULTI*BOXSIZE.y)/2+BOXSIZE.z*3/2));
	mesh2.position.copy(pos2);
	mesh2.receiveShadow = true;
	mesh2.castShadow = true;
	groupSurface.add( mesh2 );

	//creation of the underground boxes
	group = new THREE.Group();
	group2 = new THREE.Group();
	let groups = [group, group2];

	//set probability of rescourses
	function randMat(){
		let ranNum=Math.random();
		//console.log(returnVal);
		let returnVal;
		if(ranNum<0.8){
			returnVal=0;
			return returnVal;
		}
		if(0.8<=ranNum&&ranNum<0.9){
			returnVal=1;
			return returnVal;
		}
		if(0.9<=ranNum&&ranNum<0.95){
			returnVal=2;
			return returnVal;
		}
		if(0.95<=ranNum&&ranNum<=1){
			returnVal=3;
			return returnVal;
		}
	}

	for(var z=0; z<2; z++){
		for(var x=-NUMELEMENTS; x<NUMELEMENTS; x++){
			let xt=x+20;
			for(var y=0; y<NUMELEMENTS; y++){
				let material;
				if (z===0){
					let xyt=xt+y;
					//bitte var lassen
					var materialMapContent=randMat();
					if (materialMapContent==0){
						material = matUnderground.clone();
					}
					if (materialMapContent==1){
						material = matCal.clone();
					}
					if (materialMapContent==2){
						material = matCop.clone();
					}
					if (materialMapContent==3){
						material = matPot.clone();
					}
				} else {
					material= matUnderground.clone();
			}


				mesh = new THREE.Mesh( geoUnderground, material );
				let pos = new THREE.Vector3(x*BOXSIZE.x, -y*BOXSIZE.y, -z*BOXSIZE.z);
				mesh.position.copy(pos);
				if(z===0) {
					let name = "(" + x + "|" + y + ")";
					mesh.name= name;
					mesh.userData.positionX = x;
					mesh.userData.positionY = y;
					mesh.userData.material = materialMapContent;
				}
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				groups[z].add( mesh );
			}
		}
	}



	//other stuff like rocket...


	//Rocket-body:
	let groupRocket =new THREE.Group();
	let texRocketCube = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/pictures/textures/mainrocket_texture.jpg" );
	let matRocketCube1 = new THREE.MeshPhongMaterial( { map: texRocketCube, wireframe: false});
	let geoRocketCube1 = new THREE.BoxBufferGeometry( BOXSIZE.x*0.3 , BOXSIZE.y,  BOXSIZE.z);
	for(x=-2;x<=2;x+=4){
		for(let y=1.5; y<5.5*ROCKHIGHT; y++){
			let meshRocketCube1;
			let posRocketCube1 = new THREE.Vector3(x*BOXSIZE.x, y*BOXSIZE.y, BOXSIZE.y*0);
			meshRocketCube1 = new THREE.Mesh( geoRocketCube1, matMetalSilver );
			meshRocketCube1.position.copy(posRocketCube1);
			meshRocketCube1.receiveShadow = true;
			meshRocketCube1.castShadow = true;
			groupRocket.add( meshRocketCube1 );
		}
	}
	for(x=-1;x<=1;x+=1){
		for(let y=1.5; y<5.5*ROCKHIGHT; y++){
			let meshRocketCube1;
			let posRocketCube1 = new THREE.Vector3(x*BOXSIZE.x, y*BOXSIZE.y, -1*BOXSIZE.z*1.5);

			meshRocketCube1 = new THREE.Mesh( geoRocketCube1, matRocketCube1 );
			meshRocketCube1.position.copy(posRocketCube1);
			meshRocketCube1.receiveShadow = true;
			meshRocketCube1.castShadow = true;
			meshRocketCube1.rotateY( Math.PI / 2 );
			groupRocket.add( meshRocketCube1 );
		}
	}

	for(x=-1.75;x<=1.75;x+=3.5){
		for(let y=1.5; y<5.5*ROCKHIGHT; y++){
			let meshRocketCube1;
			meshRocketCube1 = new THREE.Mesh( geoRocketCube1, 	matRocketCube1 );
			meshRocketCube1.rotateY( Math.sign(x)* Math.PI / 5.4 );
			meshRocketCube1.receiveShadow = true;
			meshRocketCube1.castShadow = true;
			let posRocketCube1 = new THREE.Vector3(x*BOXSIZE.x, y*BOXSIZE.y, BOXSIZE.z*(-1.0));
			meshRocketCube1.position.copy(posRocketCube1);
			groupRocket.add( meshRocketCube1 );
		}
	}

	//Rocket fuel tanks:


	var geoRocketTank = new THREE.CylinderBufferGeometry( 1.5*BOXSIZE.x, 1.5*BOXSIZE.x, 7*BOXSIZE.x, 32 );
	for(x=-3.3;x<=3.3;x+=6.6){
			let meshRocketTank;
			meshRocketTank = new THREE.Mesh( geoRocketTank, 	matRocketCube1 );
			meshRocketTank.receiveShadow = true;
			meshRocketTank.castShadow = true;
			let posRocketCube1 = new THREE.Vector3(x*BOXSIZE.x, 5*BOXSIZE.y, BOXSIZE.z*(-1.0));
			meshRocketTank.position.copy(posRocketCube1);
			groupRocket.add( meshRocketTank );
	}

/*	let meshRocketTank;
	meshRocketTank = new THREE.Mesh( geoRocketTank, 	matMetalSilver );
	meshRocketTank.receiveShadow = true;
	meshRocketTank.castShadow = true;
	let posRocketCube1 = new THREE.Vector3(0*BOXSIZE.x, 4*BOXSIZE.y, BOXSIZE.z*(-3.3));
	meshRocketTank.position.copy(posRocketCube1);
	groupRocket.add( meshRocketTank );
	*/
	group.add( groupRocket );
	// Rocket bottom:
	var geoRocketBottom = new THREE.RingBufferGeometry( 1.9*BOXSIZE.x, 5, 32 );
	var matRocketBottom = new THREE.MeshBasicMaterial( { map: texRocketCube, side: THREE.DoubleSide,  } );
	let meshRocketBottom;
	meshRocketBottom = new THREE.Mesh( geoRocketBottom, 	matRocketBottom );
	meshRocketBottom.receiveShadow = true;
	meshRocketBottom.castShadow = true;
	let posRocketBottom = new THREE.Vector3(0*BOXSIZE.x, 5.5*BOXSIZE.y*ROCKHIGHT, BOXSIZE.z*0);
	meshRocketBottom.position.copy(posRocketBottom);
	meshRocketBottom.rotateX( Math.PI / 2 );
	groupRocket.add( meshRocketBottom );

	//Rocket tank
	var geoRocketTank = new THREE.CylinderBufferGeometry( 1.5*BOXSIZE.x, 1.5*BOXSIZE.x, 7*BOXSIZE.x, 32 );
	for(x=-3.3;x<=3.3;x+=6.6){
			let meshRocketTank;
			meshRocketTank = new THREE.Mesh( geoRocketTank, 	matRocketCube1 );
			meshRocketTank.receiveShadow = true;
			meshRocketTank.castShadow = true;
			let posRocketCube1 = new THREE.Vector3(x*BOXSIZE.x, 5*BOXSIZE.y, BOXSIZE.z*(-1.0));
			meshRocketTank.position.copy(posRocketCube1);
			groupRocket.add( meshRocketTank );
	}
	/*
	let meshRocketTank;
	meshRocketTank = new THREE.Mesh( geoRocketTank, 	matRocketCube1 );
	meshRocketTank.receiveShadow = true;
	meshRocketTank.castShadow = true;
	let posRocketCube1 = new THREE.Vector3(0*BOXSIZE.x, 4*BOXSIZE.y, BOXSIZE.z*(-3.3));
	meshRocketTank.position.copy(posRocketCube1);
	groupRocket.add( meshRocketTank );
	group.add( groupRocket );
	*/
	model.add(groups[0]);
	model.add(groups[1]);

	return model;
}
