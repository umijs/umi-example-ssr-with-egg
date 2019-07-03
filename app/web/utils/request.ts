import fetch from 'isomorphic-fetch';
import { notification } from 'antd';
import qs from 'qs';

export interface IOption extends RequestInit {
  params?: object;
}

const request = (url, option: IOption) => {
  const { params = {}, ...restOpts } = option || {};
  const paramsStr = params ? qs.stringify(option.params, { addQueryPrefix: true, arrayFormat: 'brackets', encode: false }) : '';
  // https://github.com/bitinn/node-fetch/issues/481
  const reqUrl = `${typeof SERVER_HOST !== 'undefined' ? SERVER_HOST : ''}${url}${paramsStr}`;
  return fetch(reqUrl, restOpts).then(res => res.json()).catch(e => {
    console.error('e', e);
    if (typeof document !== 'undefined') {
      notification.error({
        message: '请求错误',
        description: e,
      });
    }
  });
};


export default request;
