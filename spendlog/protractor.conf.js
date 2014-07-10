var glob = require('glob');


exports.config = {
  // start Selenium standalone locally
  seleniumServerJar: glob.sync('node_modules/protractor/selenium/selenium-server-standalone-*.jar')[0],

  // if null find unused port
  seleniumPort: null,

  // if null, Selenium will attempt to find chromedriver using $PATH
  chromeDriver: 'node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',

  // command line options to pass to Selenium
  seleniumArgs: [],

  // spec patterns to run, relative to the location of this file
  specs: [
    'specs/e2e/*.js'
  ],

  // for full list of available capabilities, see:
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome'
  },

  // base URL for your application under test
  // protractor.get() with relative paths will be prepended with this
  baseUrl: 'http://localhost:8000',

  // selector housing the angular app
  rootElement: 'body',

  // MiniJasmineNode options
  jasmineNodeOpts: {
    onComplete              : null,   // onComplete will be called just before the driver quits
    isVerbose               : false,  // display spec names
    showColors              : true,
    includeStackTrace       : true,
    defaultTimeoutInterval  : 10000
  }
};
