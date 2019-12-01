import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';

export default (moduleName, newItem, idField) => {
  const module = namespace(moduleName);

  @Component({})
  class Editable extends Vue {
    @module.Action load;
    @module.Action remove;
    @module.Action update;
    @module.Action create;
    @module.State items;
    @module.State fetched;
    editorConfig = {
      isUpdateMode: false,
      isEnabled: false,
      item: {},
      origin: {},
      newItem: {}
    };
    created() {
      this.load();
    }
    editItem(item) {
      this.editorConfig.newItem = newItem;
      this.editorConfig.isUpdateMode = typeof item !== "undefined";
      item = item || { ...this.editorConfig.newItem } || {};
      this.editorConfig.origin = item;
      this.editorConfig.item = { ...item };
      this.editorConfig.isEnabled = true;
    }
    close() {
      this.editorConfig.isEnabled = false;
    }
    removeItem(item) {
      confirm("Are you sure you want to delete this item?") &&
      this.remove({ item, _id: item[idField]});
    }
    saveItem() {
      const { origin, item } = this.editorConfig;
      this.update({ origin, _id: origin[idField], item });
      this.editorConfig.isEnabled = false;
    }
    createItem() {
      this.create(this.editorConfig.item);
      this.editorConfig.isEnabled = false;
      this.load();
    }
  }

  return Editable;
}
