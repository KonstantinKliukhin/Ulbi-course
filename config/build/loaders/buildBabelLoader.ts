import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';

interface BuildBabelLoaderArg {
  isTsx?: boolean;
}

export const buildBabelLoader = (arg: BuildBabelLoaderArg) => ({
  test: arg.isTsx ? /\.(?:jsx|tsx)$/ : /\.(?:js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { targets: 'defaults', },],
      ],
      plugins: [
        ['@babel/plugin-transform-typescript', { isTsx: arg.isTsx, },],
        '@babel/plugin-transform-runtime',
        ...arg.isTsx
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
