import * as path from 'path';
import { BaseWebpackBundle } from '../BaseWebpackBundle';

const CopyPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

export default class AssetBundle extends BaseWebpackBundle {
  protected productionWebpackConfig: {} = {
    plugins: [],
  };

  protected sharedWebpackConfig = {
    entry: {
      assets: path.resolve(this.appConfig.path, 'assets.js'),
    },
    plugins: [
      new SpriteLoaderPlugin(),
      new CopyPlugin([
        {
          from: 'images/*',
          to: this.appConfig.assetBundleFolder,
        },
      ]),
    ],
    module: {
      rules: [
        {
          loader: 'file-loader',
          test: /\.(png|jpg|gif)$/,
          options: {
            name: path.join(this.appConfig.assetBundleFolder, 'images/[name].[ext]'),
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: path.join(this.appConfig.assetBundleFolder, 'fonts/[name].[ext]?[hash]'),
              },
            },
          ],
        },
        {
          test: /.*\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: path.join(this.appConfig.assetBundleFolder, 'images/spritemap.svg'),
              },
            },
            'svg-transform-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { convertFillsToCurrentColor: true },
                  { removeTitle: true },
                  { removeEditorsNSData: false },
                  { convertColors: { shorthex: false } },
                  { convertPathData: false },
                ],
              },
            },
          ],
        },
      ],
    },
  };
}
