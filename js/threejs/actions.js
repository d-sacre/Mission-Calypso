
function deleteCubeUnderground(x, y){
	let cube = scene.getObjectByName( "(" + x + "|" + y + ")");
	
	if (cube != null){
		let material = cube.userData.material;
		console.log(material);
		//FunktionDaniel: InsHTMLSchreiben

	}
	
	group.remove(cube);
}

function deleteCubeEdge(x){
	let cube = scene.getObjectByName( "(" + x + ")");
	groupSurface.remove(cube);
}




function drill() {
	/*for(let x=-1; x<2; x++){
			deleteCubeEdge(x);
	}

	for(let x=-1; x<2; x++){
		for (let y=0; y<6; y++){
			deleteCubeUnderground(x, y);
		}
	}
	*/

/*
	let cubeEdge = scene.getObjectByName( "(" + 0 + ")");
	if (cubeEdge != null){
		deleteCubeEdge(0);
	}else{
		deleteCubeUnderground(0, stage);
	}

*/
	
}




