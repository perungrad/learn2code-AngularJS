module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
      'sinon-chai',
    ],

    files: [
      'src/vendor/lodash/dist/lodash.min.js',
      'src/vendor/angular/angular.js',
      'src/vendor/angular-route/angular-route.min.js',
      'src/vendor/angular-mocks/angular-mocks.js',

      { pattern: 'src/images/**/*.{gif,jpg,jpeg,png,webp}', included:false, served:true, watched:false},
      'src/scripts/**/*.js',
      'dist/scripts/templates.js',

      { pattern:'fixtures/**/*.json', included:false, served:true, watched:true },
      'specs/unit/**/*.js',
    ],

    preprocessors: {
      'src/scripts/**/*.js': 'coverage'
    },

    proxies: {
      '/images': '/base/src/images'
    },

    reporters: [
      'progress',
      'coverage',
    ],
    coverageReporter: {
      dir: 'coverage',
      type: 'html',
    },
  });
};
