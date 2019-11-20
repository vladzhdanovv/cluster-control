import { Vue, Component, Prop } from 'vue-property-decorator'
import { VSelect } from 'vuetify/lib';
import { namespace } from 'vuex-class';

export default (moduleName, humanName, labelProperty, valueProperty) => {
  const module = namespace(moduleName);

  @Component({
    components: { VSelect },
    render(h) {
      const { $attrs = {}, props: { value } = {}, items = []} = this;
      return h('v-select', {
        attrs: { ...$attrs },
        props: { value, items, itemText: labelProperty, itemValue: valueProperty },
        on: {
          input: (e) => this.$emit('input', e.target.value),
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
