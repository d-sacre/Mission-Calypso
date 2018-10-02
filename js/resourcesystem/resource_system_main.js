
class ResourcesSystem{

	constructor (Energy, Weight,WorkerTotal,CaloricumStart,CopperOreStart,PottasiumOreStart,DecarbStart){
		/* write the initial values into html-value for storage*/
		document.querySelector('.energy-value').value=Energy;
		document.querySelector('.weight-value').value=Weight;
		document.querySelector('.oxygen-value').value=21.0;
		document.querySelector('.carbondioxide-value').value=0.04;
		document.querySelector('.time-value').value=0;
		document.querySelector('.wear-value').value=0;
		document.querySelector('.productivity-value').value=0;
		document.querySelector('#raw-caloricum-storage-value').value=CaloricumStart;
		document.querySelector('#copper-ore-value').value=CopperOreStart;
		document.querySelector('#pottasium-ore-value').value=PottasiumOreStart;
		document.querySelector('#decarbonizer-storage-value').value=DecarbStart;
		document.querySelector('#use-decarbonizer-slider').max=document.querySelector('#decarbonizer-storage-value').value;

		/* write initial storage values in innerHTML */
		document.querySelector('.energy-value').innerHTML=Energy+'/'+Energy+' HU';
		document.querySelector('#raw-caloricum-storage-value').innerHTML=CaloricumStart + '/15 t';
		document.querySelector('#copper-ore-value').innerHTML=CopperOreStart + '/15 t';
		document.querySelector('#pottasium-ore-value').innerHTML=PottasiumOreStart + '/30 kg';
		document.querySelector('#decarbonizer-storage-value').innerHTML=DecarbStart + '/15 kg';


		document.querySelector('#use-decarbonizer-slidervalue').innerHTML= '0/' + document.querySelector('#decarbonizer-storage-value').value;

		/* read - where appropriate - from html-value and use it as starting point for calculations,
		so that e.g. graphics can write values without overwriting consumptions inproperly */
		this.oxygen = parseFloat(document.querySelector('.oxygen-value').value);
		this.carbondioxid = parseFloat(document.querySelector('.carbondioxide-value').value);
		this.energy = parseFloat(document.querySelector('.energy-value').value);
		this.time = parseFloat(document.querySelector('.time-value').value);
		this.caloricum=parseFloat(document.querySelector('#raw-caloricum-storage-value').value);
		this.caloricumProcessing=parseFloat(document.querySelector('#caloricum-processing-slider').value);
		this.copperProcessing=parseFloat(document.querySelector('#copper-processing-slider').value);
		this.pottasiumProcessing=parseFloat(document.querySelector('#pottasium-processing-slider').value);
		this.EnergyStartValue=Energy;


		this.N = WorkerTotal;
		this.nIdle=this.N;
		this.nWork=0;
		this.v = 1;
		this.userselectNCarbonizer=0;
		this.w = parseFloat(document.querySelector('.wear-value').value);
		this.productivity = parseFloat(document.querySelector('.productivity-value').value);
		this.energyConsumption = 0;
		this.weight = parseFloat(document.querySelector('.weight-value').value);

		this.workingConsumptionO = 0.02;
		this.idleConsumptionO = 0.01;
		this.workingProductionCO = 0.03;
		this.idleProductionCO = 0.02;
		this.workerEnergyConsumption=0.35;

		this.paused=false;
	}


	getSliderValue(){
		let machineSpeed=document.querySelector('#machine-speed-slider').value;
		let workerIdle=document.querySelector('#worker-idle-slider').value;
		let workerMining=document.querySelector('#worker-mining-slider').value;
		let workerRefinery=document.querySelector('#worker-refinery-slider').value;

		let userselectNCarbonizer=document.querySelector('#use-decarbonizer-slider').value;
		//console.log(userselectNCarbonizer); // wird nur refreshed, wenn einer der oberen drei Slider verändert wird
		let caloricumProcessing=document.querySelector('#caloricum-processing-slider').value;
		let copperProcessing=document.querySelector('#copper-processing-slider').value;
		let pottasiumProcessing=document.querySelector('#pottasium-processing-slider').value;


		return {
			machineSpeed,
			workerIdle,
			workerMining,
			workerRefinery,
			userselectNCarbonizer,
			caloricumProcessing,
			copperProcessing,
			pottasiumProcessing
		}

	}

