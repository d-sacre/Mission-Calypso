/*

	let oxygen = 21;
	let carbondioxid = 0.04;
	let energy = 150;
	let time = 0;
	let N = 0;
	let nIdle=0;
	let nWork=0;
	let v = 1;
	let w = 100;
	let productivity = 0;
	let energyConsumption = 0;

let timeUnit = setInterval(myTime, 1000);

	function myTime() {
		let oxygenFactor = 4.76/100;
		//let carbondioxidFactor = 
		//productivity = v*(oxygen*oxygenFactor)*(carbondioxid*)
		oxygen -=1;
		carbondioxid +=1;
		energy -= 1;
		time += 1;
		document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
		document.querySelector('.time-value').innerHTML= time + 's';


	}

	myTime();
*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
class ResourcesSystem{

	constructor (Energy){
		this.oxygen = 21;
		this.carbondioxid = 0.04;
		this.energy = 150;
		this.time = 90;
		this.N = 0;
		this.nIdle=0;
		this.nWork=0;
		this.v = 1;
		this.w = 100;
		this.productivity = 0;
		this.energyConsumption = 0;
		this.energy = Energy;
	}
	
	carbondioxidFactorCalculation(){
		carbondioxid=this.carbondioxid;
		  if(0.04<=carbondioxid<=0.08){
		    return (1-2.5*(carbondioxid-0.04));
		  }
		  if(carbondioxid<=1.5){
		      return (0.9-(20/141)*(carbondioxid-0.09));
		  }
		  if(carbondioxid<=5){
		    return (0.7-(40/349)*(carbondioxid-1.51));
		  } else {
		      return (0.3-(3/29)*(carbondioxid-1.51));
		  }
	}
		
	myTime() {
		let oxygenFactor = 4.76/100;
		let carbondioxidFactor = carbondioxidFactorCalculation();
		//productivity = this v*(this oxygen*oxygenFactor)*(this carbondioxid*)
		this.oxygen -=1;
		this.carbondioxid +=1;
		this.energy -= 1;
		this.time += 1;
		
		console.log(carbondioxidFactor);

		return {
			time: this.time,
			energy: this.energy,
		};
	}
	
	
	
}
let system = new ResourcesSystem(200);
let timeUnit = setInterval(setTime, 1000);
	
function setTime() {
	let data = system.myTime(),
		energy = data.energy,
		time = data.time;
	document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
	document.querySelector('.time-value').innerHTML= time + 's';
}
