import { IConfig } from 'umi-types';

export const metas = [
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'format-detection', content: 'telephone=no' },
  { name: 'format-detection', content: 'email=no' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
];
export const headScripts = [
  '//as.alipayobjects.com/g/animajs/anima-hd/5.0.0/vw.js',
  '//as.alipayobjects.com/g/animajs/anima-hd/5.0.0/flex.js',
  `(function() {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth >= 750) {
      vw(100, 750);
    } else {
      flex();
    }
  })();`
];

const config: IConfig = {
  ssr: true,
  outputPath: '../public',
  // for dev server
  publicPath: 'http://localhost:8000/',
  plugins: [
    [
      'umi-plugin-react',
      {
        metas,
        headScripts,
        locale: {
          baseNavigator: false,
          useLocalStorage: false,
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
  runtimePublicPath: true,
  disableCSSModules: true,
  cssModulesWithAffix: true,
};

export default config;
