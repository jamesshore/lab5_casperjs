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
			var error;
			error = inBrowserTest();
			if (!error) error = userInteractionTest();

			if (error) die(error);
			else phantom.exit(0);
		}
		catch(err) {
			die("Exception from PhantomJS: " + err.stack);
		}
	});

	function inBrowserTest() {
		return page.evaluate(function() {
			try {
				// Get the DOM elements
				var textField = document.getElementById("text_field");
				var submitLink = document.getElementById("submit_link");

				// Click the validate button
				submitLink.click();

				// Check the CSS class
				var actual = textField.className;
				var expected = example.REQUIRED_FIELD_CLASS;
				if (actual !== expected) return "textField class expected " + expected + " but was " + actual;
				else return null;
			}
			catch(err) {
				return "Exception in PhantomJS browser code: " + err.stack;
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

	function die(error) {
		console.log(error);
		phantom.exit(1);
		// Note: exit() doesn't take effect until execution is finished. So if you call exit(0)
		// after calling die(), PhantomJS will exit with errorcode 0, not errorcode 1. Be careful!
	}

}());