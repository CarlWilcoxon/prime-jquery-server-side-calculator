console.log('js');

let mode = '';

$(document).ready(onReady);

//onReady first, then the rest in order
function onReady() {
  console.log('DOM is ready.');

  //setup event handlers
  $('#calculator').on('click', '.modeSelect', selectMode);
  $('#calculator').on('click', '#clear-btn', clearCalc);
  $('#calculator').on('click', '#equals-btn', calc);
}

function calc(event) {
  event.preventDefault();

  let num1 = parseFloat($('#num1-in').val());
  let num2 = parseFloat($('#num2-in').val());
  
  let parcel = {
    mode,
    num1,
    num2
  }

}

function clearCalc(event) {
  event.preventDefault();

  mode = '';
  $('#num1-in').val('');
  $('#num2-in').val('');
}

function selectMode(event) {
  event.preventDefault();
  //cut off the -btn from the id
  mode = this.id.slice(0, -4);
  console.log(mode);
}