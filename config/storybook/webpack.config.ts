import webpack from 'webpack';
import { type BuildPaths } from '../build/types/config';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

const buildStorybookSvgLoader = (config: webpack.Configuration) => {
  const svgRule = config.module?.rules?.find((rule) => {
    if (
      !!rule &&
      !(typeof rule === 'string') &&
      'test' in rule &&
      rule.test instanceof RegExp
    ) {
      return rule.test.test('.svg');
    }
    return false;
  }) as webpack.RuleSetRule;

  svgRule.exclude = /\.svg$/;

  return buildSvgLoader();
};
export default ({ config, }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    locales: '',
    buildLocales: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  config.resolve?.modules?.push(paths.src);
  config.resolve?.extensions?.push('.ts', '.tsx');
  config.module?.rules?.push(buildCssLoader(true));
  config.module?.rules?.push(buildStorybookSvgLoader(config));
  config.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify(''),
      __PROJECT__: JSON.stringify('storybook'),
    })
  );
  return config;
};
