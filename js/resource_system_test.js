		
class ResourcesSystem{

	constructor (Energy, Weight){
		this.oxygen = 21;
		this.carbondioxid = 0.04;
		this.energy = 150;
		this.time = 0;
		this.N = 0;
		this.nIdle=0;
		this.nWork=3;
		this.v = 1;
		this.w = 100;
		this.productivity = 0;
		this.energyConsumption = 0;
		this.energy = Energy;
		this.weight = Weight;
		
		this.workingConsumptionO = 0.1;
		this.idleConsumptionO = 0.05;
		this.workingProductionCO = 0.1;
		this.idleProductionCO = 0.05;
		this.workerEnergyConsumption=0.1;
		
		this.paused=false;
		//console.log(this.getSliderValue());
		//this.refreshSliderDisplay();
		//this.resourceLost = false;
	}
	
	
	getSliderValue(){
		console.log("getSliderValue");
		let machineSpeed=document.querySelector('#machine-speed-slider').value;
		let workerIdle=document.querySelector('#worker-idle-slider').value;
		let workerMining=document.querySelector('#worker-mining-slider').value;
		let workerRefinery=document.querySelector('#worker-refinery-slider').value;
		
		//let energyStartvalue=document.querySelector('#energy-startvalue-slider').value;
		//let oxygenConsumptionIdle=document.querySelector('#oxygen-consumption-idle-slider').value;
		//let oxygenConsumptionWork=document.querySelector('#oxygen-consumption-work-slider').value;
		//let carbondioxideProductionIdle=document.querySelector('#carbondioxide-production-idle-slider').value;
		//let carbondioxideProductionWork=document.querySelector('#carbondioxide-production-work-slider').value;
		return {
			machineSpeed,
			workerIdle,
			workerMining,
			workerRefinery,
			//energyStartvalue,
			//oxygenConsumptionIdle,
			//oxygenConsumptionWork,
			//carbondioxideProductionIdle,
			//carbondioxideProductionWork	
		}
	}
	
	refreshSliderDisplay(){
		console.log("refreshSliderDisplay");
		let SliderValues=this.getSliderValue();
		
		document.querySelector('#machine-speed-slidervalue').innerHTML=SliderValues.machineSpeed;
		document.querySelector('#worker-idle-slidervalue').innerHTML=SliderValues.workerIdle;
		document.querySelector('#worker-mining-slidervalue').innerHTML=SliderValues.workerMining;
		document.querySelector('#worker-refinery-slidervalue').innerHTML=SliderValues.workerRefinery;
		
		//document.querySelector('#energy-startvalue-slidervalue').innerHTML=SliderValues.energyStartvalue;
		//document.querySelector('#oxygen-consumption-idle-slidervalue').innerHTML=SliderValues.oxygenConsumptionIdle;
		//document.querySelector('#oxygen-consumption-work-slidervalue').innerHTML=SliderValues.oxygenConsumptionWork;
		//document.querySelector('#carbondioxide-production-idle-slidervalue').innerHTML=SliderValues.carbondioxideProductionIdle;
		//document.querySelector('#carbondioxide-production-work-slidervalue').innerHTML=SliderValues.carbondioxideProductionWork;
		
		this.testSliderValues(SliderValues);
		//console.log(SliderValues);
	}
	
	testSliderValues(SliderValues){
		//this.energy = SliderValues.energyStartvalue;
		console.log("testSliderValues");
		this.N = SliderValues.workerIdle+SliderValues.workerMining;
		this.nIdle=SliderValues.workerIdle;
		this.nWork=SliderValues.workerMining;
		this.v = SliderValues.machineSpeed;
		this.workingConsumptionO = 0.02;
		this.idleConsumptionO = 0.01;
		this.idleProductionCO = 0.02;
		this.workingProductionCO = 0.03;
	}
	
	
	refreshOxygenValue(){
		//console.log(this.workingConsumptionO);
		return this.oxygen -(this.nWork*this.workingConsumptionO+this.nIdle*this.idleConsumptionO);		
	}
	
