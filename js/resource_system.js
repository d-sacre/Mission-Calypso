		
class ResourcesSystem{

	constructor (Energy, Weight){
		this.oxygen = 21;
		this.carbondioxid = 0.04;
		this.energy = 150;
		this.time = 0;
		this.N = 0;
		this.nIdle=0;
		this.nWork=0;
		this.v = 1;
		this.w = 100;
		this.productivity = 0;
		this.energyConsumption = 0;
		this.energy = Energy;
		this.weight = Weight;
		//this.resourceLost = false;
	}
	
	carbondioxidFactorCalculation(){
		let carbondioxid=this.carbondioxid;
		  if(0.04<=carbondioxid<=0.08){
		    return (1-2.5*(carbondioxid-0.04));
		  }
		  if(carbondioxid<=1.5){
		      return (0.9-(20/141)*(carbondioxid-0.09));
		  }
		  if(carbondioxid<=5){
		    return (0.7-(40/349)*(carbondioxid-1.51));
		  } else {
		      return (0.3-(3/29)*(carbondioxid-5.01));
		  }
	}
		
	myTime() {

		let oxygenFactor = 4.76/100;
		let carbondioxidFactor = this.carbondioxidFactorCalculation();
		//productivity = this v*(this oxygen*oxygenFactor)*(this carbondioxid*)
		this.oxygen -=1;
		this.carbondioxid +=1;
		this.energy -= 1;
		this.time += 1;
		
		console.log(carbondioxidFactor);
		

		return {
			time: this.time,
			energy: this.energy,
			carbondioxid: this.carbondioxid,
			oxygen: this.oxygen
		};
	}
	
	
	
}
let system = new ResourcesSystem(200);
let timeUnit = setInterval(setTime, 1000);

	
function setTime() {
	let data = system.myTime(),
		energy = data.energy,
		time = data.time;
		carbondioxid = data.carbondioxid;
		oxygen = data.oxygen;
		
	document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
	document.querySelector('.time-value').innerHTML= time + 's';
	document.querySelector('.carbondioxide-value').innerHTML= carbondioxid + '/8.00 %';
	document.querySelector('.oxygen-value').innerHTML= oxygen + '/21.00 %';
	if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
	window.clearInterval(timeUnit);
	console.log("Game Over");
	}
}

