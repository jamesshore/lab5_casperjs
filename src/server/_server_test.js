// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function () {
	"use strict";

	var server = require("./server.js");
	var http = require("http");

	exports.setUp = function(done) {
		server.start(5000, function() {
			done();
		});
	};

	exports.tearDown = function(done) {
		server.stop(function() {
			done();
		});
	};

	exports.test_respondsToRequests = function(test) {
		getPage("http://localhost:5000", function(error, response, responseText) {
			test.equals(response.statusCode, 200, "status code");
			test.ok(responseText.indexOf("Home Page") !== -1, "response text should contain marker");
			test.done(error);
		});
	};

	// Note: comprehensive server unit tests are outside the scope of this example.

	function getPage(url, callback) {
		var request = http.get(url);
		request.on("response", function(response) {
			var error = null;
			var responseText = "";
			response.setEncoding("utf8");

			response.on("data", function(chunk) {
				responseText += chunk;
			});
			response.on("error", function(err) {
				error = err;
			});
			response.on("end", function() {
				callback(error, response, responseText);
			});
		});
	}

}());
