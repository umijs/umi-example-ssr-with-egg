import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        hd: true,
        antd: true,
        dva: {
          immer: true,
        },
        // TODO, page router css leak
        dynamicImport: false,
        // dynamicImport: {
        //   webpackChunkName: true,
        // },
      },
    ],
    [ '@umijs/plugin-prerender' ],
  ],
};

export default config;
