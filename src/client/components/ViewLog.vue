<template>
  <v-container class="black grey--text pa-3">
    <v-layout row v-for="log in items" :key="log._id" :class="{ 'red--text': log.isError }">
      <v-flex xs12>
        <pre>[{{moment(log.createdAt).format('YYYY-MM-DD hh:mm:ss')}}] <strong>{{log.host}}</strong> $ {{log.command}}</pre>
      </v-flex>
      <v-flex xs12>
        <pre>{{log.output}}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import Vue from 'vue';
  import moment from 'moment';

  const logsModule = namespace('logs');

  @Component({})
  export default class ViewLog extends Vue {
    @logsModule.Action load;
    @logsModule.State items;

    created() {
      this.load();
    }

    get moment() {
      return moment;
    }
  }
</script>
