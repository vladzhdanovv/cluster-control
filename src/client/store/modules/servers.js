import mixin from 'mixin-deep';
import Vue from 'vue';
import crud from '../mixins/crud';

const types = {
  LATENCY_UPDATE: 'LATENCY_UPDATE',
  SSH_STATUS_UPDATE: 'SSH_STATUS_UPDATE',
};

function updateServerField({ state, commit }, type, host, value) {
  const item = state.items.find(item => item.host === host);
  if (item) commit(type, { item, value });
  else console.log('item does not exist');
}

export default mixin({
  namespaced: true,
  state: {
    items: [],
    fetched: false,
  },
  actions: {
    checkLatency(ctx, host) {},
    checkSsh() {},
    run() {},
    updateLatency(ctx, { host, latency }) {
      updateServerField(ctx, types.LATENCY_UPDATE, host, latency);
    },
    updateSshStatus(ctx, { host, status }) {
      updateServerField(ctx, types.SSH_STATUS_UPDATE, host, status);
    },
  },
  mutations: {
    [ types.LATENCY_UPDATE ](state, { item, value }) {
      Vue.set(item, 'latency', value);
    },
    [ types.SSH_STATUS_UPDATE ](state, { item, value }) {
      Vue.set(item, 'sshStatus', value);
    }
  },
  socket: {
    actions: {
      run: '=',
    },
    events: {
      updateLatency: '=',
      updateSshStatus: '=',
    },
  }
}, crud({}));
