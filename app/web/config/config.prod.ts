import { IConfig } from 'umi-types';

export default {
  hash: true,
  publicPath: '',
  externals: {
    'react-helmet': 'react-helmet',
  },
  manifest: {
    fileName: '../../config/manifest.json',
  },
} as IConfig;
