/*##################################################################################################################*/
/*######################################## Ingame-popupmenu-buttons ################################################*/
/*##################################################################################################################*/

/* return to menu*/
document.querySelector('#back-to-mainmenu-popup-button').addEventListener("click", function(){
    window.location='../mission-calypso.html';
});

/* start drill */
document.querySelector('#start-main-drill-button').addEventListener("click", function(){
    document.querySelector('#drill-start-confirmed').value=1;
    document.querySelector('#drill-storey-slider').min=document.querySelector('#drill-storey-slider').value;
});

/* button for carbonizer useage */
document.querySelector('#use-carbonizer-button').addEventListener("click", function() {
    document.querySelector('.carbondioxide-value').value=document.querySelector('.carbondioxide-afteruseitem-value').value;// reduce C02 to calculated value
    document.querySelector('#decarbonizer-storage-value').value=document.querySelector('#decarbonizer-storage-value').value-document.querySelector('#use-decarbonizer-slider').value // substract number of used decarbonizers from storage
    document.querySelector('#decarbonizer-storage-value').innerHTML=document.querySelector('#decarbonizer-storage-value').value+'/15 kg'; // display changes
    document.querySelector('#use-decarbonizer-slider').value=0; // reset desired number of decarbonizers to 0
    document.querySelector('#use-decarbonizer-slider').max=document.querySelector('#decarbonizer-storage-value').value; // set maximum slider value to available decarbonizers in storage
    document.querySelector('#use-decarbonizer-slidervalue').innerHTML=document.querySelector('#use-decarbonizer-slider').value+'/'+document.querySelector('#decarbonizer-storage-value').value; // write actual value of slider and max into gui
    document.querySelector('#carbondioxide-afteruseitem-value').value=0.04; // reset value for possible reduction
});

/*##################################################################################################################*/
/*############################# buttons/clickboxes for slide up/down of menu #######################################*/
/*##################################################################################################################*/

/* function for buttons*/
function gameGUIPopupMenuAnimation(){
    document.removeEventListener('mousemove', onDocumentMouseMove, false); // every time when gameGUIPopup should appear, unbind three.js mouse-event listeners
    document.removeEventListener('click', onMouseClick, false); // event listeners defined in js/threejs/scene.js
    document.querySelector('.transform').classList.toggle('transform-active'); // start css-animation for slide-up of menu
    if (document.querySelector('#game-gui-popup').classList[2]!='transform-active') { //if menu not sliding up or visible
        document.addEventListener('mousemove', onDocumentMouseMove, false);  // recreate three.js mouse-event listeners
      	document.addEventListener('click', onMouseClick, false);
    }
}

/* attach event listeners to slide up/down buttons/clickboxes for menu*/
document.querySelector('#to-rocket-menu-clickbox').addEventListener("click",gameGUIPopupMenuAnimation);
document.querySelector('#return-to-game-popup-button').addEventListener("click", gameGUIPopupMenuAnimation);

/* attach addEventListener to headup-gameGUIPopup*/
document.querySelector('#headup-gui-container-clickbox').addEventListener("click", gameGUIPopupMenuAnimation);

/*##################################################################################################################*/
/*############################### Button run-out-of-suplies-game-over-button #######################################*/
/*##################################################################################################################*/
document.querySelector('#game-over-back-to-mainmenu-popup-button').addEventListener("click", function(){
    window.location='../mission-calypso.html';
});

/*##################################################################################################################*/
/*##################### Buttons in conjunction with game FSM #######################################################*/
/*##################################################################################################################*/

/* Button for returning to mining operation, altough copper limit is reached*/
document.querySelector("#continue-mining-popup-button").addEventListener("click",function(){
    document.querySelector("#enough-copper-popup").style.display="none"; // hide popup, so user can interact with main game popup again
    document.querySelector('#copper-max').value=1500; // enlarge copper limit so that FSM-state "enough" can not be reached again
    system.CopperStatemachine="enough-but-continue-mining"; // jump to FSM-State "enough-but-continue-mining" for further changes
});

/* Button for directly preparing take-off when copper limit is reached*/
document.querySelector("#order-to-takeoff-popup-button").addEventListener("click",function(){
    document.querySelector("#enough-copper-popup").style.display="none";
    system.CopperStatemachine="enough-prepare-takeoff";
});

/* Button for preparing take-off after continuing mining */
document.querySelector("#back-to-prepare-takeoff-button").addEventListener("click", function(){
    system.CopperStatemachine="enough-prepare-takeoff";
});

/* Button for getting to weight-relief */
document.querySelector('#relief-weight-button').addEventListener("click", function(){
    document.querySelector("#weight-relief-popup").style.display="block";
});

/* Button for discarding changes of weight-relief and direct redirection back to prepare take-off*/
document.querySelector('#no-relief-weight-button').addEventListener("click", function(){
    document.querySelector("#weight-relief-popup").style.display="none";
});

/* Button for committing changes of weight-relief and redirection back to prepare take-off after probability calulation*/
document.querySelector('#yes-relief-weight-button').addEventListener("click", function(){
    document.querySelector("#weight-relief-popup").style.display="none";
});
