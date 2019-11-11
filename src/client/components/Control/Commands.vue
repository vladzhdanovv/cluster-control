<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:top>
            <item-bar name="Command" :editorConfig="editorConfig"
                      @add="editItem()"
                      @save="saveItem()"
                      @create="createItem()"
                      @close="close()"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editorConfig.item.name" label="name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editorConfig.item.command" label="command"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </item-bar>
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
  @Component({})
  export default class ServersControl extends mixins(EditableMixin('commands', {
    name: '',
    command: '',
  }, 'id')) {
    headers = [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
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
    ]
  }
</script>
