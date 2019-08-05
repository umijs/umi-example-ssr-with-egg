import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        hd: true,
        locale: {
          baseNavigator: false,
        },
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
    ['@umijs/plugin-prerender', {
      runInMockContext: {
        // your server address, for prerender get data
        url: 'http://localhost:7001',
      }
    }],
  ],
};

export default config;
