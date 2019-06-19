export default {
  ssr: true,
  outputPath: '../public',
  manifest: {},
  plugins: [
    [
      'umi-plugin-react',
      {
        hd: true,
        antd: true,
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
