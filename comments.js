// Create a webserver that can accept a POST request to /comments and
// store the posted data in a file called comments.json

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/comments', function(req, res) {
  res.sendFile(__dirname + '/comments.json');
});

app.post('/comments', function(req, res) {
  var comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json', 'utf8'));
  comments.push(req.body);
  fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.send(comments);
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});



