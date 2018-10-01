/* Ingame-popupmenu-buttons */
/* return to menu*/
document.querySelector('#back-to-mainmenu-popup-button').addEventListener("click", function(){
  window.location='../mission-calypso.html';
});

document.querySelector('#game-over-back-to-mainmenu-popup-button').addEventListener("click", function(){
  window.location='../mission-calypso.html';
});

/* buttons/clickboxes for slide up/down of menu */
document.querySelector('#to-rocket-menu-clickbox').addEventListener("click", function() {
  document.querySelector('.transform').classList.toggle('transform-active');
});

document.querySelector('#return-to-game-popup-button').addEventListener("click", function() {
  document.querySelector('.transform').classList.toggle('transform-active');
});

/* button for carbonizer useage */
document.querySelector('#use-carbonizer-button').addEventListener("click", function() {
  document.querySelector('.carbondioxide-value').value=document.querySelector('.carbondioxide-afteruseitem-value').value;// reduce C02 to calculated value
  document.querySelector('#decarbonizer-storage-value').value=document.querySelector('#decarbonizer-storage-value').value-document.querySelector('#use-decarbonizer-slider').value // substract number of used decarbonizers from storage
  document.querySelector('#decarbonizer-storage-value').innerHTML=document.querySelector('#decarbonizer-storage-value').value+'/15 kg'; // display changes
  document.querySelector('#use-decarbonizer-slider').value=0; // reset desired number of decarbonizers to 0
  document.querySelector('#carbondioxide-afteruseitem-value').value=0.04; // reset value for possible reduction
});
