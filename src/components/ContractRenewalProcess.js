import Vue from 'vue';
import Contract from './Contract';

const ContractRenewalProcess = Vue.component('contract-renewal-process', {
  props: {
    contract: {
      type: Object,
      required: true,
    }
  },
  methods: {
    requestContractRenewal: function() {
      console.log('contract renew please');
    }
  },
  template:`
    <div>
      <h1>
        Review Your Contract
      </h1>
      <contract :contract="contract" />
      <div>
        If everything looks good to go, submit your request
        <div>
          <button v-on:click="requestContractRenewal">
            Renew My Contract
          </button>
        </div>
      </div>
    </div>
  `
});

export default ContractRenewalProcess;
