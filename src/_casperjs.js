// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var URL = "http://localhost:5000";
	var REQUIRED_FIELD_CLASS = "example-required";

	casper.test.begin('simulated mouse click (browser event)', function suite(test) {
		casper.start(URL)
		.thenClick("#submit_link")
		.then(function() {
			test.assertExists("#text_field." + REQUIRED_FIELD_CLASS);
		}).run(function() {
			test.done();
		});
	});

}());