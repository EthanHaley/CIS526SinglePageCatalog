"use strict";

var port = 12037;
var fs = require('fs');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('catalogApp.sqlite3', function(err) {
	if(err) console.error(err);
});
db.run("CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY, name TEXT, description TEXT, picture BLOB)");

var router = new (require('./lib/route')).Router(db);

router.get('/', function(req, res) {
	fs.readFile('public/index.html', function(err, body) {
		res.end(body);
	});
});

router.get('/app.js', function(req, res) {
	fs.readFile('public/app.js', function(err, body) {
		res.end(body);
	});
});

var entry = require('./src/resource/entry');
router.resource('/entry', entry)

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err) {
	var server = new http.Server(function(req, res) {
		router.route(req, res);
	});
	server.listen(port, function() {
		console.log("Catalog running on port " + port);
	});
});