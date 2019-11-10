import Vue from 'vue';
import { namespace } from 'vuex-class';
import Component from 'vue-class-component';
import MaxmindIPInfo from '../components/MaxmindIPInfo';

const maxmindModule = namespace('maxmind');

@Component({
  components: {
    MaxmindIPInfo
  }
})
export default class MaxmindMixin extends Vue {
  @maxmindModule.Action getIPInfo;
  @maxmindModule.Action resetIPInfo;
  @maxmindModule.State ipInfo;
  ipError = false;

  getIpInfo(ip) {
    this.getIPInfo(ip)
  }
  resetIpInfo() {
    this.resetIPInfo()
  }
  resetIPError() {
    if (this.ipError) this.ipError = false;
  }
}
