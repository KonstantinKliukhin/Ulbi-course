import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { type BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export default function buildPlugins (options: BuildOptions): webpack.Configuration['plugins'] {
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: options.paths.html }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash]:8.css',
      chunkFilename: 'css/[name].[contenthash]:8.css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(options.isDev)
    }),
  ]

  if (options.isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new ReactRefreshPlugin())
  }

  return plugins
}
