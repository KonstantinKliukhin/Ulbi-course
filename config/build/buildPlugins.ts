import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { type BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

export default function buildPlugins (
  options: BuildOptions
): webpack.Configuration['plugins'] {
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: options.paths.html, }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash]:8.css',
      chunkFilename: 'css/[name].[contenthash]:8.css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(options.isDev),
      __API__: JSON.stringify(options.apiUrl),
      __PROJECT__: JSON.stringify(options.project),
    }),
    new CopyPlugin({
      patterns: [
        { from: options.paths.locales, to: options.paths.buildLocales, },
      ],
    }),
  ];

  plugins.push(new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }));

  if (options.isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshPlugin());
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false, }));
  }

  return plugins;
}
