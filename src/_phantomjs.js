// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
/*global phantom, $ */

(function() {
	"use strict";

	var URL = "http://localhost:5000";

	var page = require("webpage").create();

	page.onConsoleMessage = function(message) {
		console.log("CONSOLE: " + message);
	};

	page.open(URL, function(success) {
		if (success !== "success") die("PhantomJS could not load " + URL);

		try {
			var error = page.evaluate(inBrowser);
			if (error) die(error);
			else phantom.exit(0);
		}
		catch(err) {
			die("Exception from PhantomJS: " + err);
		}
	});

	function inBrowser() {
		try {
			console.log("HI");
			return null;
//			var client = require("./client.js");
//			var HtmlElement = require("./html_element.js");
//
//			var drawingArea = new HtmlElement($("#drawingArea"));
//			drawingArea.doMouseDown(10, 20);
//			drawingArea.doMouseMove(50, 60);
//			drawingArea.doMouseUp(50, 60);
//
//			var actual = JSON.stringify(client.drawingAreaCanvas.lineSegments());
//			var expected = JSON.stringify([[ "10", "20", "50", "60" ]]);
//
//			if (actual !== expected) return "lines drawn expected " + expected + " but was " + actual;
//			else return null;
		}
		catch(err) {
			return "Exception in PhantomJS browser code";
		}
	}

	function die(error) {
		console.log(error);
		phantom.exit(1);
	}

}());