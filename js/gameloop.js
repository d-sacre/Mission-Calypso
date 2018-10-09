// Start definition of FSM-states
function setMiningTime() {
    let data = system.myMiningTime(); // class object myMiningTime defined in /js/resourcesystem/resource_system_main.js
    let	energy =data.energy;
    let	time = data.time;
    let	carbondioxid = data.carbondioxid;
    let	oxygen = data.oxygen;
    let productivity = data.productivity;
    let co2ReduxTheo=data.carbonizerReductionCalculationValue;
    let weight=system.weight;
    let wear=data.wear;


    system.refineryProductionCalculation();

    weight=parseFloat(system.caloricum)+0.5*parseFloat(system.energy)+parseFloat(document.querySelector('#copper-ore-value').value)+parseFloat(document.querySelector('#pottasium-ore-value').value)/1000+parseFloat(document.querySelector('#decarbonizer-storage-value').value)/1000+parseFloat(document.querySelector('#copper-ingot-value').value)+50; //50 t=eigenvalue of spaceship
    weight=weight.toFixed(2);

    let weightStorage=weight-50;
    document.querySelector('#weight-storage-value').value=weightStorage;


    wear=0.0675*(data.speed**2)+parseFloat(document.querySelector('.wear-value').value);
    wear=wear.toFixed(2);

    document.querySelector('.weight-value').value=weight;
    //document.querySelector('.weight-value').innerHTML=weight+'/'+ system.WeightStartValue +' t';

    document.querySelector('.wear-value').value=wear;
    //document.querySelector('.wear-value').innerHTML=wear+'/100 %';

    //document.querySelector('.energy-value').innerHTML=energy.toFixed(2)+'/'+system.EnergyStartValue+' HU';
    document.querySelector('.energy-value').value=energy.toFixed(2); // storing value in html for easier access without js-interfaces
    // readout of headup-gui-energy value and copying to storage energy value
    //document.querySelector('.energy-storage-value').innerHTML=document.querySelector('.energy-value').value+'/'+system.EnergyStartValue+' HU';

    document.querySelector('.productivity-value').innerHTML=(100*productivity).toFixed(2)+'/100 %';
    document.querySelector('.productivity-value').value=productivity;

    document.querySelector('.time-value').value= time;

    /*document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
    document.querySelector('.carbondioxide-beforeuseitem-value').innerHTML=carbondioxid.toFixed(2) + '/8.00 %';*/
    document.querySelector('.carbondioxide-value').value= carbondioxid.toFixed(2);

    document.querySelector('.carbondioxide-afteruseitem-value').innerHTML=co2ReduxTheo.toFixed(2)+ '/8.00 %';
    document.querySelector('.carbondioxide-afteruseitem-value').value=co2ReduxTheo.toFixed(2);

    //document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
    document.querySelector('.oxygen-value').value= oxygen.toFixed(2);


    udpateHeadupDisplay(); // function defined in js/resourcesystem/resource_system_storage-and-refinery.js
    updateStorageDisplay(); // function defined in js/resourcesystem/resource_system_storage-and-refinery.js

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

        // hide complete gui
        document.querySelector('#game-gui-popup').style.display="none";
        document.querySelector('#headup-gui-container').style.display="none";

        document.querySelector('#supplies-game-over-popup').style.display="block"; // show supplies-game-over-popup
        stopAudioById('warning'); // stop warning buzzer
        this.paused=true; // end game loop
    }

  }

function setStorageTime(){
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false ); // prevents that three.js-enviroment is still reacting to mouse even when game is ended
        document.removeEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js
        document.querySelector("#enough-copper-popup").style.display="block"; //  lay enough-copper-popup over other popups; do not hide them!
  }

  function setTakeoffTime(){
        let successfulTakeoffProbability;
        let energyProbability, weightProbability, wearProbability;

        let energy=document.querySelector('.energy-value').value;
        let weight=document.querySelector('.weight-value').value;
        let wear=document.querySelector('.wear-value').value;

        if(energy<=150){
            energyProbability=(energy-50)/100;
        } else {
            energyProbability=(1-((energy-150)/energy));
        }

        weightProbability=1-(weight/150);
        wearProbability=1-(wear/100);

        successfulTakeoffProbability=(energyProbability+weightProbability+wearProbability)/3;
        document.querySelector('#successful-takeoff-probability').value=successfulTakeoffProbability;

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false ); // prevents that three.js-enviroment is still reacting to mouse even when game is ended
        document.removeEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js

        // hide complete gui
        document.querySelector('#game-gui-popup').style.display="none";
        document.querySelector('#headup-gui-container').style.display="none";

        document.querySelector('#energy-value-prepare-takeoff-popup').innerHTML=energy+'/50 HU';
        document.querySelector('#weight-value-prepare-takeoff-popup').innerHTML=weight+'/150 t';
        document.querySelector('#wear-value-prepare-takeoff-popup').innerHTML=wear+'/100 %';
        document.querySelector('#successful-takeoff-probability').innerHTML=(100*parseFloat(document.querySelector('#successful-takeoff-probability').value)).toFixed(2)+' %';

        document.querySelector("#prepare-takeoff-popup").style.display="block"; // show the prepare-takeoff-popup

  }



// Initialize the resource-system
// resource system defined in js/resourcesystem/resource_system_main.js
let system = new ResourcesSystem(200,150,3,0,0,0,5);// order of arguments: Energy (old:150,500), Weight,WorkerTotal,CaloricumStart (old:15),CopperOreStart (old:5),PottasiumOreStart (old: 10),DecarbStart

// Define finite Statemachine acting as game loop
let timeUnit = setInterval(function() {
    let data;

    switch (system.CopperStatemachine) {
      case "not-enough": // Standard-Gameplay
          data=setMiningTime();
          let copperStorageValue=parseFloat(document.querySelector('#copper-ingot-value').value)+0.5*parseFloat(document.querySelector('#copper-ore-value').value);

          //console.log("copperStorageValue:" + copperStorageValue);
          if (copperStorageValue>=document.querySelector('#copper-max').value){
              system.CopperStatemachine="enough";

          }

          //console.log("case not-enough");
          break;
      case "enough": // reached the specified amount of copper
          data=setStorageTime();
          //console.log("case enough");
          break;

      case "enough-but-continue-mining": // reached the specified amount of copper, but player wants to continue mining
          document.addEventListener( 'mousemove', onDocumentMouseMove, false ); // re-establish click event listeners for three.js
          document.addEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js
          document.querySelector('#back-to-prepare-takeoff-button').style.display="block";
          system.CopperStatemachine="not-enough";
          //console.log("case enough-but-continue-mining");
          break;

      case "enough-prepare-takeoff": //reached the specified amount of copper (or even exceeded), order to prepare take-off==sucessful end of game
          data=setTakeoffTime();
          //console.log("case enough-prepare-takeoff");
          break;
    }

    if (system.paused==true){
      window.clearInterval(timeUnit);
    }

}, 1000); //refresh statemachine once every second

// starting the game
function startGame(){

}
