const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    'build/bundle': ['./src/index.ts'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  devServer: {
    hot: true,
    open: true,
    host: 'localhost',
    static: {
      directory: path.join(__dirname, 'public'),
    }
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: !isProduction,
          context: path.resolve(__dirname),
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        }
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: isProduction,
            hotReload: !isProduction,
            preprocess: sveltePreprocess(),
            compilerOptions: {
              dev: !isProduction,
            },
            hotOptions: {
              preserveLocalState: false,
              noReload: false,
              optimistic: false,
            },
          },
        },
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte/src/runtime')
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import']
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
