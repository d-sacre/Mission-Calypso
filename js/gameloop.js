// Start definition of FSM-states
function setMiningTime() {
    let data = system.myMiningTime(); // class object myMiningTime defined in /js/resourcesystem/resource_system_main.js
    let	energy =data.energy;
    let	time = data.time;
    let	carbondioxid = data.carbondioxid;
    let	oxygen = data.oxygen;
    let productivity = data.productivity;
    let co2ReduxTheo=data.carbonizerReductionCalculationValue;

    let copperStorageValue=parseFloat(document.querySelector('#copper-ingot-value').value)+0.5*parseFloat(document.querySelector('#copper-ore-value').value);

    //console.log("copperStorageValue: "+document.querySelector('#copper-ingot-value').value);

    if (copperStorageValue>=document.querySelector('#copper-max').value){
        document.querySelector('#enough-copper-popup').style.display="block";
        this.CopperStatemachine="enough";

    }

    document.querySelector('.energy-value').innerHTML=energy.toFixed(2)+'/'+system.EnergyStartValue+' HU';
    document.querySelector('.energy-value').value=energy.toFixed(2); // storing value in html for easier access without js-interfaces
    // readout of headup-gui-energy value and copying to storage energy value
    document.querySelector('.energy-storage-value').innerHTML=document.querySelector('.energy-value').value+'/'+system.EnergyStartValue+' HU';

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
        document.querySelector("#enough-copper-popup").style.display="block";
        document.querySelector("#continue-mining-popup-button").addEventListener("click",function(){
            //this.CopperStatemachine=="enough-but-continue";
            //console.log("button clicked");
            document.querySelector("#enough-copper-popup").style.display="none";
            document.querySelector('#copper-max').value=1500;
            system.CopperStatemachine="enough-but-continue-mining";
        });

        document.querySelector("#order-to-takeoff-popup-button").addEventListener("click",function(){
            document.querySelector("#enough-copper-popup").style.display="none";
            system.CopperStatemachine="enough-prepare-takeoff";
        });
  }

  function setTakeoffTime(){
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false ); // prevents that three.js-enviroment is still reacting to mouse even when game is ended
        document.removeEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js
        document.querySelector("#prepare-takeoff-popup").style.display="block";
        /*document.querySelector("#continue-mining-popup-button").addEventListener("click",function(){
            //this.CopperStatemachine=="enough-but-continue";
            //console.log("button clicked");
            document.querySelector("#enough-copper-popup").style.display="none";
            document.querySelector('#copper-max').value=1500;
            system.CopperStatemachine="enough-but-continue-mining";
        });

        document.querySelector("#order-to-takeoff-popup-button").addEventListener("click",function(){
            document.querySelector("#enough-copper-popup").style.display="none";
            system.CopperStatemachine="enough-prepare-takeoff";
        });*/
  }



// Initialize the resource-system
// resource system defined in js/resourcesystem/resource_system_main.js
let system = new ResourcesSystem(500,150,3,15,5,10,5);// order of arguments: Energy, Weight,WorkerTotal,CaloricumStart,CopperOreStart,PottasiumOreStart,DecarbStart

// Define finite Statemachine acting as game loop
let timeUnit = setInterval(function() {
    let data;

    switch (system.CopperStatemachine) {
      case "not-enough": // Standard-Gameplay
          data=setMiningTime();
          break;
      case "enough": // reached the specified amount of copper
          data=setStorageTime();
          //console.log("case enough");
          break;

      case "enough-but-continue-mining": // reached the specified amount of copper, but player wants to continue mining
          document.addEventListener( 'mousemove', onDocumentMouseMove, false ); // re-establish click event listeners for three.js
          document.addEventListener( 'click', onMouseClick, false); // event listeners defined in js/threejs/scene.js
          system.CopperStatemachine="not-enough";
          break;

      case "enough-prepare-takeoff": //reached the specified amount of copper (or even exceeded), order to prepare take-off==sucessful end of game
          data=setTakeoffTime();
          break;
    }

    if (system.paused==true){
      window.clearInterval(timeUnit);
    }

}, 1000); //refresh statemachine once every second

// starting the game
function startGame(){

}
