import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class FormMixin extends Vue {
  get isFormDirty() {
    return Object.keys(this.fields).some(key => this.fields[ key ] && this.fields[ key ].dirty);
  }
  resetValidator() {
    this.$nextTick(() => this.$validator.reset());
  }
  getValidationErrorMessage(fieldname) {
    return this.errors.has(fieldname) ? this.errors.first(fieldname) : [];
  }
}
