/* Ingame-popupmenu-buttons */
/* return to menu*/
document.querySelector('#back-to-mainmenu-popup-button').addEventListener("click", function(){
  window.location='../mission-calypso.html';
});

document.querySelector('#game-over-back-to-mainmenu-popup-button').addEventListener("click", function(){
  window.location='../mission-calypso.html';
});

/* start drill */
document.querySelector('#start-main-drill-button').addEventListener("click", function(){
    document.querySelector('#drill-start-confirmed').value=1;
    document.querySelector('drill-storey-slider').max=document.querySelector('drill-storey-slider').value;
});

/* buttons/clickboxes for slide up/down of menu */
/* function for buttons*/
function gameGUIPopupMenuAnimation(){
  // every time when gameGUIPopup should appear, unbind three.js mouse-event listeners
  // event listeners defined in js/threejs/scene.js
  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'click', onMouseClick, false);
  document.querySelector('.transform').classList.toggle('transform-active'); // start css-animation for slide-up of menu
  if (document.querySelector('#game-gui-popup').classList[2]!='transform-active') { //if menu not sliding up or visible
    document.addEventListener('mousemove', onDocumentMouseMove, false);  // recreate three.js mouse-event listeners
  	document.addEventListener('click', onMouseClick, false);
  }
}

/* attach event listeners to slide up/down buttons/clickboxes for menu*/
document.querySelector('#to-rocket-menu-clickbox').addEventListener("click",gameGUIPopupMenuAnimation);
document.querySelector('#return-to-game-popup-button').addEventListener("click", gameGUIPopupMenuAnimation);

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
