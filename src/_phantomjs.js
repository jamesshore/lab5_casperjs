// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
/*global phantom, document, example */

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
			runTest(inBrowserTest);
			runTest(userInteractionTest);
			phantom.exit(0);
		}
		catch(err) {
			die("Exception from PhantomJS: " + err.stack);
		}
	});

	function inBrowserTest() {
		return page.evaluate(function() {
			try {
				// Get the DOM elements
				var textField = document.getElementById("textField");
				var validateButton = document.getElementById("validate");

				// Click the validate button
				validateButton.click();

				// Check the CSS class
				var actual = textField.className;
				var expected = example.REQUIRED_FIELD_CLASS;
				if (actual !== expected) return "textField class expected " + expected + " but was " + actual;
				else return null;
			}
			catch(err) {
				return "Exception in PhantomJS browser code";
			}
		});
	}

	function userInteractionTest() {
		// Get validate button location
		var location = page.evaluate(function() {
			var validateButton = document.getElementById("validate");
			var bounds = validateButton.getBoundingClientRect();
			return {
				x: bounds.left + document.body.scrollLeft,
				y: bounds.top + document.body.scrollTop
			};
		});

		// Click the validate button
		page.sendEvent("click", location.x, location.y);

		// Check the CSS class
		return page.evaluate(function() {
			var textField = document.getElementById("textField");
			var actual = textField.className;
			var expected = example.REQUIRED_FIELD_CLASS;
			if (actual !== expected) return "textField class expected " + expected + " but was " + actual;
			else return null;
		});
	}

	function runTest(testFn) {
		var error = testFn();
		if (error) die(error);
	}

	function die(error) {
		console.log(error);
		phantom.exit(1);
	}

}());