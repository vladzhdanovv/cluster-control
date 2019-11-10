<template>
  <v-app-bar class="elevation-9" color="white" fixed app>
    <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    <v-toolbar-title class="black--text font-weight-black">{{ title }}</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items style="align-items: center;">
      <slot></slot>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  const panelModule = namespace('panel');

  @Component({
    props: {
      title: String
    }
  })
  export default class PageToolbar extends Vue {
    @panelModule.Action toggleDrawer;
  }
</script>
