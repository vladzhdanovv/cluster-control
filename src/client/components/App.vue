<template>
  <v-app id="inspire" v-scroll="onScroll" v-resize="onScroll">
    <v-app-bar
      app
      color="indigo"
      dark
      flat
      fixed
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
      <v-toolbar-title>Cluster Control</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        :value="drawer"
        @input="setDrawer"
        fixed
        app
    >
      <panel-menu/>
    </v-navigation-drawer>
    <v-content style="padding-top: 64px;">
      <v-container fluid>
        <router-view></router-view>
        <scroll-to-top :show="offsetTop > 0" speed="4"/>
        <vue-snotify/>
      </v-container>
    </v-content>
  </v-app>
</template>


<style lang="scss">
  .roll {
    transition: transform .35s linear;
  }
  .upside {
    transform: rotate(-180deg);
  }
  .align-end {
    align-items: flex-end !important;
  }
</style>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import PanelMenu from './PanelMenu';
  import ScrollToTop from './ScrollToTop';
  const panelModule = namespace('panel');

  @Component({
    components: {
      PanelMenu,
      ScrollToTop
    }
  })
  export default class App extends Vue {
    @panelModule.State drawer;
    @panelModule.Action toggleDrawer;
    @panelModule.Action setDrawer;
    offsetTop = 0;

    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    }
  }
</script>
