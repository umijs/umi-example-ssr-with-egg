import { IConfig } from 'umi-types';

const config: IConfig = {
  ssr: true,
  outputPath: '../public',
  manifest: {},
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
  ],
  runtimePublicPath: true,
  disableCSSModules: true,
  cssModulesWithAffix: true,
};

export default config;
