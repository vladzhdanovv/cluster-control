<script>
  import Component, { mixins } from 'vue-class-component';
  import SelectableMixin from '../mixins/selectable';

  @Component({})
  export default class SelectServer extends mixins(SelectableMixin('servers', 'server', 'name', '_id')) {

  }
</script>
