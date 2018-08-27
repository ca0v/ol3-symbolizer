var debug = true
var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  packages: [
    {
      name: 'xstyle',
      location: 'https://cdn.rawgit.com/kriszyp/xstyle/v0.3.2',
      main: debug ? 'xstyle' : 'xstyle'
    }
  ],

  paths: {
    "openlayers": "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.3.2/ol" + (debug ? "-debug" : ""),
    "mocha": "https://cdnjs.cloudflare.com/ajax/libs/mocha/5.2.0/mocha" + (!debug ? ".min" : ""),
    "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery" + (!debug ? ".min" : "")
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