	refreshCarbondioxidValue(){
		//console.log(this.carbondioxid+(this.nWork*workingProduction+this.nIdle*idleProduction));
		return this.carbondioxid+(this.nWork*this.workingProductionCO+this.nIdle*this.idleProductionCO);
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
	
	oxygenFactorCalculation(){
		return this.oxygen*(4.76/100);
	}
	
	
	calculateDrillEnergyConsumption(){
		
		let drillEnergyConsumption = 0.1* (this.v)*(this.v);
		console.log("drillEnergyConsumption=" + drillEnergyConsumption);
		return drillEnergyConsumption;
	}
	
	
	
	
	
	refreshEnergyValue(){
		
		let energyValue=this.energy-this.workerEnergyConsumption*this.nWork-this.calculateDrillEnergyConsumption();
		console.log("energyValue=" + energyValue);
		return energyValue;
	}
		
		
	myTime() {
		// Faktoraktualisierung
		let carbondioxidFactor = this.carbondioxidFactorCalculation();
		let oxygenFactor= this.oxygenFactorCalculation();
		let v= this.v;
		
		//Wertänderungen
		let productivity = this.calculateProductivity(v,oxygenFactor, carbondioxidFactor);
		this.oxygen = this.refreshOxygenValue();
		
		this.carbondioxid = this.refreshCarbondioxidValue();
		this.energy = this.refreshEnergyValue();
		this.time += 1;
		
		//console.log(carbondioxidFactor);
		
		//Rückgabewerte
		return {
			time: this.time,
			energy: this.energy,
			carbondioxid: this.carbondioxid,
			oxygen: this.oxygen
		};
		
	}
	
	
	calculateProductivity(v,oxygenFactor, carbondioxidFactor){
		//console.log(v+"   "+oxygenFactor+"      "+carbondioxidFactor);
		return v*carbondioxidFactor*oxygenFactor;
	}
	
	playPause(){
		if (this.paused==true){
			this.paused=false;
		}
		else{
			this.paused=true;
		}
		
		console.log(this.paused);
	}
	
	testPause(){
		console.log(paused);
		a=1+1;
		return this.paused;
		
	}

	setTime() {
			let data = system.myTime();
			let	energy = data.energy;
			let	time = data.time;
			let	carbondioxid = data.carbondioxid;
			let	oxygen = data.oxygen;
			
			document.querySelector('.energy-value').innerHTML=energy.toFixed(2)+'/150 HU';
			document.querySelector('.time-value').innerHTML= time + 's';
			document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
			document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
			console.log("Produktivität: " + this.calculateProductivity());
			//console.log(document.querySelector('.energy-value').innerHTML +"    " document.querySelector('.time-value').innerHTML)
			
			if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
				this.paused=true;
				console.log("Game Over");
			}
		}	
}


let system = new ResourcesSystem(150);
//let systemView = new ResourcesSystemView;


	let timeUnit = setInterval(function() {
			let data = system.setTime();
			//systemView.refreshResourcesView();
			if (system.paused==true){
				window.clearInterval(timeUnit);
			}
		
	}, 1000);
	
function startGame(){
}
	





/*class ResourcesSystemView{	

	refreshResourcesView() {

		let data = system.myTime();
			console.log(data);
			energy = data.energy;
			time = data.time;
			carbondioxid = data.carbondioxid;
			oxygen = data.oxygen;
			
		document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
		document.querySelector('.time-value').innerHTML= time + 's';
		document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
		document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
		if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
		window.clearInterval(timeUnit);
		console.log("Game Over");
		}
	}



	getSliderValue(){
		let machineSpeed=document.querySelector('#machine-speed-slider').value;
		let workerIdle=document.querySelector('#worker-idle-slider').value;
		let workerMining=document.querySelector('#worker-mining-slider').value;
		let workerRefinery=document.querySelector('#worker-refinery-slider').value;
		
		let energyStartvalue=document.querySelector('#energy-startvalue-slider').value;
		let oxygenConsumptionIdle=document.querySelector('#oxygen-consumption-idle-slider').value;
		let oxygenConsumptionWork=document.querySelector('#oxygen-consumption-work-slider').value;
		let carbondioxideProductionIdle=document.querySelector('#carbondioxide-production-idle-slider').value;
		let carbondioxideProductionWork=document.querySelector('#carbondioxide-production-work-slider').value;
		return {
			machineSpeed,
			workerIdle,
			workerMining,
			workerRefinery,
			energyStartvalue,
			oxygenConsumptionIdle,
			oxygenConsumptionWork,
			carbondioxideProductionIdle,
			carbondioxideProductionWork	
		}
	}

	refreshSliderDisplay(){
			
		let SliderValues=system.getSliderValue();
		
		document.querySelector('#machine-speed-slidervalue').innerHTML=SliderValues.machineSpeed;
		document.querySelector('#worker-idle-slidervalue').innerHTML=SliderValues.workerIdle;
		document.querySelector('#worker-mining-slidervalue').innerHTML=SliderValues.workerMining;
		document.querySelector('#worker-refinery-slidervalue').innerHTML=SliderValues.workerRefinery;
		
		document.querySelector('#energy-startvalue-slidervalue').innerHTML=SliderValues.energyStartvalue;
		document.querySelector('#oxygen-consumption-idle-slidervalue').innerHTML=SliderValues.oxygenConsumptionIdle;
		document.querySelector('#oxygen-consumption-work-slidervalue').innerHTML=SliderValues.oxygenConsumptionWork;
		document.querySelector('#carbondioxide-production-idle-slidervalue').innerHTML=SliderValues.carbondioxideProductionIdle;
		document.querySelector('#carbondioxide-production-work-slidervalue').innerHTML=SliderValues.carbondioxideProductionWork;
		
		system.testSliderValues(SliderValues);
	}
}
*/