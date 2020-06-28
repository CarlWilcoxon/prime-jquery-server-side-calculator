console.log('js');

let mode = '';
let modeSymbol = '';
let num1 = 0;
let num2 = 0;

$(document).ready(onReady);

//onReady first, then the rest in order
function onReady() {
  console.log('DOM is ready.');

  //load history
  loadHistory();

  //setup event handlers
  $('#calculator').on('click', '.modeSelect', selectMode);
  $('#calculator').on('click', '#clear-btn', clearCalc);
  $('#calculator').on('click', '#equals-btn', calc);
}

function calc(event) {
  event.preventDefault();

  num1 = parseFloat($('#num1-in').val());
  num2 = parseFloat($('#num2-in').val());
  
  let parcel = {
    mode,
    num1,
    num2
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

function clearCalc(event) {
  event.preventDefault();

  mode = '';
  $('#num1-in').val('');
  $('#num2-in').val('');

  $('#result').empty();
  $('#result').append('0');
}

function loadHistory() {
  $.ajax({
    type: 'GET',
    url: '/load-history'
    //then, when you get a response 
  }).then(function (response) {
    console.log('the response is:', response);
    parseHistory(response);
  }).catch(function (err) {
    alert('Error, invalid input:', err);
  })
}

function parseHistory(historyParcel) {
  console.log('parsing');
  for (key in historyParcel) {
    $('#entryHistory').prepend(historyParcel[key]);
  }
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
  mode = '';
  $('#num1-in').val('');
  $('#num2-in').val('');

  $('#entryHistory').prepend(`
  <li> ${num1} ${modeSymbol} ${num2} = ${resultObject.answer} </li>`)

  let parcel = {
    'newEntry' : `
    <li> ${num1} ${modeSymbol} ${num2} = ${resultObject.answer} </li>`
  }

  $.ajax({
    type: 'POST',
    url: '/add-history',
    data: parcel
    //then, when you get a response 
  }).then(function (response) {
    console.log('the response from adding history is:', response);
  }).catch(function (err) {
    alert('Error, invalid input:', err);
  })
}