	refreshSliderDisplay(){

		let SliderValues=this.getSliderValue();

		document.querySelector('#machine-speed-slidervalue').innerHTML=SliderValues.machineSpeed;
		document.querySelector('#worker-idle-slidervalue').innerHTML=SliderValues.workerIdle;
		document.querySelector('#worker-mining-slidervalue').innerHTML=SliderValues.workerMining;
		document.querySelector('#worker-refinery-slidervalue').innerHTML=SliderValues.workerRefinery;

		document.querySelector('#caloricum-processing-slidervalue').innerHTML=SliderValues.caloricumProcessing;
		document.querySelector('#copper-processing-slidervalue').innerHTML=SliderValues.copperProcessing;
		document.querySelector('#pottasium-processing-slidervalue').innerHTML=SliderValues.pottasiumProcessing;


		document.querySelector('#use-decarbonizer-slidervalue').innerHTML=SliderValues.userselectNCarbonizer + '/' + document.querySelector('#decarbonizer-storage-value').value;
		document.querySelector('#use-decarbonizer-slider').max=parseFloat(document.querySelector('#decarbonizer-storage-value').value);

		this.testSliderValues(SliderValues);

	}

	testSliderValues(SliderValues){
		this.N = SliderValues.workerIdle+SliderValues.workerMining;
		this.nIdle=SliderValues.workerIdle;
		this.nWork=SliderValues.workerMining+SliderValues.workerRefinery;
		this.v = SliderValues.machineSpeed;
		this.workingConsumptionO = 0.02;
		this.idleConsumptionO = 0.01;
		this.idleProductionCO = 0.02;
		this.workingProductionCO = 0.03;
		this.userselectNCarbonizer=SliderValues.userselectNCarbonizer;
	}

	refineryEnergyConsumptionCalculation(){
			this.caloricumProcessing=parseFloat(document.querySelector('#caloricum-processing-slider').value);
			this.copperProcessing=parseFloat(document.querySelector('#copper-processing-slider').value);
			this.pottasiumProcessing=parseFloat(document.querySelector('#pottasium-processing-slider').value);
			this.workerRefinery=parseFloat(document.querySelector('#worker-refinery-slider').value);
			this.productivity=parseFloat(document.querySelector('.productivity-value').value);
			//let productivity=parseFloat(document.querySelector('.productivity-value').value);
			//console.log('pottasium slider: '+this.pottasiumProcessing);
			let processEnergy=this.productivity*this.caloricumProcessing*0.2+this.productivity*this.copperProcessing*0.4+this.productivity*this.pottasiumProcessing*0.3;
			let refineryEnergyConsumption = (processEnergy*this.workerRefinery).toFixed(2);
			//console.log('refineryEnergyConsumption: '+  refineryEnergyConsumption);
			return refineryEnergyConsumption;
	}

	refineryProductionCalculation(){
		this.caloricumProcessing=parseFloat(document.querySelector('#caloricum-processing-slider').value).toFixed(2);
		this.copperProcessing=parseFloat(document.querySelector('#copper-processing-slider').value).toFixed(2);
		this.pottasiumProcessing=parseFloat(document.querySelector('#pottasium-processing-slider').value).toFixed(2);
		this.workerRefinery=parseFloat(document.querySelector('#worker-refinery-slider').value).toFixed(2);
		this.productivity=parseFloat(document.querySelector('.productivity-value').value).toFixed(2);
		this.energy=parseFloat(document.querySelector('.energy-value').value).toFixed(2);
		this.caloricum=parseFloat(document.querySelector('#raw-caloricum-storage-value').value).toFixed(2);

		let caloricumProcessingEnergyConsumption=this.productivity*this.caloricumProcessing*this.workerRefinery*0.2;
		let copperProcessingEnergyConsumption=this.productivity*this.copperProcessing*this.workerRefinery*0.4;
		let pottasiumProcessingEnergyConsumption=this.productivity*this.pottasiumProcessing*this.workerRefinery*0.3;

		let caloricumProcessingOreConsumption=this.productivity*this.caloricumProcessing*this.workerRefinery*2;
		let copperProcessingOreConsumption=this.productivity*this.copperProcessing*this.workerRefinery*4;
		let pottasiumProcessingOreConsumption=this.productivity*this.pottasiumProcessing*this.workerRefinery*3;

		let caloricumProcessingOutput=this.productivity*this.caloricumProcessing*this.workerRefinery*40;
		let copperProcessingOutput=this.productivity*this.copperProcessing*this.workerRefinery*0.5;
		let pottasiumProcessingOutput=this.productivity*this.pottasiumProcessing*this.workerRefinery*1;

		if ((this.caloricum-caloricumProcessingOreConsumption>=0) && (this.energy-caloricumProcessingEnergyConsumption>=0)){
				document.querySelector('#raw-caloricum-storage-value').value=this.caloricum-caloricumProcessingOreConsumption.toFixed(2);
				document.querySelector('#raw-caloricum-storage-value').innerHTML=this.caloricum-caloricumProcessingOreConsumption.toFixed(2)+ '/15 t';
				document.querySelector('#caloricum-rate-equation').innerHTML=caloricumProcessingEnergyConsumption.toFixed(2)+' t caloricum + ' + caloricumProcessingOreConsumption.toFixed(2) +' HU → '+ caloricumProcessingOutput.toFixed(2) +' HU';


				//console.log('energy:'+ document.querySelector('.energy-value').value);
				console.log('caloricumProcessingOutput:'+ caloricumProcessingOutput);
		} /*else {
				document.querySelector('#caloricum-rate-equation').innerHTML='0 t caloricum + ' + '0 HU → '+ '0 HU';

		}*/
	}

