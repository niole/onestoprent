import Vue from 'vue';
import Accordian from './Accordian';
import Contract from './Contract';

const ContractRenewalApprovalProcess = Vue.component('contract-renewal-approval-process', {
  props: {
    contract: {
      type: Object,
      required: true,
    },
    renterData: {
      type: Object,
      required: true,
    }
  },
  methods: {
    renewContract: function() {
      console.log('renew contract for ', this.renterData.name);
    },
    rejectRequest: function() {
      console.log('reject ', this.renterData.name);
    },
  },
  template:`
    <accordian
      :totalSlots="2"
    >
      <div :slot="1">
        <h1>
          Review {{ renterData.name }}'s Contract
        </h1>
        <contract :contract="contract" />
      </div>
      <div :slot="2">
        <h1>
          If everything looks good to, approve the renewal request
        </h1>
        <button v-on:click="rejectRequest">
          Reject Request
        </button>
        <button v-on:click="renewContract">
          Renew {{ renterData.name }}'s Contract
        </button>
      </div>
    </accordian>
  `
});

export default ContractRenewalApprovalProcess;
