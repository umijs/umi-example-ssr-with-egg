import { join } from 'path';
import { IConfig } from 'umi-types';

const config: IConfig = {
  ssr: true,
  outputPath: '../public',
  plugins: [
    [
      'umi-plugin-react',
      {
        locale: {
          baseNavigator: false,
        },
        hd: true,
        antd: true,
        dva: {
          immer: true,
        },
        // TODO, page router css leak
        dynamicImport: {
          webpackChunkName: true,
        },
      },
    ],
  ],
  runtimePublicPath: true,
  disableCSSModules: true,
  cssModulesWithAffix: true,
};

export default config;
