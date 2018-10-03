
function buildDrill(){
	var loader = new THREE.FBXLoader();
	loader.load( 'models/fbx/Samba Dancing.fbx', function ( object ) {
		object.mixer = new THREE.AnimationMixer( object );
		mixers.push( object.mixer );
		
		var action = object.mixer.clipAction( object.animations[ 0 ] );
		action.play();
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		return object;
	} );
}