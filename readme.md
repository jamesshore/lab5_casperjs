The Lab: CasperJS
=============

This repository contains the sample code for the above [Lab episode](http://www.letscodejavascript.com/v3/episodes/lab/5) of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

This episode was focused on evaluating [CasperJS](http://casperjs.org/), a scripting and testing utility for [PhantomJS](http://phantomjs.org/) (and [SlimerJS](http://slimerjs.org/)).

The source code in this repository demonstrates how to use CasperJS to conduct an end-to-end smoke test that includes front-end JavaScript code. It's based on the [PhantomJS example](https://github.com/jamesshore/ll13_phantomjs_smoke_test) from an [earlier Lessons Learned episode](http://www.letscodejavascript.com/v3/episodes/lessons_learned/13).

1. `src/_smoke_test.js` starts the server and runs CasperJS (and PhantomJS).
2. `src/_casperjs.js` contains the actual test code that runs inside CasperJS.
3. `src/_phantomjs.js` contains test code that does almost the same things. Compare it side-by-side with the CasperJS code.

The production code displays a text field and validates whether it's empty. You can find the code in `src/client/` and `src/server/`. Unit tests can also be found in those folders.

For further details about how this code works, watch [the screencast](http://www.letscodejavascript.com/v3/episodes/lab/5).


Running the Tests
-----------------

Before running the tests for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip [the source code](https://github.com/jamesshore/ll10_gui_test_strategies/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.

On Windows, CasperJS requires Python and .NET. The CasperJS part of the build has not been tested on Windows.

To run the smoke test only:

1. Run `./jake.sh smoketest` (Unix/Mac) or `jake smoketest` (Windows).

To run a full build (JSHint, server-side unit tests, and client-side unit tests, and smoke tests):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test against and point each one at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows). Repeat as desired.



Manual Testing
--------------

To run the code and test it manually:

1. Run `node src/run.js 5000`. (If you have Foreman or the Heroku Toolbelt installed, you can run `foreman start` instead.)
2. Visit `http://localhost:5000` in a browser.
