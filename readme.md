Lessons Learned: PhantomJS and Front-End Smoke Tests
=============

This repository contains the sample code for the titular [Lessons Learned episode](http://www.letscodejavascript.com/v3/episodes/lessons_learned/13) of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

The source code in this repository demonstrates how to use PhantomJS to conduct an end-to-end smoke test including front-end JavaScript code. The test files are:

1. `src/_smoke_test.js` starts the server and runs PhantomJS.
2. `src/_phantomjs.js` contains the actual test code that runs inside PhantomJS.

The production code (`src/run.js`, `src/client/`, and `src/server/`) displays a text field and validates whether it's empty. (You may also find unit tests in the production code directories. They use the pattern `_*_test.js`.)

For further details about how this code works, watch [the screencast](http://www.letscodejavascript.com/v3/episodes/lessons_learned/13).


Running the Tests
-----------------

Before running the tests for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip [the source code](https://github.com/jamesshore/ll10_gui_test_strategies/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.

To run the smoke test only:

1. Run `./jake.sh smoketest` (Unix/Mac) or `jake smoketest` (Windows).

To run all tests (JSHint, server-side unit tests, and client-side unit tests, in addition to the smoke tests):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test against and point each one at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows). Repeat as desired.


Manual Testing
--------------

To run the code and test it manually:

1. Run `node src/run.js 5000`. (If you have Foreman or the Heroku Toolbelt installed, you can run `foreman start` instead.)
2. Visit `http://localhost:5000` in a browser.
