<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:top>
            <item-bar name="Schedule" :editorConfig="editorConfig"
                      @add="editItem()"
                      @save="saveItem()"
                      @create="createItem()"
                      @close="close()"
            >
              <v-container>
                <v-row>
                  <v-col cols="2" sm="2" md="2">
                    <v-checkbox :value="editorConfig.item.isGlobal" @change="setGlobal($event)" label="Global" />
                  </v-col>
                  <v-col cols="10" sm="10" md="10">
                    <select-server :disabled="editorConfig.item.isGlobal" v-model="editorConfig.item.servers" multiple chips label="Servers"/>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <select-command v-model="editorConfig.item.command" label="Command"/>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-menu
                      ref="menu"
                      v-model="timePickerMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editorConfig.item.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editorConfig.item.time"
                          label="Time for launch"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timePickerMenu"
                        v-model="editorConfig.item.time"
                        format="24hr"
                        @click:minute="$refs.menu.save(editorConfig.item.time)"
                        full-width
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </item-bar>
          </template>
          <template v-slot:item.servers="{ item }">
            <v-chip v-if="item.Servers" color="amber" v-for="(server, index) in item.Servers" :key="index">{{server && server.name}}</v-chip>
          </template>
          <template v-slot:item.command="{ item }">
            {{ item.Command && item.Command.name }}
          </template>
          <template v-slot:item.action="{ item }">
            <item-actions @edit="editItem(item)" @remove="removeItem(item)"></item-actions>
          </template>
          <template v-slot:no-data>
            <no-items @loadItems="load()"></no-items>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Component, { mixins } from 'vue-class-component';
  import EditableMixin from '../../mixins/editable';
  import SelectServer from '../SelectServer';
  import SelectCommand from '../SelectCommand';
  import { namespace } from 'vuex-class';

  const serversModule = namespace('servers');

  @Component({
    components: {
      SelectServer,
      SelectCommand,
    }
  })
  export default class SchedulesControl extends mixins(EditableMixin('schedules', {
    servers: [],
    command: '',
    isGlobal: false,
    time: '00:00'
  }, '_id')) {
    @serversModule.State(state => state.items) servers;
    timePickerMenu = false;
    headers = [
      {
        text: "Servers",
        align: "left",
        sortable: false,
        value: "servers"
      },
      {
        text: "Command",
        align: "left",
        sortable: false,
        value: "command"
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
        value: "action",
      }
    ];
    setGlobal(value) {
      this.editorConfig.item.isGlobal = !!value;
      const { servers } = this.editorConfig.item;
      this.__before = servers.splice(0, servers.length);
      servers.push(...(value ? this.servers.map(({ _id }) => _id) : this.__before));
    }
  }
</script>
