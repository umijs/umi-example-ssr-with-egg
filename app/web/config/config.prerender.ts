import { IConfig } from 'umi-types';

export default {
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        hd: true,
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
        },
      },
    ],
    [ '@umijs/plugin-prerender' ],
  ],
} as IConfig;
