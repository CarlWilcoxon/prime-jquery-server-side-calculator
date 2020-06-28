const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


app.post('/calculate', (req, res) => {
  console.log('input is',req.body);
  let result = {};
  let mode = req.body.mode;
  let num1 = parseFloat(req.body.num1);
  let num2 = parseFloat(req.body.num2);
  
  if (mode == 'plus') {
    result.answer = num1 + num2;
  } else if (mode == 'minus') {
    result.answer = num1 - num2;
  } else if (mode == 'divide') {
    result.answer = num1 / num2;
  } else if (mode == 'multiply') {
    result.answer = num1 * num2;
  }

  console.log( 'The result is:', result);
  // res.sendStatus(200);
  res.send(result);
});