import vuetify from '@/plugins/vuetify';
import "intersection-observer";
import "babel-polyfill";
import Vue from 'vue';
import store from './store';
import router from './router';
import VueRouter from 'vue-router';
import App from './components/App';
import PageToolbar from './components/PageToolbar';
import ItemActions from './components/Control/ItemActions';
import ItemBar from './components/Control/ItemBar';
import NoItems from './components/Control/NoItems';
import Snotify from 'vue-snotify';
import VeeValidate from 'vee-validate';
import VueObserveVisibility from 'vue-observe-visibility';
import Component from 'vue-class-component';

(function () {
  'use strict';
  Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
  ]);
  Vue.use(VueObserveVisibility);
  Vue.use(Snotify, {
    toast: {
      titleMaxLength: 24,
      bodyMaxLength: 500,
      timeout: 4000
    }
  });

  Vue.use(VueRouter);
  Vue.use(VeeValidate);
  Vue.component('page-toolbar', PageToolbar);
  Vue.component('item-actions', ItemActions);
  Vue.component('item-bar', ItemBar);
  Vue.component('no-items', NoItems);
  Vue.config.productionTip = false;
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
  window.Vue = Vue;
}());

