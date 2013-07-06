// Copyright (c) 2012-2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
/*global dump */

var example = {};

(function() {
	"use strict";

	example.REQUIRED_FIELD_CLASS = "example-required";

	example.initializeValidation = function(textField, submitLink) {
		submitLink.addEventListener("click", function(event) {
			example.handleSubmit(textField, event);
		});
	};

	// Note: This code is only public because it needs to be called by _thin_ui_test.js
	example.handleSubmit = function(textField, event) {
		if (textField.value) return;

		event.preventDefault();
		textField.setAttribute("class", example.REQUIRED_FIELD_CLASS);
	};

}());
