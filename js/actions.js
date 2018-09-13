






function deleteCubeUnderground(x, y){
	let cube = scene.getObjectByName( "(" + x + "|" + y + ")");
	group.remove(cube);
}

function deleteCubeEdge(x){
	let cube = scene.getObjectByName( "(" + x + ")");
	groupSurface.remove(cube);
}


function walk(x, y) {
	let fig = scene.getObjectByName( "Fig1");
	let posStart = 0;
	let delta = BOXSIZE.x*0.1;
	
	var delayInMilliseconds = 100; //1 second
	for(let pos=posStart; pos==x; x+=delta ){
		setTimeout(fig.translateX(pos), delayInMilliseconds);
	}	
}

function drill(fuel) {
	for(let x=-1; x<2; x++){
			deleteCubeEdge(x);
	}

	for(let x=-1; x<2; x++){
		for (let y=0; y<3; y++){
			deleteCubeUnderground(x, y);
		}
	}
}

function sporn(){
	drill();
	let fig = scene.getObjectByName( "Fig1");
	var posFig = new THREE.Vector3(0*BOXSIZE.x, -2*BOXSIZE.y, 0);
	meshFig.position.copy(posFig);	
}