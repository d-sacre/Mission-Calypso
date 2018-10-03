
function buildDrill(){
	var loader = new THREE.FBXLoader();
	loader.load( "https://raw.githubusercontent.com/vinzentp/Mission-Calypso/abgabe/3dmodels/maindrill.fbx", function ( object ) {
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