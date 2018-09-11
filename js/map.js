function buildModel() {				
				
	var mesh, mesh1, group, groupSurface, model;
	
	var texture = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/test.jpg" );
	var texture1 = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/graphics/pictures/textures/test1.jpg" );
	var material = new THREE.MeshBasicMaterial( { map: texture, wireframe: false});
	var material1 = new THREE.MeshBasicMaterial( { map: texture1, wireframe: false});
	var geometry = new THREE.BoxBufferGeometry( 1 , 1, 1 );
	
	model = new THREE.Group();
	groupSurface= new THREE.Group();
	for(var a=-100; a<100; a++){
			for(var b=0; b<100; b++){
				mesh1 = new THREE.Mesh( geometry, material1 );
				var pos1 = new THREE.Vector3(a, 1, b);
				mesh1.position.copy(pos1);
				groupSurface.add( mesh1 );	
		}
	}
	model.add(groupSurface);
	
	group = new THREE.Group();
	for(var m=0; m<2; m++){
		for(var i=-100; i<100; i++){
			for(var j=-100; j<1; j++){
				mesh = new THREE.Mesh( geometry, material );
				let pos = new THREE.Vector3(i, j, m);
				mesh.position.copy(pos);
				group.add( mesh );	
			}
		}
	}
	model.add(group);
	return model;		
}