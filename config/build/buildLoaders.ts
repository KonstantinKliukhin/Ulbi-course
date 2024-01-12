import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export default function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = buildSvgLoader();

  const cssLoaders = buildCssLoader(options.isDev);

  const babelLoader = buildBabelLoader({ isTsx: false, isProd: !options.isDev, });
  const tsxBabelLoader = buildBabelLoader({ isTsx: true, isProd: !options.isDev, });

  return [fileLoader, svgLoader, babelLoader, tsxBabelLoader, cssLoaders,];
};
