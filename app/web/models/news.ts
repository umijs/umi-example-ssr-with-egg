import { Model } from 'dva';

const HomeModel: Model = {
  namespace: 'news',
  state: {
    count: 0,
  },
  effects: {},
  reducers: {
    addCount(state) {
      state.count = state.count + 1;
    },
    resetCount(state) {
      state.count = 0;
    }
  },
};

export default HomeModel;
