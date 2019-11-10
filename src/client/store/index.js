import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import socket from 'vuex-socket-sync';
import io from 'socket.io-client/dist/socket.io.slim';

Vue.use(Vuex);
const state = {};
export default new Vuex.Store({
  strict: 'true',
  state,
  modules,
  plugins: [
    socket(io, modules)
  ]
});