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
        hd: false,
        antd: true,
        dva: {
          immer: true,
        },
        // TODO, page router css leak
        // dynamicImport: {
        //   webpackChunkName: true,
        // },
      },
    ],
  ],
  extraBabelPlugins: [
    [require.resolve('babel-plugin-import'), { libraryName: "antd", style: 'less' }],
    [require.resolve('babel-plugin-import'), { libraryName: "antd-mobile", style: 'less' }, 'antd-mobile-import'],
  ],
  runtimePublicPath: true,
  disableCSSModules: true,
  cssModulesWithAffix: true,
};

export default config;
