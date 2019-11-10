const types = {
  SET_DRAWER: 'SET_DRAWER',
};
export default {
  namespaced: true,
  state: {
    drawer: false
  },
  actions: {
    toggleDrawer({ commit, state }) {
      commit(types.SET_DRAWER, !state.drawer);
    },
    setDrawer({ commit, state }, value) {
      commit(types.SET_DRAWER, value);
    },
  },
  mutations: {
    [ types.SET_DRAWER ](state, value) {
      state.drawer = value;
    }
  },
};
