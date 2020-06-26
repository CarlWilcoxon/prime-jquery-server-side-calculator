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
/*

app.post('/new-game', (req, res) => {
  console.log('Range is',req.body);
  minNum = req.body['min'];
  maxNum = req.body['max'];
  randomNumber = randomInt(minNum, maxNum);
  res.send('New game started!');
});

app.post('/guess', (req, res) => {
  let tempObject = req.body;
  console.log('guessing', tempObject); //here

  results = {};
  
  tempObject.botGuess = botGuess();

  //for loop to compare each guess to the random number
  for (const property in tempObject) {
    console.log('list each object', tempObject[property]);
    let guess = parseInt(tempObject[property]);

    if (guess == randomNumber) {
      results[property] = 'winner';
    } else if (guess < randomNumber) {
      results[property] = 'too low';
    } else if (guess > randomNumber) {
      results[property] = 'too high';
    }
  };

  res.send(results);
});
*/