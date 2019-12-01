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
            <item-bar name="Server" :editorConfig="editorConfig"
                      @add="editItem()"
                      @save="saveItem()"
                      @create="createItem()"
                      @close="close()"
            >
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
            </item-bar>
          </template>
          <template v-slot:item.latency="{ item }">
            <v-chip :color="item.latency > 0 ? 'green' : 'red'" dark>{{ item.latency ? item.latency : 'timeout' }}</v-chip>
          </template>
          <template v-slot:item.sshStatus="{ item }">
            <v-icon :class="item.sshStatus ? 'green--text' : 'red--text'">{{ item.sshStatus ? 'mdi-cloud-sync' : 'mdi-sync-alert' }}</v-icon>
          </template>
          <template v-slot:item.action="{ item }">
            <item-actions @remove="removeItem(item)" @edit="editItem(item)"/>
            <v-menu dark offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text icon color="black" v-on="on">
                  <v-icon class="black--text">mdi-console</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-subheader class="title">{{ item.name }}</v-subheader>
                <v-list-item v-for="(command, index) in commands" :key="index" @click="">
                  <v-list-item-title @click="run({ server: item, command })">
                    <v-icon class="light-green--text">mdi-console-line</v-icon>
                    <span class="grey--text text--lighten-3 subtitle-1">{{ command.name.toLowerCase() }}</span>
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
    <v-layout column>
      <v-flex xs12>
        <view-log/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Component, { mixins } from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import EditableMixin from '../../mixins/editable';
  import ViewLog from '../../components/ViewLog';

  const serversModule = namespace('servers');
  const commandsModule = namespace('commands');

  @Component({
    components: { ViewLog },
  })
  export default class ServersControl extends mixins(EditableMixin('servers', {
    port: '22',
    user: 'root',
  }, '_id')) {
    @serversModule.Action checkLatency;
    @serversModule.Action checkSsh;
    @serversModule.Action run;
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
