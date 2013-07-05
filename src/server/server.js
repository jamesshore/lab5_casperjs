// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var http = require("http");
	var fs = require("fs");
	var send = require("send");
	var server;

	var CONTENT_DIR = "src/client";

	exports.start = function(portNumber, callback) {
		if (!portNumber) throw "port number is required";

		server = http.createServer();
		server.on("request", function(request, response) {
			send(request, request.url).
				root(CONTENT_DIR).
				on("error", handleError).
				pipe(response);

			function handleError(err) {
				if (err.status !== 404) throw err;

				response.statusCode = 404;
				response.end("404 Not Found");
			}
		});
		server.listen(portNumber, callback);
	};

	exports.stop = function(callback) {
		server.close(callback);
	};

}());