import mixin from 'mixin-deep';
import loadable from '../mixins/loadable';

const types = {
  ADD_LINE: 'ADD_LINE',
};

export default mixin({
  namespaced: true,
  state: {
    items: [],
    fetched: false,
  },
  actions: {
    addLine({ commit }, payload) {
      commit(types.ADD_LINE, payload);
    },
  },
  mutations: {
    [ types.ADD_LINE ](state, payload) {
      state.items.unshift(payload);
    }
  },
  socket: {
    events: {
      addLine: '=',
    },
  }
}, loadable({}));
