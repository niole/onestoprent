import Vue from 'vue';
import Contract from './Contract';
import Renew from './Renew';

const ContractRenew = Vue.component('contract-renew-icon', {
  template: `
    <div class="contract-renew-icon">
      <renew-icon
        :height="15"
        :width="15"
      />
      <contract-icon
        :height="19"
        :width="19"
      />
    </div>
  `
});

export default ContractRenew;
