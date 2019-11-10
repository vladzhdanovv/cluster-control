<template>
  <v-list dense>
    <template v-for="item in menu">
      <v-list-group v-if="item.children" v-model="item.active" :prepend-icon="item.action" no-action>
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="subItem in item.children" :key="subItem.title" :to="subItem.to">
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
      <v-list-item :to="item.to" v-if="item.to">
        <v-list-item-action>
          <v-icon>{{item.action}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  import menu from '../menu';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component()
  export default class PanelMenu extends Vue {
    menu = menu;
  }
</script>
