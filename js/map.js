function buildModel() {				
	NUMELEMENTS=200;		
	var mesh, mesh1, mesh2, group, groupSurface, model;
	
	var texture = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/test.jpg" );
	var texture1 = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/test1.jpg" );
	var material = new THREE.MeshPhongMaterial( { map: texture, wireframe: false});
	var material1 = new THREE.MeshPhongMaterial( { map: texture1, wireframe: false});
	var geometry = new THREE.BoxBufferGeometry( 2 , 2, 2 );
	var geoSurface = new THREE.BoxBufferGeometry( 2 , 1, 2 );
	var geoSurface1 = new THREE.BoxBufferGeometry( 2000 , 1, 2000 );
	
	model = new THREE.Group();
	groupSurface= new THREE.Group();
	for(var a=-NUMELEMENTS*5; a<NUMELEMENTS*5; a+=2){
			for(var b=0; b<2; b+=2){
				mesh1 = new THREE.Mesh( geoSurface, material1 );
				var pos1 = new THREE.Vector3(a, 1.5, -b);
				mesh1.position.copy(pos1);
				//let name = "(" + a + "|" + b + ")";
				//mesh1.name= name;
				mesh1.receiveShadow = true;
				mesh1.castShadow = true;
				groupSurface.add( mesh1 );	
		}
	}
	model.add(groupSurface);
	
	mesh2 = new THREE.Mesh( geoSurface1, material1 );
	var pos2 = new THREE.Vector3(0, 1.5, -1001);
	mesh2.position.copy(pos2);
	mesh2.receiveShadow = true;
	mesh2.castShadow = true;
	groupSurface.add( mesh2 );	
	

	
	group = new THREE.Group();
	for(var m=0; m<4; m+=2){
		for(var i=-NUMELEMENTS; i<NUMELEMENTS; i+=2){
			for(var j=-NUMELEMENTS; j<1; j+=2){
				mesh = new THREE.Mesh( geometry, material );
				let pos = new THREE.Vector3(i, j, -m);
				mesh.position.copy(pos);
				if(m===0) {
					let name = "(" + i + "|" + j + ")";
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