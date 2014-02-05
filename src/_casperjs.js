// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var URL = "http://localhost:5000";
	var REQUIRED_FIELD_CLASS = "example-required";

	casper.test.setUp(function(done) {
		casper.start(URL).run(done);
	});

	casper.test.begin("click by element", function(test) {
		casper.thenClick("#submit_link")
		.then(function() {
			test.assertExists("#text_field." + REQUIRED_FIELD_CLASS);
		}).run(function() {
			test.done();
		});
	});

	casper.test.begin("click by coordinate (example only; not something to do normally)", function(test) {
		casper.then(function() {
			var bounds = casper.getElementBounds("#submit_link");
			test.assertTruthy(bounds, "should have submit button");
			casper.mouse.click(bounds.left, bounds.top);
		}).then(function() {
			test.assertExists("#text_field." + REQUIRED_FIELD_CLASS);
		}).run(function() {
				test.done();
		});
	});

}());