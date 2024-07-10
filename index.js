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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api", (req, res) => {
  const currentUtcTime = (new Date()).toUTCString()
  const currentUnixTime = Date.parse((new Date()))
  res.json({
    unix: currentUnixTime,
    utc: currentUtcTime
  }
  )
})

app.get("/api/:date?", (req, res) => {
const requestedDate = req.params.date
const parsedStringDate = new Date(requestedDate)
const parsedNumberDate = new Date(+requestedDate)
const isInvalidStringDate = isNaN(parsedStringDate.getDate())
const isInvalidUnixTimeStamp = isNaN((parsedNumberDate).getDate())

console.log(typeof(requestedDate))

if (isInvalidStringDate && isInvalidUnixTimeStamp){
  res.json({error: "Invalid Date"})
}else if(!isInvalidStringDate){

  res.json({
    unix: Number(parsedStringDate.getTime()),
    utc: parsedStringDate.toUTCString()
  })
}else if(!isInvalidUnixTimeStamp){
  res.json({
    unix:parseInt(requestedDate),
    utc:parsedNumberDate.toUTCString()
  })
}
})
