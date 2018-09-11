class ResourcesSystem{

	let oxygen = 21;
	let carbondioxid = 0.04;
	let energy = 150;
	let time = 90;
	let N = 0;
	let nIdle=0;
	let nWork=0;
	let v = 1;
	let w = 100;
	let productivity = 0;
	let energyConsumption = 0;


	constructor __startValuesResourcesSpaceship__(Energy){
		energy = Energy;

	}


	let timeUnit = setInterval(myTime, 1000);

	function myTime() {
		let oxygenFactor = 4.76/100;
		//let carbondioxidFactor = 
		//productivity = v*(oxygen*oxygenFactor)*(carbondioxid*)
		oxygen -=1;
		carbondioxid +=1;
		energy -= 1;
		document.querySelector('.energy-value').innerHTML=energy;


	}


}

let System = new ResourcesSystem(200);
ResourcesSystem.myTime();