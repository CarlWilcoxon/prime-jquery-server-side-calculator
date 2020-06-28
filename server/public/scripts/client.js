console.log('js');

let mode = '';
let modeSymbol = '';
let prevNum = 0;
let currentNum = 0;

$(document).ready(onReady);

//onReady first, then the rest in order
function onReady() {
  console.log('DOM is ready.');

  //setup event handlers
  $('#calculator').on('click', '.modeSelect', selectMode);
  $('#calculator').on('click', '.numberBtn', numberPress);
  $('#calculator').on('click', '#decimal-btn', decimalPress);
  $('#calculator').on('click', '#clear-btn', clearCalc);
  $('#calculator').on('click', '#clear-all-btn', clearAll);
  $('#calculator').on('click', '#equals-btn', calc);
}

//TODO rewrite passing to server and server logic.

function calc(event) {
  event.preventDefault();

  prevNum = parseFloat($('#prevNum-in').val());
  currentNum = parseFloat($('#currentNum-in').val());
  
  let parcel = {
    mode,
    prevNum,
    currentNum
  }

  console.log(parcel);

  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: parcel
    //then, when you get a response 
  }).then(function (response) {
    console.log('the response is:', response);
    updateResults(response);
  }).catch(function (err) {
    alert('Error, invalid input:', err);
  })
}

function clearAll(event) {
  event.preventDefault();

  mode = '';
  $('#calcScreen').val('');
  $('#entryHistory').empty();
  $('#result').empty();
  $('#result').append(0);
}

function clearCalc(event) {
  event.preventDefault();

  mode = '';
  $('#calcScreen').val('');
}

function decimalPress(event) {
  event.preventDefault();
  let currentDisplay = $('#calcScreen').val();

  if (parseFloat(currentDisplay) == parseInt(currentDisplay) &&
  currentDisplay.slice(-1) != '.') {
    $('#calcScreen').val(currentDisplay + '.');
  }

}

function numberPress(event) {
  event.preventDefault();

  let numberPressed = $(this).data().number;
  let currentDisplay = $('#calcScreen').val();
  $('#calcScreen').val(currentDisplay + numberPressed);
}

function selectMode(event) {
  event.preventDefault();
  //cut off the -btn from the id
  mode = this.id.slice(0, -4);
  console.log(mode);

  if (mode == 'plus') {
    modeSymbol = '+';
  } else if (mode == 'minus') {
    modeSymbol = '-';
  } else if (mode == 'divide') {
    modeSymbol = '/';
  } else if (mode == 'multiply') {
    modeSymbol = '*';
  }
}

function updateResults(resultObject) {
  $('#result').empty();
  $('#result').append(resultObject.answer);

  $('#entryHistory').prepend(`
  <li> ${prevNum} ${modeSymbol} ${currentNum} = ${resultObject.answer} </li>`)
}