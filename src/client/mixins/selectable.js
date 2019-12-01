import { Vue, Component, Prop } from 'vue-property-decorator'
import { VSelect } from 'vuetify/lib';
import { namespace } from 'vuex-class';

export default (moduleName, humanName, labelProperty, valueProperty) => {
  const module = namespace(moduleName);

  @Component({
    components: { VSelect },
    render(h) {
      const { $attrs = {}, $props = {}, items = [] } = this;

      return h('v-select', {
        attrs: { ...$attrs },
        props: { ...$props, items, itemText: labelProperty, itemValue: valueProperty },
        on: {
          change: (e) => this.$emit('input', e),
        }
      });
    },
  })
  class Selectable extends Vue {
    @Prop([Array, String]) value;
    @module.Action load;
    @module.State items;
    @module.State fetched;

    created() {
      this.load();
    }
  }

  return Selectable;
};
