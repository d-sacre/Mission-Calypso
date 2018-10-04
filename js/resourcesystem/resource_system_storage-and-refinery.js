function updateStorageDisplay(){
    document.querySelector('.energy-storage-value').innerHTML=document.querySelector('.energy-value').value+' HU';
    document.querySelector('#raw-caloricum-storage-value').innerHTML=document.querySelector('#raw-caloricum-storage-value').value+'/15 t';
    document.querySelector('#copper-ore-value').innerHTML=document.querySelector('#copper-ore-value').value+'/15 t';
    document.querySelector('#pottasium-ore-value').innerHTML=document.querySelector('#pottasium-ore-value').value+'/30 kg';
    document.querySelector('#copper-ingot-value').innerHTML=document.querySelector('#copper-ingot-value').value+' t';
    document.querySelector('#decarbonizer-storage-value').innerHTML=document.querySelector('#decarbonizer-storage-value').value+' kg';

}
