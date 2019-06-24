import { IConfig } from 'umi-types';

export default {
  proxy: {
    '/restapi': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  },
} as IConfig;
