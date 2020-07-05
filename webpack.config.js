const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'start';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'inline-source-map';
  }
  return 'none';
}

function setDMode() {
  if (isProd) {
    return 'production';
  }
  return 'development';
}

const config = {
  target: 'web',
  entry: {
    main: './src/pages/main/main.js',
    login: './src/pages/login/login.js',
    savanna: './src/pages/savanna/savanna.js',
    speakIt: './src/pages/speakIt/speakIt.js',
    settings: './src/pages/settings/settings.js',
    SRgame: './src/pages/SRgame/SRgame.js',
    dictionary: './src/pages/dictionary/dictionary.js',
    memory: './src/pages/memoryGame/memory.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      }],
    },
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
          ],
        },
      },
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js',
            },
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|svg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          name: '[name].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
            quality: 75,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
            optimizationLevel: 1,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
      ],
    },
    {
      test: /\.(woff|woff2|ttf|otf|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      }],
    },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang-main',
      favicon: './assets/images/favicon.ico',
      chunks: ['main'],
      filename: './main.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang',
      favicon: './assets/images/favicon.ico',
      chunks: ['login'],
      template: 'src/pages/login/login.html',
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang-savanna',
      favicon: './assets/images/favicon.ico',
      chunks: ['savanna'],
      filename: './savanna.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang-speakIt',
      favicon: './assets/images/favicon.ico',
      chunks: ['speakIt'],
      filename: './speakIt.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang',
      favicon: './assets/images/favicon.ico',
      chunks: ['settings'],
      template: 'src/pages/settings/settings.html',
      filename: './settings.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang SR game',
      favicon: './assets/images/favicon.ico',
      chunks: ['SRgame'],
      template: 'src/pages/SRgame/SRgame.html',
      filename: './SRgame.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang',
      favicon: './assets/images/favicon.ico',
      chunks: ['dictionary'],
      template: 'src/pages/dictionary/dictionary.html',
      filename: './dictionary.html',
    }),
    new HtmlWebPackPlugin({
      title: 'RS lang',
      favicon: './assets/images/favicon.ico',
      chunks: ['memory'],
      template: 'src/pages/memoryGame/memory.html',
      filename: './memory.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'assets'),
        to: path.join(__dirname, 'dist', 'assets'),
      },
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none',
  },
};

module.exports = config;
