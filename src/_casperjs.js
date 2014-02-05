// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	casper.test.begin('Friendly test', function suite(test) {
		test.assertEquals("friendly", "friendly");
	  test.done();
	});

}());