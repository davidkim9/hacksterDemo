var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', 'public');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongo Stuff

var mongoose = require('mongoose');
mongoose.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI || "mongodb://localhost/local");

var Schema = mongoose.Schema;

var locationGPSSchema = {
  device: {type: String, unique: true},
  lat: Number,
  lon: Number,
  dateCreated: {type: Date, default: Date.now},
};

var LocationGPS = mongoose.model('LocationGPS', locationGPSSchema);

//Create device if doesn't exist
var deviceId = "Device1";
var a = new LocationGPS({
	device: deviceId,
	lat: 1,
	lon: 1
});
a.save();

app.post('/gps', function (req, res) {
	var body = req.body;
	if(body && body.device && body.lat && body.lon) {
		var device = body.device;

		LocationGPS.findOne({device: device}, function(err, locationData) {
			if(!err && locationData){
				//Update
				console.log(locationData);
				locationData.lat = body.lat;
				locationData.lon = body.lon;
				locationData.dateCreated = new Date();
				locationData.save(function(err){
					return res.send('Bueno!');
				});
			}else{
				return res.sendStatus(400);
			}
		});
	}else{
		return res.sendStatus(400);
	}
});

app.get('/gps', function (req, res) {
	LocationGPS.findOne({device: deviceId}, function(err, locationData) {
		console.log(err, locationData);

		res.send({lat: locationData.lat, lon: locationData.lon});
	});
	console.log("Wut");
});

app.use(express.static('./public'));
app.get('/', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 1337;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});