	refineryEnergyOutput(){
			this.caloricumProcessing=parseFloat(document.querySelector('#caloricum-processing-slider').value).toFixed(2);
			this.workerRefinery=parseFloat(document.querySelector('#worker-refinery-slider').value).toFixed(2);
			this.productivity=parseFloat(document.querySelector('.productivity-value').value).toFixed(2);
			this.energy=parseFloat(document.querySelector('.energy-value').value).toFixed(2);
			this.caloricum=parseFloat(document.querySelector('#raw-caloricum-storage-value').value).toFixed(2);

			let caloricumProcessingEnergyConsumption=this.productivity*this.caloricumProcessing*this.workerRefinery*0.2;
			let caloricumProcessingOreConsumption=this.productivity*this.caloricumProcessing*this.workerRefinery*2;

			let caloricumProcessingOutput;

			if ((this.caloricum-caloricumProcessingOreConsumption>=0) && (this.energy-caloricumProcessingEnergyConsumption>=0)){
						caloricumProcessingOutput=this.productivity*this.caloricumProcessing*this.workerRefinery*40;
			} else {
						caloricumProcessingOutput=0;
			}
			return caloricumProcessingOutput;
	}

	calculateDrillEnergyConsumption(){
		let drillEnergyConsumption = 0.1* (this.v)*(this.v);
		return drillEnergyConsumption;
	}

	carbondioxidFactorCalculation(){
		this.carbondioxid = parseFloat(document.querySelector('.carbondioxide-value').value);
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
		this.oxygen = parseFloat(document.querySelector('.oxygen-value').value);
		return this.oxygen*(4.76/100);
	}

	calculateProductivity(v,oxygenFactor, carbondioxidFactor){
		return v*carbondioxidFactor*oxygenFactor;
	}

	carbonizerReductionCalculation(){
		this.carbondioxid = parseFloat(document.querySelector('.carbondioxide-value').value);
		if (this.carbondioxid-2*this.userselectNCarbonizer>=0.04) {
			return this.carbondioxid-2*this.userselectNCarbonizer;
		} else {
			return 0.04;
		}

	}

	carbonizerReduction(){
		this.carbondioxid = parseFloat(document.querySelector('.carbondioxide-value').value);
		if (this.carbondioxid-2*this.userselectNCarbonizer>=0.04) {
			return this.carbondioxid-2*this.userselectNCarbonizer;
		} else {
			return 0.04;
		}

	}

	refreshOxygenValue(){
		this.oxygen = parseFloat(document.querySelector('.oxygen-value').value);
		return this.oxygen -(this.nWork*this.workingConsumptionO+this.nIdle*this.idleConsumptionO);
	}

	refreshCarbondioxidValue(){
		this.carbondioxid = parseFloat(document.querySelector('.carbondioxide-value').value);
		return this.carbondioxid+(this.nWork*this.workingProductionCO+this.nIdle*this.idleProductionCO);
	}


	refreshEnergyValue(){
		this.energy = parseFloat(document.querySelector('.energy-value').value);
		let energyValue=this.energy-this.workerEnergyConsumption*this.nWork-this.calculateDrillEnergyConsumption()-this.refineryEnergyConsumptionCalculation()+this.refineryEnergyOutput();
		//console.log(this.refineryEnergyConsumptionCalculation());
		return energyValue;

	}

	refreshProductivityValue(){
		let productivityValue=this.productivity;
		document.querySelector('.productivity-value').value=productivityValue;
		return productivityValue;
	}


