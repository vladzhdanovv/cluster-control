import mixin from 'mixin-deep';
import crud from '../mixins/crud';

export default mixin({
  namespaced: true,
  state: {
    items: [],
    fetched: false,
  },
}, crud({}));
