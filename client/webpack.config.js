const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML Webpack Plugin
       
       new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your HTML template
        filename: 'index.html',
        chunks: ['main'],
      }),

      // Webpack PWA Manifest Plugin
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'Just Another Text Editor',
        description: 'Web-based PWA Text Editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),

      // Workbox Plugin
      new InjectManifest({
        swSrc: './src/sw.js', // path to your service worker file
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // CSS Loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel Loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
