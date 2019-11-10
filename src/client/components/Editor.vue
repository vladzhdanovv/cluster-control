<template>
  <v-dialog v-model="isEnabled" max-width="700px" persistent>
    <v-card>
      <v-card-title>
        <span v-if="isUpdateMode" class="headline">{{`Update`}}</span>
        <span v-else class="headline">New</span>
      </v-card-title>
      <v-card-text v-if="item">
        <v-container grid-list-md class="encoding-profile-editor">
          <v-layout wrap>
            <slot name="form" :item="item" :getValidationErrorMessage="getValidationErrorMessage"></slot>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close()">Cancel</v-btn>
        <v-btn v-if="isUpdateMode"
               color="success"
               :disabled="!!errors.items.length"
               @click.native="save(item)"
        >
          Save
        </v-btn>
        <v-btn v-else
               color="info"
               :disabled="!!errors.items.length"
               @click.native="create(item)"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Editor",
  props: ["item"],
  inject: ['$validator'],
  data() {
    return {
      isEnabled: false,
      isUpdateMode: false
    };
  },
  methods: {
    getValidationErrorMessage(field) {
      return this.errors.has(field) ? this.errors.first(field) : [];
    },
    save(item) {
      this.validate('save', item);
    },
    create(item) {
      this.validate('create', item);
    },
    open(updated) {
      this.isUpdateMode = updated;
      this.isEnabled = true;
    },
    close() {
      this.isEnabled = false;
    },
    validate(method, item) {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.$emit(method, item);
          this.close();
        }
      });
    },
  }
};
</script>
