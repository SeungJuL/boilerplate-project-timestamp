// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  let inputDate = req.params.date;
  let time;

  // check input data
  if (!inputDate) {
    time = new Date();
  } else if (!isNaN(inputDate)) {
    time = new Date(Number(inputDate));
  } else {
    time = new Date(inputDate);
  }

  // if input data is not valid
  if (isNaN(time.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  const unix = time.getTime();
  const utc = time.toUTCString();

  res.json({
    unix: unix,
    utc: utc
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
