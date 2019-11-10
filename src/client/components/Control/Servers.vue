<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="items"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Servers</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="editorConfig.isEnabled" max-width="1000px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on" @click="editItem()">New Item</v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-form ref="editor" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :rules="[v => !!v || 'Name is required']"
                              v-model="editorConfig.item.name"
                              required
                              label="Server Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :rules="[v => !!v || 'Host is required']"
                              v-model="editorConfig.item.host"
                              required
                              label="Host"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="2" md="2">
                            <v-text-field
                              :rules="[v => !!v || 'Port is required']"
                              v-model="editorConfig.item.port"
                              required
                              label="SSH Port"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5" md="5">
                            <v-text-field
                              :rules="[v => !!v || 'User is required']"
                              v-model="editorConfig.item.user"
                              required
                              label="User"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5" md="5">
                            <v-text-field
                              :rules="[v => !!v || 'Password is required']"
                              v-model="editorConfig.item.password"
                              required
                              label="Password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" :disabled="!valid" text @click="editorConfig.isUpdateMode ? saveItem() : createItem()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.latency="{ item }">
            <v-chip :color="item.latency > 0 ? 'green' : 'red'" dark>{{ item.latency ? item.latency : 'undefined' }}</v-chip>
          </template>
          <template v-slot:item.sshStatus="{ item }">
            <v-icon :class="item.sshStatus ? 'green--text' : 'red--text'">{{ item.sshStatus ? 'mdi-cloud-sync' : 'mdi-sync-alert' }}</v-icon>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              @click="removeItem(item)"
            >
              mdi-delete
            </v-icon>
            <v-menu dark offset-y>
              <template v-slot:activator="{ on }">
                <v-icon
                  v-on="on"
                >
                  mdi-console
                </v-icon>
              </template>
              <v-list dense>
                <v-subheader class="title">{{ item.name }}</v-subheader>
                <v-list-item
                  v-for="({ name }, index) in commands"
                  :key="index"
                  @click=""
                >
                  <v-list-item-title>
                    <v-icon class="light-green--text">
                      mdi-console-line
                    </v-icon>
                    <span class="grey--text text--lighten-3 subtitle-1">{{ name.toLowerCase() }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="load">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Component, { mixins } from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import EditableMixin from '../../mixins/editable';

  const serversModule = namespace('servers');
  const commandsModule = namespace('commands');

  @Component()
  export default class ServersControl extends mixins(EditableMixin('servers', {
    port: '22',
    user: 'root',
  }, 'id')) {
    @serversModule.Action checkLatency;
    @serversModule.Action checkSsh;
    @serversModule.Action load;
    @commandsModule.Action('load') loadCommands;
    @commandsModule.State('items') commands;
    headers = [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      {
        text: "Host",
        align: "center",
        sortable: false,
        value: "host"
      },
      {
        text: "SSH Status",
        align: "center",
        sortable: false,
        value: "sshStatus"
      },
      {
        text: "Latency",
        align: "center",
        sortable: false,
        value: "latency"
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
        value: "action",
      }
    ];
    valid = false;
    created() {
      this.loadCommands();
      this.pingAll();
      this.interval = setInterval(() => this.pingAll(), 5000)
    }
    pingAll() {
      this.items.forEach(item => {
        this.checkLatency(item.host);
        this.checkSsh(item);
      });
    }
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>
