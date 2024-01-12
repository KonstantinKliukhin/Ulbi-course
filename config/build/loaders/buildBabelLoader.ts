import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';

interface BuildBabelLoaderArg {
  isTsx?: boolean;
  isProd?: boolean;
}

export const buildBabelLoader = (arg: BuildBabelLoaderArg) => ({
  test: arg.isTsx ? /\.(?:jsx|tsx)$/ : /\.(?:js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        ['@babel/preset-env', { targets: 'defaults', },],
      ],
      plugins: [
        ['@babel/plugin-transform-typescript', { isTsx: arg.isTsx, },],
        '@babel/plugin-transform-runtime',
        ...(arg.isTsx && arg.isProd)
          ? [[
              babelRemovePropsPlugin,
              {
                props: ['data-testid',],
              },
            ],]
          : [],
        // ['i18next-extract', { nsSeparator: '~', locales: ['uk', 'en',], },]
      ],
    },
  },
});
