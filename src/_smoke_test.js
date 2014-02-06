// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";
	var child_process = require("child_process");
	var fs = require("fs");
	var procfile = require("procfile");
	var path = require("path");

	var PORT = "5000";
	var BASE_URL = "http://localhost:" + PORT;

	var serverProcess;

	exports.setUp = function(done) {
		startServer(done);
	};

	exports.tearDown = function(done) {
		stopServer(done);
	};

	exports.test_runCasperJsTests = function(test) {
		var casperJsProcess = child_process.spawn("node_modules/.bin/casperjs", [ "test", "src/_casperjs.js" ], {
			stdio: "inherit",
			env: { "PHANTOMJS_EXECUTABLE": "./node_modules/phantomjs/lib/phantom/bin/phantomjs" }
		});
		casperJsProcess.on("exit", function(code) {
			test.equals(code, 0, "CasperJS test failures");
			test.done();
		});
	};

	exports.test_runPhantomJsTests = function(test) {
		var phantomJsProcess = child_process.spawn("node", ["node_modules/phantomjs/bin/phantomjs", "src/_phantomjs.js"], { stdio: "inherit" });
		phantomJsProcess.on("exit", function(code) {
			test.equals(code, 0, "PhantomJS test failures");
			test.done();
		});
	};

	function startServer(done) {
		launchProcess();
		waitForServerToBeReady(done);

		function launchProcess() {
			var commandLine = parseProcfile();
			serverProcess = child_process.spawn(commandLine.command, commandLine.options, { stdio: ["pipe", "pipe", process.stderr] });
		}

		function waitForServerToBeReady(callback) {
			var stdout = "";
			serverProcess.stdout.setEncoding("utf8");
			serverProcess.stdout.on("data", function(chunk) {
				if (stdout !== null) stdout += chunk;
				if (stdout.trim() === "Server started") callback();
			});
		}
	}

	function stopServer(done) {
		serverProcess.on("exit", function(code, signal) {
			done();
		});
		serverProcess.kill();
	}

	function parseProcfile() {
		var file = fs.readFileSync("Procfile", "utf8");
		var web = procfile.parse(file).web;
		web.options = web.options.map(function(option) {
			if (option === "$PORT") return PORT;
			else return option;
		});
		return web;
	}

}());