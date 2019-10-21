import fetch from 'umi-request';
import { message } from 'antd';
import qs from 'qs';

export interface IOption extends RequestInit {
  params?: object;
}

const request = (url, option: IOption) => {
  const { params = {}, ...restOpts } = option || {};
  const paramsStr = params ? qs.stringify(option.params, { addQueryPrefix: true, arrayFormat: 'brackets', encode: false }) : '';
  // https://github.com/bitinn/node-fetch/issues/481
  const reqUrl = `${typeof process !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''}${url}${paramsStr}`;
  return fetch(reqUrl, restOpts).catch(e => {
    console.error('e', e);
    if (typeof document !== 'undefined' && !window.USE_PRERENDER) {
      message.error('请求错误');
    }
  });
};


export default request;
