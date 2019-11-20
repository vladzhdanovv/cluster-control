const LOADING_START = 'LOADING_START';
const LOADING_FINISH = 'LOADING_FINISH';
const FILL = 'FILL';
const defaultOptions = {
  setTarget: (state, data) => state.data = data,
  setFetchedFlag: (state, value) => state.fetched = value,
  setIndex: (state, value) => {
    if (value && value.id) state.index[value.id] = value;
  }
};
export default (options) => {
  const { setTarget, setFetchedFlag, setIndex } = Object.assign({}, defaultOptions, options);
  return {
    actions: {
      load({ commit }) {
        commit(LOADING_START);
      },
      fill({ commit }, data) {
        commit(LOADING_FINISH);
        commit(FILL, data);
      }
    },
    mutations: {
      [ LOADING_START ]: state => setFetchedFlag(state, false),
      [ LOADING_FINISH ]: state => setFetchedFlag(state, true),
      [ FILL ]: (state, data) => {
        setTarget(state, data || []);
        if (Array.isArray(data)) data.map(item => setIndex(state, item));
      },
    },
    state: {
      index: {},
    },
    socket: {
      events: {
        data: 'fill',
      },
      actions: {
        load: '='
      }
    }
  }
}
