const path = require('path')
const pkg = require('./package.json')
const manifest = require('./manifest.json')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin')

module.exports = (env) => {
  const isProd = process.env.NODE_ENV === 'production'
  let FOLDER = 'dist'
  const entry = {
    'background': {
      import: path.join(__dirname, './src/background.js')
    },
    'assets/content': {
      import: path.join(__dirname, './src/content.js')
    },
    'assets/override': {
      import: path.join(__dirname, './src/entries/override.js')
    },
  }

  const config = {
    mode: process.env.NODE_ENV || 'development',
    devtool: isProd ? 'source-map' : 'inline-source-map',
    entry,
    output: {
      path: path.resolve(__dirname, `./${FOLDER}`),
      filename: '[name].js?[contenthash]',
    },
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 512000
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [ 'default', { discardComments: { removeAll: true } } ],
          },
        })
      ],
    },
    resolve: {
      symlinks: false,
      cacheWithContext: false,
      extensions: ['.js', '.jsx'],
      alias: {
        '@public': path.resolve(__dirname, '/public'),
      },
      plugins: [
        new DirectoryNamedWebpackPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader']
        },
      ],
    },
  }

  config.plugins = [
    new HtmlWebpackPlugin({
      title: 'New Tab',
      filename: 'override.html',
      template: './public/override.html',
      chunks: ['assets/override'],
    }),

    new WebpackExtensionManifestPlugin({
      config: {
        base: manifest,
        extend: { version: pkg.version }
      }
    }),
  ]

  return config
}

