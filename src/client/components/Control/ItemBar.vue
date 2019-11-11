<template>
  <v-toolbar flat color="white">
    <v-toolbar-title>{{ name }}s</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="editorConfig.isEnabled" max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on" @click="$emit('add')">Add {{ name }}</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="editorConfig.isUpdateMode ? $emit('save') : $emit('create')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ItemBar extends Vue {
    @Prop(String) name;
    @Prop(Object) editorConfig;
  }
</script>
