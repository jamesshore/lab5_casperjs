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
			phantom.exit(0);
		}
		catch(err) {
			die("Exception from PhantomJS: " + err);
		}
	});

	function inBrowserTest() {
		return page.evaluate(function() {
			try {
				var textField = document.getElementById("textField");
				var validateButton = document.getElementById("validate");

				validateButton.click();
				var actual = textField.getAttribute("class");
				var expected = example.REQUIRED_FIELD_CLASS;
				if (actual !== expected) return "textField class expected " + expected + " but was " + actual;
				else return null;
			}
			catch(err) {
				return "Exception in PhantomJS browser code";
			}
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