module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
      'sinon-chai',
    ],

    files: [
      'src/vendor/lodash/dist/lodash.min.js',
      'src/vendor/angular/angular.js',
      'src/vendor/angular-animate/angular-animate.js',
      'src/vendor/angular-resource/angular-resource.js',
      'src/vendor/angular-route/angular-route.js',
      'src/vendor/angular-strap/dist/angular-strap.js',
      'src/vendor/angular-strap/dist/angular-strap.tpl.js',
      'src/vendor/angular-growl-v2/build/angular-growl.js',
      'src/vendor/angular-mocks/angular-mocks.js',

      { pattern: 'src/images/**/*.{gif,jpg,jpeg,png,webp}', included:false, served:true, watched:false},
      'src/app/**/*.js',
      'dist/app/templates.js',

      { pattern:'fixtures/**/*.json', included:false, served:true, watched:true },
      'specs/unit/**/*.js',
    ],

    preprocessors: {
      'src/app/**/*.js': 'coverage'
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