	myTime() {
		// Faktoraktualisierung
		let carbondioxidFactor = this.carbondioxidFactorCalculation();
		let oxygenFactor= this.oxygenFactorCalculation();
		let carbonizerReductionCalculationValue= this.carbonizerReductionCalculation();
		let v= this.v;

		//Wertänderungen
		let productivity = this.calculateProductivity(v,oxygenFactor, carbondioxidFactor);

		this.refineryProductionCalculation();

		this.oxygen = this.refreshOxygenValue();

		this.carbondioxid = this.refreshCarbondioxidValue();
		this.energy = this.refreshEnergyValue();

		this.time += 1;

		//Rückgabewerte
		return {
			time: this.time,
			energy: this.energy,
			carbondioxid: this.carbondioxid,
			oxygen: this.oxygen,
			productivity,
			carbonizerReductionCalculationValue
		};

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
			let	energy =data.energy;
			let	time = data.time;
			let	carbondioxid = data.carbondioxid;
			let	oxygen = data.oxygen;
			let productivity = data.productivity;
			let co2ReduxTheo=data.carbonizerReductionCalculationValue;

			document.querySelector('.energy-value').innerHTML=energy.toFixed(2)+'/'+this.EnergyStartValue+' HU';
			document.querySelector('.energy-value').value=energy.toFixed(2); // storing value in html for easier access without js-interfaces
			// readout of headup-gui-energy value and copying to storage energy value
			document.querySelector('.energy-storage-value').innerHTML=document.querySelector('.energy-value').value+'/'+this.EnergyStartValue+' HU';

			document.querySelector('.productivity-value').innerHTML=(100*productivity).toFixed(2)+'/100 %';
			document.querySelector('.productivity-value').value=productivity;

			document.querySelector('.time-value').innerHTML= time + 's';
			document.querySelector('.time-value').value= time;

			document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
			document.querySelector('.carbondioxide-beforeuseitem-value').innerHTML=carbondioxid.toFixed(2) + '/8.00 %';
			document.querySelector('.carbondioxide-value').value= carbondioxid.toFixed(2);

			document.querySelector('.carbondioxide-afteruseitem-value').innerHTML=co2ReduxTheo.toFixed(2)+ '/8.00 %';
			document.querySelector('.carbondioxide-afteruseitem-value').value=co2ReduxTheo.toFixed(2);

			document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
			document.querySelector('.oxygen-value').value= oxygen.toFixed(2);


			// Play warning-audio and change font-color
			if((!(carbondioxid<=6) && (carbondioxid<=8)) || (!(oxygen>=14.5)  && !(oxygen<=10.5)) || (!(energy>=50) && !(energy<50))) {
					playAudioById('warning');
			}

			if(carbondioxid<3){
				document.querySelector('.carbondioxide-value').style.color="white";
				document.querySelector('.carbondioxide-beforeuseitem-value').style.color="white";
			}

			if(3<=carbondioxid){
				if (carbondioxid<=6){
					document.querySelector('.carbondioxide-value').style.color="orange";
					document.querySelector('.carbondioxide-beforeuseitem-value').style.color="orange";
				} else {
					document.querySelector('.carbondioxide-value').style.color="red";
					document.querySelector('.carbondioxide-beforeuseitem-value').style.color="red";
				}
			}

			if(oxygen<=14){
				if (oxygen>=12){
					document.querySelector('.oxygen-value').style.color="orange";
				} else {
					document.querySelector('.oxygen-value').style.color="red";
				}
			}

			if (75<energy) {
				document.querySelector('.energy-value').style.color="white";
				document.querySelector('.energy-storage-value').style.color="white";
			}

			if(energy<=75){
				if (energy>=60){
					document.querySelector('.energy-value').style.color="orange";
					document.querySelector('.energy-storage-value').style.color="orange";
				} else {
					document.querySelector('.energy-value').style.color="red";
					document.querySelector('.energy-storage-value').style.color="red";
				}
			}

			if ((carbondioxid<3) && (oxygen>14) && (energy=>75)) {
				stopAudioById('warning');
			}

			if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false ); // prevents that three.js-enviroment is still reacting to mouse even when game is ended
			  document.removeEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js

				// unbind gameGUIPopup-buttons
				document.querySelector('#to-rocket-menu-clickbox').removeEventListener("click",gameGUIPopupMenuAnimation);
				document.querySelector('#return-to-game-popup-button').removeEventListener("click", gameGUIPopupMenuAnimation);

				// slide down gameGUIPopup if visible
				if (document.querySelector('#game-gui-popup').classList[2]=='transform-active') {
						document.querySelector('.transform').classList.toggle('transform-active');
				}

				document.querySelector('#supplies-game-over-popup').style.display="block"; // show supplies-game-over-popup
				stopAudioById('warning'); // stop warning buzzer
				this.paused=true; // end game loop
			}
		}
}


let system = new ResourcesSystem(500,150,3,15,5,10,5);// order of arguments: Energy, Weight,WorkerTotal,CaloricumStart,CopperOreStart,PottasiumOreStart,DecarbStart

let timeUnit = setInterval(function() {
			let data = system.setTime();
			if (system.paused==true){
				window.clearInterval(timeUnit);
			}

	}, 1000); //10000

function startGame(){

}
