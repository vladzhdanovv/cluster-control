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
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="8" md="6">
                          <v-text-field v-model="editorConfig.item.host" label="IP"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="3">
                          <v-text-field v-model="editorConfig.item.port" label="SSH Port"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="3">
                          <v-text-field v-model="editorConfig.item.password" label="SSH Password"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="editorConfig.isUpdateMode ? saveItem() : createItem()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="removeItem(item)"
            >
              mdi-delete
            </v-icon>
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
  import EditableMixin from '../../mixins/editable';

  @Component()
  export default class ServersControl extends mixins(EditableMixin('servers', {
    host: '',
    port: '22',
    password: '',
  }, 'id')) {
    headers = [
      {
        text: "Host",
        align: "left",
        sortable: false,
        value: "host"
      },
      {
        text: "Port",
        align: "center",
        sortable: false,
        value: "port"
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
        value: "action",
      }
    ]
  }
</script>