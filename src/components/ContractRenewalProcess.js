import Vue from 'vue';
import Accordian from './Accordian';
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
    <accordian
      :totalSlots="2"
    >
      <div :slot="1">
        <h1>
          Review Your Contract
        </h1>
        <contract :contract="contract" />
      </div>
      <div :slot="2">
        <h1>
          If everything looks good to go, submit your request
        </h1>
        <button v-on:click="requestContractRenewal">
          Renew My Contract
        </button>
      </div>
    </accordian>
  `
});

export default ContractRenewalProcess;
