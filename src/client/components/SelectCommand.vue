<script>
  import Component, { mixins } from 'vue-class-component';
  import SelectableMixin from '../mixins/selectable';

  @Component({})
  export default class SelectCommand extends mixins(SelectableMixin('commands', 'command', 'name', '_id')) {

  }
</script>
