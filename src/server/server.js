// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var http = require("http");
	var fs = require("fs");
	var server;

	exports.start = function(portNumber, callback) {
		server = http.createServer();
		server.on("request", function(request, response) {
			fs.readFile("src/client/example.html", function(err, data) {
				if (err) throw err;   // proper error handling is outside the scope of this example
				response.end(data);
			});
		});
		server.listen(portNumber, callback);
	};

	exports.stop = function(callback) {
		server.close(callback);
	};
}());