// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global mocha, describe, it, expect, example, beforeEach, afterEach, dump */
(function() {
	"use strict";

	mocha.setup({ignoreLeaks: true});

	describe("Example", function() {

		var textField;
		var submitLink;

		beforeEach(function() {
			document.body.insertAdjacentHTML("beforeend",
				"<input id='textField' type='text' />" +
				"<a id='submitLink' href='#foo'>Link</a>"
			);
			textField = document.getElementById("textField");
			submitLink = document.getElementById("submitLink");

			example.initializeValidation(textField, submitLink);
		});

		afterEach(function() {
			document.body.removeChild(textField);
			document.body.removeChild(submitLink);
		});

		it("follows link when field is not empty", function() {
			var eventCancelled;
			submitLink.addEventListener("click", function(event) {
				eventCancelled = event.defaultPrevented;
			});

			textField.value = "not empty";
			clickSubmitLink();
			expect(eventCancelled).to.be(false);
		});

		it("does not follow link when field is empty", function() {
			var eventCancelled;
			submitLink.addEventListener("click", function(event) {
				eventCancelled = event.defaultPrevented;
			});

			clickSubmitLink();
			expect(eventCancelled).to.be(true);
		});

		it("sets CSS class when field is empty", function() {
			clickSubmitLink();
			expect(textField.getAttribute("class")).to.equal(example.REQUIRED_FIELD_CLASS);
		});


		function clickSubmitLink() {
			var event = document.createEvent("MouseEvent");
			event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			submitLink.dispatchEvent(event);
		}

	});
}());