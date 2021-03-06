"use strict";

module.exports = {
	list: list,
	create: create,
	read: read,
	update: update,
	destroy: destroy
}

function list(req, res, db) {
	db.all("SELECT * FROM entries", [], function(err, entries) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(entries));
	});
}

function create(req, res, db) {
	var multipart = require('/lib/form-multipart');
	var urlencoded = require('/lib/form-urlencoded');
	var json = require('/lib/form-json');
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});

	function insert(req, res, db) {
		var entry = req.body;	
		db.run("INSERT INTO entries (name, description, imageFilename, image) VALUE (?, ?, ?, ?)",
			[body.name, body.description, body.image.name, body.image.data],
			function(err) {
				if(err) {
					console.error(err);
					res.statusCode = 500;
					res.end("Could not insert entry into database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	}

	switch(req.headers['content-type']) {
    case 'multipart/form-data':
      // A multipart form
      multipart(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/x-www-form-urlencoded':
      // Standard form encoding
      urlencoded(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/json':
    case 'text/json':
      // A JSON string\
      json(req, res, function(req, res) {
        insert(req, res, db);
      });
      break;
  }
}

function read(req, res, db) {
	var id = req.params.id;
	db.get("SELECT * FROM entries WHERE id=?", [id], function(err, entry) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!entry) {
			res.statusCode = 404;
			res.end("Entry Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(entry));
	});
}

function update(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});

	req.on("data", function(data) {
		body += data;
	});

	req.on("end", function() {
		var entry = JSON.parse(body);
		addImage = uploadImage(req, res);
		db.run("UPDATE entries SET name=?, description=?, image=? WHERE id=?",
			[entry.name, entry.description, entry.image.filename, entry.image.contentType,, id],
			function(err) {
				if(err) {
					console.error(err);
					res.statusCode = 500;
					res.end("Could not update entry in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function destroy(req, res, db) {
	var id = req.params.id;
	db.run("DELETE FROM entries WHERE id=?", [id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.statusCode = 200;
		res.end();
	});
}