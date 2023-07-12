const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  entry: {
    benchmark: './benchmark.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
        exclude: /node_modules/,
      },
      // Fixing colorjs imports, see https://github.com/tokens-studio/figma-plugin/pull/1498#issuecomment-1372082627
      {
        test: /\.c?js$/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
        exclude: /node_modules\/(?!(colorjs.io)\/)/,
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    alias: {
      Types: path.resolve(__dirname, 'types'),
      '@types': path.resolve(__dirname, 'types'),
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'benchmark/dist'), // Compile into a folder called "dist"
  },
});
