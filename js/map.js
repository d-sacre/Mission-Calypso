var group, groupSurface;
var NUMELEMENTS=20;
var BOXSIZE = new THREE.Vector3(200, 200, 200);
var SURFACEMULTI = 1000;

function buildModel() {				
			
	var mesh, mesh1, mesh2, model;
	
	var texUnderground = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/granite_highres_withoutedge_256x256_compress.jpg" );
	var texEdge = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/sand_highres_edge_128x128.jpg" );
	var texSurface = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/sand_highres_top_512x512_compress.jpg" );
	
	var matUnderground = new THREE.MeshPhongMaterial( { map: texUnderground, wireframe: false});
	var matEdge = new THREE.MeshPhongMaterial( { map: texEdge, wireframe: false});
	var matSurface = new THREE.MeshPhongMaterial( { map: texSurface, wireframe: false});
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
				let name = "(" + x + ")";
				mesh1.name= name;
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
	for(var z=0; z<2; z++){
		for(var x=-NUMELEMENTS; x<NUMELEMENTS; x++){
			for(var y=0; y<NUMELEMENTS; y++){
				let material = matUnderground.clone();
				mesh = new THREE.Mesh( geoUnderground, material );
				let pos = new THREE.Vector3(x*BOXSIZE.x, -y*BOXSIZE.y, -z*BOXSIZE.z);
				mesh.position.copy(pos);
				if(z===0) {
					let name = "(" + x + "|" + y + ")";
					mesh.name= name;
				}
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				group.add( mesh );	
			}
		}
	}
	model.add(group);
	return model;		
}



	

	