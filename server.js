var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});


var mongoose = require('mongoose');
mongoose.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI);

var Schema = mongoose.Schema;

var testSchema = {
  demo: String,
};

var Test = mongoose.model('Test', testSchema);

Test.find({}, function(err, test) {
});

var a = new Test({demo: "asdf"});
a.save();