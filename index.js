var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))

var route_install = require('./public/install');
app.use('/install', route_install);

var route_finish_auth = require('./public/finish_auth');
app.use('/finish_auth', route_finish_auth);

app.listen(app.get('port'), function() {
  console.log("Node2 app is running at localhost:" + app.get('port'))
})
