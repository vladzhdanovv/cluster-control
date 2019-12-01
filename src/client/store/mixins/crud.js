import mixin from 'mixin-deep';
import loadable from './loadable';
import shortid from 'shortid';

const EDIT = 'EDIT';
const REMOVE = 'REMOVE';
const ADD = 'ADD';

const defaultOptions = {
  getTarget: state => state.items,
  setTarget: (state, data) => state.items = data,
  setFetchedFlag: (state, value) => state.fetched = value,
  setIndex: (state, value) => {
    if (value && value.id) state.index[value.id] = value;
  },
};
export default (options) => {
  const { getTarget, setTarget, setFetchedFlag, setIndex, useShortId } = Object.assign({}, defaultOptions, options);
  return mixin({
    actions: {
      update({ commit }, patch) {
        commit(EDIT, patch);
      },
      remove({ commit, state }, item) {
        commit(REMOVE, item);
      },
      createReal() {},
      create({ dispatch, commit }, item) {
        if (useShortId) item.id = shortid.generate();
        commit(ADD, item);
        dispatch('createReal', item);
      },
      add({ commit }, item) {
        commit(ADD, item);
      }
    },
    mutations: {
      [ EDIT ](state, { origin, item }) {
        const target = getTarget(state);
        Vue.set(target, target.indexOf(origin), { ...origin, ...item });
      },
      [ REMOVE ](state, { item }) {
        const target = getTarget(state);
        target.splice(target.indexOf(item), 1);
      },
      [ ADD ](state, item) {
        setIndex(state, item);
        getTarget(state).splice(0, 0, item);
      }
    },
    socket: {
      events: {
        new: 'add'
      },
      actions: {
        remove: '=',
        update: '=',
        createReal: 'create'
      }
    }
  }, loadable({ getTarget, setTarget, setFetchedFlag }));
}
