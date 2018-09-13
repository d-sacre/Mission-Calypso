
document.querySelector('#to-rocket-menu-clickbox').addEventListener("click", function() {
  document.querySelector('.transform').classList.toggle('transform-active');
});

document.querySelector('#return-to-game-popup-button').addEventListener("click", function() {
  document.querySelector('.transform').classList.toggle('transform-active');
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
