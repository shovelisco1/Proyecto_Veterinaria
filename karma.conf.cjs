module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    files: [
      'src/**/*.spec.jsx',
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};