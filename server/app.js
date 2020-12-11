var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

var calendar = require('./routes/calendar')

var app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.use('/', calendar)

var port = 8000
app.listen(port, function() {
    console.log('Server started on port ' + port)
  })
  